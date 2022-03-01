import styled from "styled-components/macro";
import "styled-components/macro";
import { mobile } from "../../../utils/mediaQueries";
import CustomProgressBar from "../../../components/ProgressBar";
import { ErrorMessage, Title } from "./FormComponents";
import {
  useCompanies,
  useUpdateEnquiry,
  useCreateEnquiry,
  usePolicyNumberInput,
} from "../../../customHooks";
import { getReactSelectOption } from "../../../utils/helper";
import { useState } from "react";
import { useGetEnquiriesQuery } from "../../../api/api";
import TextInput2 from "../../../components/TextInput2";
import { Button } from "../../../components";
import Dropdown from "../../../components/Dropdown";
import DropDown2 from "../../../components/DropDown2";

const RenewalDetailsForm = ({ ...props }) => {
  const { companies } = useCompanies();

  const icArray = Object.values(companies).map(singleIC => ({
    display_name: singleIC.name,
    code: singleIC.alias,
    provideRenewal: true, //<Temporarily true>,
  }));

  const [selectedRenewalIc, setSelectedRenewalIc] = useState({});

  const [policyNumberError, setPolicyNumberErrors] = useState({});

  const policyNumberInput = usePolicyNumberInput(
    "",
    setPolicyNumberErrors,
    icArray.find(singleIC => singleIC.code === selectedRenewalIc.code),
  );

  const [createEnquiryQuery] = useCreateEnquiry();

  function submit(renewalIC, policyNumber) {
    if (!renewalIC || !policyNumber) return;
    //<New SUBMIT api call>.then(()=><Redirection>)
  }

  const handleSubmit = e => {
    e.preventDefault();
    submit(selectedRenewalIc, policyNumberInput.value);
  };

  const handleRenewalICChange = (label, value) => {
    const updatedRenewalIc = { code: value, display_name: label };
    setSelectedRenewalIc(updatedRenewalIc);
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
          <Title>Your Renewal Details?</Title>
          <CustomProgressBar now={1} total={1} />

          <div>
            <DropDown2
              label="Select Insurance Co."
              value={
                Object.keys(selectedRenewalIc).length &&
                getReactSelectOption(selectedRenewalIc)
              }
              onChange={handleRenewalICChange}
              options={icArray
                .filter(singleIC => singleIC.provideRenewal)
                .map(getReactSelectOption)}
            />
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
              {...policyNumberInput}
            />
          </div>

          <Button
            type="submit"
            className="w-100"
            disabled={createEnquiryQuery.isLoading}
            loader={createEnquiryQuery.isLoading}
          >
            Proceed for Renewal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RenewalDetailsForm;
