import { useEffect, useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { InputFormCta } from ".";
import { useGetEnquiriesQuery } from "../../../api/api";
import { Button } from "../../../components";
import {
  MemberOptions,
  useMembersForm,
} from "../../../components/MemberOptions";
import CustomProgressBar from "../../../components/ProgressBar";
import {
  useFrontendBoot,
  useMembers,
  useTheme,
  useUpdateEnquiry,
  useUrlEnquiry,
} from "../../../customHooks";
import { setShowEditMembers } from "../../../pages/quotePage/quote.slice";
import { EditMembersModal } from "../../quotePage/components/filters/EditMemberFilter";
import { ErrorMessage, Title } from "./FormComponents";

function InputMembersForm({ posContent, ...props }) {
  const [serverError, setServerError] = useState("");
  const { colors } = useTheme();

  const {
    journeyType,
    settings: { multiindividual_visibilty },
  } = useFrontendBoot();

  const { isLoading, data } = useGetEnquiriesQuery();

  const { getAllMembers } = useMembers();

  // Remove error after 5sec
  useEffect(() => {
    if (serverError !== "") {
      setTimeout(() => {
        setServerError("");
      }, 5000);
    }
  }, [serverError]);

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

  const noOfSelectedMembers = getSelectedMembers()?.length;

  const { updateEnquiry, ...updateEnquiryQuery } = useUpdateEnquiry();

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = async () => {
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

    updateEnquiry(sendData)
      .then(async res => {
        if (res?.error) {
          Object.keys(res.error?.data?.errors).forEach(value => {
            setServerError(res?.error?.data?.errors[`${value}`][0]);
          });
          return;
        }

        // redirect directly to location form if multiindividual visibility is 0
        if (+multiindividual_visibilty === 0) {
          const res = await updateEnquiry({ plan_type: "F" });
          if (res?.error || !res?.data) return;
          const { groups } = res?.data?.data;
          const firstGroup = Math.min(...groups?.map(group => group?.id));
          localStorage.setItem(
            "default_filters",
            JSON.stringify({ plan_type: "F" }),
          );
          history.push(
            getUrlWithEnquirySearch(`/input/location-${firstGroup}`),
          );
          return;
        }
        let nextPagePath = "/input/plantype";

        if (journeyType !== "top_up" && !isSingleMember) {
          history.push(getUrlWithEnquirySearch(nextPagePath));
          return;
        }

        const { groups } = res?.data?.data;
        const firstGroup = Math.min(...groups.map(group => group?.id));

        localStorage.removeItem("default_filters");

        nextPagePath = `/input/location-${firstGroup}`;
        history.push(getUrlWithEnquirySearch(nextPagePath));
      })
      .catch(error => console.error(error));
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="py-3" {...props}>
      <div className="px-3">
        <Title
          className="w-100"
          dangerouslySetInnerHTML={{
            __html: posContent.question
              ? posContent.question
              : "Who all would you like to insure?",
          }}
        ></Title>
        <CustomProgressBar now={2} total={4} />
      </div>
      <div className="px-3">
        <MemberOptions
          {...membersForm}
          membersList={primaryMembers}
          selectedMembers={getSelectedMembers()}
          updateMembersList={updateMembersList}
          gender={data?.data?.input?.gender}
          setServerError={setServerError}
          isPopup={true}
        />
        {isError || error ? (
          <StyledErrorMessage className="m-0 mt-3 mb-2">
            {error}
          </StyledErrorMessage>
        ) : null}
        {serverError !== "" ? (
          <StyledErrorMessage className="m-0 mt-2 mb-2">
            {serverError}
          </StyledErrorMessage>
        ) : null}
        <button
          className="w-100"
          css={`
            background-color: ${colors.primary_shade};
            margin-bottom: 20px;
            margin-top: 10px;
            height: 43px;
            font-size: 20px;
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
          onClick={() => {
            dispatch(setShowEditMembers(true));
          }}
          {...props}
        >
          <RiAddCircleFill size={25} color={colors.primary_color} /> Other
          Members
        </button>
        <EditMembers
          onSubmit={membersList => {
            dispatch(setShowEditMembers(false));
            updateMembersList(membersList);
          }}
          initialMembersList={membersList}
          serverError={serverError}
          gender={data?.data?.input?.gender}
          setServerError={setServerError}
          getSelectedMembers={getSelectedMembers}
          membersForm={membersForm}
          membersList={membersList}
          isError={isError}
          error={error}
          validate={validate}
        />
      </div>
      <InputFormCta
        disabled={!noOfSelectedMembers}
        backLink={`/input/basic-details`}
        onContinueClick={handleSubmit}
        loader={updateEnquiryQuery.isLoading}
      />
    </div>
  );
}

function EditMembers({
  isError,
  error,
  getSelectedMembers,
  membersForm,
  validate,
  membersList,
  onClose,
  serverError,
  onSubmit,
  setServerError,
  gender,
  ...props
}) {
  const handleSubmit = evt => {
    evt.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit && onSubmit(membersList);
    onClose && onClose();
  };

  return (
    <EditMembersModal
      onClose={onClose}
      {...props}
      title="All your family members"
    >
      <form
        onSubmit={handleSubmit}
        css={`
          @media (max-width: 480px) {
            padding-bottom: 40px;
          }
        `}
      >
        <div className="p-3">
          <MemberOptions
            {...membersForm}
            membersList={membersList}
            selectedMembers={getSelectedMembers()}
            gender={gender}
            setServerError={setServerError}
          />
        </div>
        {isError || error ? (
          <StyledErrorMessage>{error}</StyledErrorMessage>
        ) : null}
        {serverError !== "" ? (
          <StyledErrorMessage>{serverError}</StyledErrorMessage>
        ) : null}
        <Button
          type="submit"
          className="w-100 rounded-0"
          css={`
            @media (max-width: 480px) {
              position: fixed;
              width: 100%;
              bottom: 0;
              z-index: 100;
            }
          `}
        >
          Apply
        </Button>
      </form>
    </EditMembersModal>
  );
}

const StyledErrorMessage = styled(ErrorMessage)`
  font-size: 12px;
  color: red;
  width: 100%;
`;

export default InputMembersForm;
