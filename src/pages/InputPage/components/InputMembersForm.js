import CustomProgressBar from "../../../components/ProgressBar";
import { ErrorMessage, Title } from "./FormComponents";
import {
  useFrontendBoot,
  useMembers,
  useTheme,
  useToggle,
  useUpdateEnquiry,
  useUrlEnquiry,
} from "../../../customHooks";
import { useGetEnquiriesQuery } from "../../../api/api";
import {
  MemberOptions,
  useMembersForm,
} from "../../../components/MemberOptions";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { InputFormCta } from ".";
import { RiAddCircleFill, RiAddCircleLine } from "react-icons/ri";
import { EditMembersModal } from "../../quotePage/components/filters/EditMemberFilter";
import { Button } from "../../../components";

function InputMembersForm(props) {
  const { colors } = useTheme();

  const editMembersToggle = useToggle(false);

  const { journeyType } = useFrontendBoot();

  const { isLoading } = useGetEnquiriesQuery();

  const { getAllMembers } = useMembers();

  const {
    isError,
    error,
    validate,
    getSelectedMembers,
    updateMembersList,
    membersList,
    ...membersForm
  } = useMembersForm(getAllMembers);

  const primaryMembers = membersList.filter(
    member => member.is_primary || member.isSelected,
  );

  const { updateEnquiry, ...updateEnquiryQuery } = useUpdateEnquiry();

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const history = useHistory();

  const handleSubmit = () => {
    const isValid = validate();
    if (!isValid) return;

    const selectedMembers = getSelectedMembers();

    const sendData = {
      members: selectedMembers.map(member => ({
        age: member.age.code,
        type: member.code,
      })),
    };

    const isSingleMember = selectedMembers.length === 1;

    if (isSingleMember) {
      sendData.plan_type = "I";
    }

    if (journeyType === "top_up" && !isSingleMember) {
      sendData.plan_type = "F";
    }

    updateEnquiry(sendData).then(res => {
      let nextPagePath = "/input/plantype";

      if (journeyType !== "top_up" && !isSingleMember) {
        history.push(getUrlWithEnquirySearch(nextPagePath));
        return;
      }

      const { groups } = res.data.data;
      const firstGroup = Math.min(...groups.map(group => group.id));

      nextPagePath = `/input/location-${firstGroup}`;
      history.push(getUrlWithEnquirySearch(nextPagePath));
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="py-3" {...props}>
      <div className="px-3">
        <Title className="w-100">Who all would you like to insure?</Title>
        <CustomProgressBar now={2} total={4} />
      </div>
      <div className="px-3">
        <MemberOptions {...membersForm} membersList={primaryMembers} />
        {isError || error ? (
          <StyledErrorMessage className="m-0 mt-3">{error}</StyledErrorMessage>
        ) : null}
        <button
          className="w-100"
          css={`
            background-color: ${colors.primary_shade};

            height: 43px;
            &:hover {
              background-color: ${colors.secondary_shade};
            }

            @media (max-width: 480px) {
              font-size: 13px;
              height: 43px;
              margin-bottom: 20px;
              margin-top: 10px;
            }
          `}
          onClick={editMembersToggle.on}
          {...props}
        >
          <RiAddCircleFill size={25} color={colors.primary_color} /> Other
          Members
        </button>
        {editMembersToggle.isOn ? (
          <EditMembers
            onClose={editMembersToggle.off}
            onSubmit={updateMembersList}
            initialMembersList={membersList}
          />
        ) : null}
      </div>
      <InputFormCta
        backLink={`/input/basic-details`}
        onContinueClick={handleSubmit}
        loader={updateEnquiryQuery.isLoading}
      />
    </div>
  );
}

function EditMembers({ onClose, onSubmit, initialMembersList = [], ...props }) {
  const {
    isError,
    error,
    validate,
    getSelectedMembers,
    membersList,
    ...membersForm
  } = useMembersForm(initialMembersList);

  const handleSubmit = evt => {
    evt.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit && onSubmit(membersList);
    onClose && onClose();
  };

  return (
    <EditMembersModal onClose={onClose} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="p-3">
          <MemberOptions {...membersForm} membersList={membersList} />
        </div>
        {isError || error ? (
          <StyledErrorMessage>{error}</StyledErrorMessage>
        ) : null}
        <Button type="submit" className="w-100 rounded-0">
          Apply
        </Button>
      </form>
    </EditMembersModal>
  );
}

const StyledErrorMessage = styled(ErrorMessage)`
  font-size: 1rem;
  text-align: center;
`;

export default InputMembersForm;
