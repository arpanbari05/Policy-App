import { useState } from "react";
import { useHistory } from "react-router-dom";
import { InputFormCta } from ".";
import { useGetEnquiriesQuery } from "../../../api/api";
import CustomProgressBar from "../../../components/ProgressBar";
import {
  useFrontendBoot,
  useMembers,
  useUpdateEnquiry,
  useUrlEnquiry,
} from "../../../customHooks";
import { Title } from "./FormComponents";
import "styled-components/macro";
import Dropdown from "../../../components/Dropdown";
import { getReactSelectOption } from "../../../utils/helper";

function DeductibleForm({ posContent, ...props }) {
  const { updateEnquiry, ...updateEnquiryQuery } = useUpdateEnquiry();

  const history = useHistory();

  const {
    data: { deductibles },
  } = useFrontendBoot();

  const { data } = useGetEnquiriesQuery();

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const { getLastGroup } = useMembers();

  const getInitialDeductible = () =>
    deductibles.find(
      deductibleOption =>
        deductibleOption.code === data?.data?.input?.deductible,
    );

  const [selectedDeductible, setSelectedDeductible] =
    useState(getInitialDeductible);

  function submit(deductible) {
    if (!deductible) return;
    updateEnquiry({ deductible: deductible.code }).then(() => {
      history.push(getUrlWithEnquirySearch(`/input/medicalHistory`));
    });
  }

  const handleSubmit = () => {
    submit(selectedDeductible);
  };

  const handleDeductibleChange = ({ label, value }) => {
    const updatedDeductible = { code: value, display_name: label };
    setSelectedDeductible(updatedDeductible);
    submit(updatedDeductible);
  };

  return (
    <div className="p-3" {...props}>
      <Title
        dangerouslySetInnerHTML={{
          __html: posContent.question
            ? posContent.question
            : "Select your deductible?",
        }}
      ></Title>
      <CustomProgressBar now={4} total={5} />
      <div>
        <Dropdown
          label="Deductible"
          value={
            selectedDeductible
              ? getReactSelectOption(selectedDeductible)
              : "select"
          }
          onChange={handleDeductibleChange}
          options={deductibles.map(getReactSelectOption)}
        />
      </div>
      <div className="mt-3">
        <InputFormCta
          disabled={!selectedDeductible}
          backLink={getUrlWithEnquirySearch(
            `/input/location-${getLastGroup().id}`,
          )}
          onContinueClick={handleSubmit}
          loader={updateEnquiryQuery.isLoading}
        />
      </div>
    </div>
  );
}

export default DeductibleForm;
