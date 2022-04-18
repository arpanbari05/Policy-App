import { useEffect, useState } from "react";
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
import { setEditStep } from "../../quote.slice";
import { useDispatch, useSelector } from "react-redux";
import LocationEditForm from "../../../InputPage/components/LocationEditForm";
import { setShowEditMembers } from "../../quote.slice";
import { useGetEnquiriesQuery } from "../../../../api/api";
import { useUpdateEnquiry } from "../../../../customHooks/index";

export function EditMembersModal({
  children,
  title = "Edit Members",
  ...props
}) {
  const dispatch = useDispatch();

  const { groups } = useMembers();

  const { updateEnquiry } = useUpdateEnquiry();

  const handleHide = () => {
    // onClose && onClose();
    dispatch(setShowEditMembers(false));
    return replicatePincode();
  };

  const replicatePincode = () => {
    const groupsWithoutLocation = groups?.filter(grp => !grp?.pincode);
    const firstGroupPincode = groups[0]?.pincode;
    Promise.all(
      groupsWithoutLocation.map(grpWithoutLoc =>
        updateEnquiry({
          is_pincode_search: false,
          pincode: firstGroupPincode,
          groupCode: grpWithoutLoc?.id,
        }),
      ),
    );
  };

  const { editStep: step, showEditMembers: show } = useSelector(
    ({ quotePage }) => quotePage,
  );

  return (
    <Modal
      onHide={handleHide}
      show={show}
      animation={false}
      centered
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
          {step === 2 ? "Edit Location" : title}
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
  const dispatch = useDispatch();
  const { showEditMembers: show } = useSelector(({ quotePage }) => quotePage);

  const onEditMemberClick = () => {
    dispatch(setShowEditMembers(true));
    dispatch(setEditStep(1));
  };

  return (
    <>
      <div
        className="d-flex align-items-center"
        onClick={onEditMemberClick}
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
            font-size: 15px;
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
      {show && <EditMembers />}
    </>
  );
};

export function EditMembers({ ...props }) {
  const { colors } = useTheme();
  const { getAllMembers } = useMembers();
  const dispatch = useDispatch();
  const { editStep: step } = useSelector(({ quotePage }) => quotePage);
  const [clientError, setClientError] = useState("");

  // Remove error after 5sec
  useEffect(() => {
    if (clientError !== "") {
      setTimeout(() => {
        setClientError("");
      }, 5000);
    }
  }, [clientError]);

  const { isError, validate, getSelectedMembers, ...memberForm } =
    useMembersForm(getAllMembers);

  const { updateMembers, isLoading, error } = useUpdateMembers();
  const { data } = useGetEnquiriesQuery();

  let serverErrors = [];

  if (error?.data?.errors) {
    serverErrors = Object.values(error?.data?.errors);
  }

  const handleSubmit = evt => {
    evt.preventDefault();

    const isValid = validate();
    if (!isValid) return;

    const selectedMembers = getSelectedMembers();

    if (!selectedMembers.length) return;

    const isGroupWithPincode = updatedGroups => {
      const reduxGroup =
        localStorage.getItem("groups") &&
        JSON.parse(localStorage.getItem("groups"));
      if (reduxGroup?.length) {
        const updatedGroup = updatedGroups?.map(group => {
          const reduxGroupMatch = reduxGroup?.find(reGrp => {
            return reGrp?.members?.some(mem => group?.members?.includes(mem));
          });
          return {
            ...group,
            city: group?.city || reduxGroupMatch?.city,
            pincode: group?.pincode || reduxGroupMatch?.pincode,
          };
        });

        return updatedGroup?.find(grp => !grp?.pincode);
      }
    };
    updateMembers({ members: selectedMembers }).then(res => {
      if (!res?.error) {
        if (!isGroupWithPincode(res?.data?.data?.groups))
          dispatch(setShowEditMembers(false));
        else dispatch(setEditStep(2));
      }
    });
  };

  return (
    <>
      <EditMembersModal {...props}>
        <Tab color={colors.secondary_shade}>
          <TabItem
            color={colors.primary_color}
            active={step === 1}
            onClick={() => dispatch(setEditStep(1))}
          >
            Members
          </TabItem>
          <TabItem
            color={colors.primary_color}
            active={step === 2}
            onClick={() => dispatch(setEditStep(2))}
          >
            Pincode
          </TabItem>
        </Tab>
        {step === 1 ? (
          <form
            onSubmit={handleSubmit}
            css={`
              ${mq.mobile} {
                padding-bottom: 3em;
              }
            `}
          >
            <div
              className="p-3"
              css={`
                font-size: 16px @media (max-width: 767px) {
                  font-size: 14px;
                }
              `}
            >
              <MemberOptions
                {...memberForm}
                setServerError={setClientError}
                gender={data?.data?.input?.gender}
                selectedMembers={getSelectedMembers()}
              />
            </div>
            {error &&
              serverErrors.map(serverError => (
                <StyledErrorMessage key={serverError}>
                  {serverError}
                </StyledErrorMessage>
              ))}
            {clientError !== "" && (
              <StyledErrorMessage>{clientError}</StyledErrorMessage>
            )}
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
              Apply & Proceed
            </Button>
          </form>
        ) : (
          // <EditPincode show={show} onClose={onClose} />
          <div
            css={`
              padding: 1em 4em;
              ${mq.mobile} {
                padding: 0;
                height: calc(100vh - 3.91em);
              }
            `}
          >
            <LocationEditForm edit={true} />
          </div>
        )}
      </EditMembersModal>
    </>
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
const Tab = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.color};
  position: sticky;
  border-bottom: 1px solid #dcdcdc;
`;
const TabItem = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  padding: 10px 0;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  color: ${props => (props.active ? props.color : "#777")};
  ${props =>
    props.active &&
    `
  &::before {
    content: "";
    height: 4px;
    width: 100%;
    background-color: ${props.color};
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 20px 20px 0 0;
  }
  `}
  &:not(:last-child) {
    margin-right: 40px;
  }
`;
