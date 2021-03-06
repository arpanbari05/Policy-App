import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import "styled-components/macro";
import { useUpdateRenewalQueryMutation } from "../../../api/api";
import { Button } from "../../../components";
import DropDown2 from "../../../components/DropDown2";
import CustomProgressBar from "../../../components/ProgressBar";
import ResponsiveDatePickers from "../../../components/ResponsiveDatePickers";
import TextInput2 from "../../../components/TextInput2";
import {
  useCompanies,
  useCreateEnquiry,
  useDD,
  useFrontendBoot,
  usePolicyNumberValidations,
} from "../../../customHooks";
import {
  dateObjectToLocaleString,
  getCustomIcOptions,
  regexStringToRegex,
} from "../../../utils/helper";
import { mobile } from "../../../utils/mediaQueries";
import { ErrorMessage, Title } from "./FormComponents";

const RenewalDetailsForm = ({ posContent, ...props }) => {
  const { companies } = useCompanies();
  const {
    data: { tenant },
  } = useFrontendBoot();

  const icArray = Object.values(companies).map(singleIC => ({
    display_name: singleIC.name,
    code: singleIC.alias,
    provideRenewal: true, //? <Temporarily true>,
    dobRequire: singleIC.needs_dob_date_on_renewal,
    expiryDateRequire: singleIC.needs_expiry_date_on_renewal,
    policyNumberRegex: singleIC.policy_no_regex,
  }));

  //-----------------------------------------------------------------------------//

  const history = useHistory();

  const [createEnquiryQuery] = useCreateEnquiry();

  const [updateRenewalMutation, { isLoading, data, isSuccess, error }] =
    useUpdateRenewalQueryMutation();

  const renewalEnquiriesLoading = isLoading;

  useEffect(() => {
    isSuccess &&
      window.location.assign(
        `/productdetails/${data?.data?.groups[0]?.id}?enquiryId=${data?.data?.enquiry_id}`,
      );
  }, [isSuccess]);

  //-----------------------------------------------------------------------------//

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

  const {
    isValueValid: isPolicyNumberValid,
    showError: showPolicyNumberError,
    error: policyNumberError,
    ...policyNumberUtils
  } = usePolicyNumberValidations({
    initialValue: "",
    required: false,
    errorLabel: "Policy Number",
    providedRegex: regexStringToRegex(icDdUtils?.value?.policyNumberRegex),
  });

  /*--------------------------------------------------------------------------------*/

  const showExpiryInput = !!icDdUtils?.value?.expiryDateRequire;

  const showDobInput = !!icDdUtils?.value?.dobRequire;

  const [expiryDateValue, setExpiryDateValue] = useState(new Date());

  const [dobDateValue, setDobDateValue] = useState(new Date());

  /*--------------------------------------------------------------------------------*/

  const submit = (renewalIC, policyNumber, expiryDate, dobDateValue) => {
    if (!isSelectedIcValid || !isPolicyNumberValid) return;

    updateRenewalMutation({
      company_alias: renewalIC?.code,
      policy_no: policyNumber,
      expiry_date: dateObjectToLocaleString(expiryDate),
      date_of_birth: dateObjectToLocaleString(dobDateValue),
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    submit(
      icDdUtils?.value,
      policyNumberUtils?.value,
      expiryDateValue,
      dobDateValue,
    );
  };

  return process.env.NODE_ENV === "development" ||
    location.host === tenant?.health_renewal_frontend_domain ? (
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
            {location.host !== tenant?.health_renewal_frontend_domain && (
              <LinkButton
                onClick={() => {
                  history.push("/input/basic-details");
                }}
              >
                Fresh policy
              </LinkButton>
            )}
          </FlexSectionStyled>
          <CustomProgressBar now={1} total={1} />

          <div>
            <DropDown2
              label="Select Insurance Co."
              value={getCustomIcOptions(icDdUtils?.value)}
              onChange={icDdUtils?.onChange}
              options={icArray
                .filter(singleIC => singleIC?.provideRenewal)
                .map(getCustomIcOptions)}
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
              placeholder={policyNumberUtils?.placeHolder}
              type={policyNumberUtils?.type}
              onChange={policyNumberUtils?.onChange}
              onBlur={policyNumberUtils?.shouldShowError}
              value={policyNumberUtils?.value}
            />
            {showPolicyNumberError && (
              <ErrorMessage
                css={`
                  margin-bottom: unset;
                `}
              >
                {policyNumberError?.message}
              </ErrorMessage>
            )}
          </div>

          {showExpiryInput && (
            <div
              css={`
                box-sizing: border-box;
                padding: 1rem 0rem;
              `}
            >
              <ResponsiveDatePickers
                title="Expiry Date"
                dateValue={expiryDateValue}
                setDateValue={setExpiryDateValue}
              />
            </div>
          )}

          {showDobInput && (
            <div
              css={`
                box-sizing: border-box;
                padding: 1rem 0rem;
              `}
            >
              <ResponsiveDatePickers
                title="Date of Birth"
                dateValue={dobDateValue}
                setDateValue={setDobDateValue}
              />
            </div>
          )}

          {error?.data?.message && (
            <div>
              <ErrorMessage
                css={`
                  margin-bottom: unset;
                `}
              >
                {error?.data?.message}
              </ErrorMessage>
            </div>
          )}

          <Button
            type="submit"
            className="w-100"
            disabled={
              createEnquiryQuery?.isLoading ||
              !isSelectedIcValid ||
              !isPolicyNumberValid
            }
            loader={renewalEnquiriesLoading}
          >
            Proceed for Renewal
          </Button>
        </div>
      </form>
    </div>
  ) : (
    <Redirect to="/input/basic-details" />
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
