import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ErrorMessage } from "../../../InputPage/components/FormComponents";
import {
  useMembers,
  useTheme,
  useUpdateMembers,
} from "../../../../customHooks";
import styled from "styled-components/macro";
import {
  MemberOptions,
  useMembersForm,
} from "../../../../components/MemberOptions";
import { Button } from "../../../../components";
import { RiPencilFill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import * as mq from "../../../../utils/mediaQueries";

export function EditMembersModal({ onClose, children, ...props }) {
  const handleHide = () => {
    onClose && onClose();
  };

  return (
    <Modal
      onHide={handleHide}
      show
      animation={false}
      css={`
        .modal-dialog {
          max-width: 870px;
          ${mq.mobile} {
            width: 100vw;
            margin: 0;
          }
        }
        .modal-content {
          ${mq.mobile} {
            width: 100vw;
            border-radius: 0;
          }
        }
      `}
      {...props}
    >
      <Modal.Header
      className="w-100"
        css={`
          background-color: #f5f7f9;
          ${mq.mobile} {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99;
          }
        `}
      >
        <Modal.Title
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "black",
          }}
        >
          Edit Members
        </Modal.Title>
        <button onClick={handleHide}>
          <FaTimes />
        </button>
      </Modal.Header>
      <Modal.Body
        className="p-0"
        css={`
          ${mq.mobile} {
            margin-top: 3.91em;
          }
        `}
      >
        {children}
      </Modal.Body>
    </Modal>
  );
}

const StyledErrorMessage = styled(ErrorMessage)`
  font-size: 1rem;
  text-align: center;
`;

const EditMemberFilter = () => {
  const { colors } = useTheme();

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className="d-flex align-items-center"
        onClick={() => setShowModal(true)}
        role="button"
      >
        <div
          className="rounded"
          css={`
            background-color: ${colors.secondary_color};
            width: 0.37em;
            height: 2.1em;
          `}
        />
        <span
          className="mx-2"
          css={`
            font-weight: 900;
          `}
        >
          Members
        </span>
        <div
          className="d-flex justify-content-center align-items-center rounded-circle"
          css={`
            color: ${colors.primary_color};
            background-color: white;
            width: 2.1em;
            height: 2.1em;
          `}
        >
          <RiPencilFill
            css={`
              font-size: 1.2rem;
            `}
          />
        </div>
      </div>
      {showModal && <EditMembers onClose={() => setShowModal(false)} />}
    </>
  );
};

export function EditMembers({ onClose, ...props }) {
  const { getAllMembers } = useMembers();

  const { isError, validate, getSelectedMembers, ...memberForm } =
    useMembersForm(getAllMembers);

  const { updateMembers, isLoading, error } = useUpdateMembers();

  let serverErrors = [];

  if (error) {
    serverErrors = Object.values(error.data.errors);
  }

  const handleSubmit = evt => {
    evt.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    const selectedMembers = getSelectedMembers();

    if (!selectedMembers.length) return;

    updateMembers({ members: selectedMembers }).then(res => {
      if (!res.error) onClose && onClose();
    });
  };

  return (
    <EditMembersModal onClose={onClose} {...props}>
      <form
        onSubmit={handleSubmit}
        css={`
          ${mq.mobile} {
            padding-bottom: 3em;
          }
        `}
      >
        <div className="p-3" css={`font-size: 16px @media (max-width: 767px) { font-size: 14px; }`}>
          <MemberOptions {...memberForm} />
        </div>
        {error &&
          serverErrors.map(serverError => (
            <StyledErrorMessage key={serverError}>
              {serverError}
            </StyledErrorMessage>
          ))}
        <Button
          type="submit"
          loader={isLoading}
          className="w-100 rounded-0"
          css={`
            ${mq.mobile} {
              position: fixed;
              bottom: 0;
              left: 0;
              z-index: 99;
            }
          `}
        >
          Apply
        </Button>
      </form>
    </EditMembersModal>
  );
}

export default EditMemberFilter;

const EditMembersButton = styled.button`
  background-color: white;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  margin: 0px 5px;
  border: none;
`;
