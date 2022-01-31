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
          max-width: 846px;
        }
      `}
      {...props}
    >
      <Modal.Header
        css={`
          background-color: #f5f7f9;
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
      <Modal.Body className="p-0">{children}</Modal.Body>
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
      <span
        className="plans_for plans_for_editable d-flex align-items-center"
        onClick={() => setShowModal(true)}
      >
        <div
          className="yellow_start_line"
          css={`
            background-color: ${colors.secondary_color};
          `}
        ></div>
        <span
          css={`
            font-size: 17px;
            font-weight: 900;
          `}
        >
          Members
        </span>
        <EditMembersButton
          className="d-flex justify-content-center align-items-center"
          css={`
            color: ${colors.primary_color};
          `}
        >
          <RiPencilFill
            css={`
              font-size: 1.2rem;
            `}
          />
        </EditMembersButton>
      </span>

      {showModal && <EditMembers onClose={() => setShowModal(false)} />}
    </>
  );
};

function EditMembers({ onClose, ...props }) {
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
    <EditMembersModal submitState={{ isLoading }} onClose={onClose} {...props}>
      <form onSubmit={handleSubmit}>
        <MemberOptions {...memberForm} />
        {error &&
          serverErrors.map(serverError => (
            <StyledErrorMessage key={serverError}>
              {serverError}
            </StyledErrorMessage>
          ))}
        <Button type="submit" loader={isLoading} className="w-100 rounded-0">
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
