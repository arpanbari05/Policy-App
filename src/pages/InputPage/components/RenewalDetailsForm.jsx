import "styled-components/macro";
import { mobile } from "../../../utils/mediaQueries";
import CustomProgressBar from "../../../components/ProgressBar";
import { ErrorMessage, Title } from "./FormComponents";
import {
  useCompanies,
  useCreateEnquiry,
  useDD,
  useFrontendBoot,
  usePolicyNumberInput,
} from "../../../customHooks";
import { getReactSelectOption } from "../../../utils/helper";
import { useState, useEffect } from "react";
import TextInput2 from "../../../components/TextInput2";
import { Button } from "../../../components";
import DropDown2 from "../../../components/DropDown2";
import { useUpdateRenewalQueryMutation } from "../../../api/api";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const RenewalDetailsForm = ({ posContent, ...props }) => {
  const { companies } = useCompanies();

  const history = useHistory();

  const { journeyType } = useFrontendBoot();

  const [updateRenewalQuery, { data, isLoading, isSuccess }] =
    useUpdateRenewalQueryMutation();

  useEffect(() => {
    isSuccess &&
      history.push(
        `/productdetails/${data?.data?.groups[0]?.id}?enquiryId=${data?.data?.enquiry_id}`,
      );
  }, [isSuccess]);

  const renewalEnquiriesLoading = isLoading;

  const icArray = Object.values(companies).map(singleIC => ({
    display_name: singleIC.name,
    code: singleIC.alias,
    provideRenewal: true, //<Temporarily true>,
  }));

  const {
    isValueValid: isSelectedIcValid,
    showError: showIcError,
    error: icError,
    ...icDdUtils
  } = useDD({
    initialValue: {},
    required: true,
    errorLabel: "Insurance Company",
  });

  const [policyNumberError, setPolicyNumberErrors] = useState({});

  const policyNumberInput = usePolicyNumberInput(
    "",
    setPolicyNumberErrors,
    icArray.find(singleIC => singleIC?.code === icDdUtils?.value?.code),
  );

  const [createEnquiryQuery] = useCreateEnquiry();

  function submit(renewalIC, policyNumber) {
    if (!isSelectedIcValid || !policyNumber) return;

    updateRenewalQuery({
      company_alias: renewalIC?.code,
      policy_no: policyNumber,
    });
    //<New SUBMIT api call>.then(()=><Redirection>)
  }

  const handleSubmit = e => {
    e.preventDefault();
    submit(icDdUtils?.value, policyNumberInput.value);
  };

  return (
    <div {...props}>
      <form onSubmit={handleSubmit}>
        <div
          css={`
            padding: 1rem;
            ${mobile} {
              padding: 10px !important;
            }
          `}
        >
          <FlexSectionStyled>
            <Title
              dangerouslySetInnerHTML={{
                __html: posContent.question
                  ? posContent.question
                  : "Your renewal details?",
              }}
            ></Title>
            <LinkButton
              onClick={() => {
                history.push("/input/basic-details");
              }}
            >
              Fresh policy
            </LinkButton>
          </FlexSectionStyled>
          <CustomProgressBar now={1} total={1} />

          <div>
            <DropDown2
              label="Select Insurance Co."
              value={getReactSelectOption(icDdUtils?.value)}
              onChange={icDdUtils?.onChange}
              options={icArray
                .filter(singleIC => singleIC?.provideRenewal)
                .map(getReactSelectOption)}
              onBlur={icDdUtils?.shouldShowError}
            />

            {showIcError && (
              <ErrorMessage
                css={`
                  margin-bottom: unset;
                `}
              >
                {icError?.message}
              </ErrorMessage>
            )}
          </div>
          <div
            css={`
              box-sizing: border-box;
              padding: 1rem 0rem;
            `}
          >
            <TextInput2
              label="Policy Number"
              name="policy-number"
              type="text"
              {...policyNumberInput}
            />
            {policyNumberError?.message && (
              <ErrorMessage
                css={`
                  margin-bottom: unset;
                `}
              >
                {policyNumberError?.message}
              </ErrorMessage>
            )}
          </div>

          <Button
            type="submit"
            className="w-100"
            disabled={
              createEnquiryQuery?.isLoading ||
              !isSelectedIcValid ||
              !policyNumberInput?.value
            }
            loader={renewalEnquiriesLoading}
          >
            Proceed for Renewal
          </Button>
        </div>
      </form>
    </div>
  );
};

const LinkButton = styled.button`
  padding: 5px 15px;
  border: 1.5px solid #787878;
  border-radius: 4px;
  color: #787878;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;

  @media (max-width: 420px) {
    padding: 5px 5px;
    font-size: 0.7rem;
    min-width: 90px;
  }
`;

const FlexSectionStyled = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default RenewalDetailsForm;
