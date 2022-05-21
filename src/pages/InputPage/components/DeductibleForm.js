import { useState, createRef } from "react";
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
import TextInput from "../../../components/TextInput";

function DeductibleForm({ posContent, ...props }) {
  const { updateEnquiry, ...updateEnquiryQuery } = useUpdateEnquiry();

  const history = useHistory();

  const [searchQuery, setSearchQuery] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);

  const {
    data: { deductibles },
  } = useFrontendBoot();

  const { data } = useGetEnquiriesQuery();

  const dropdownRef = createRef();

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
    setShowDropdown(false);
    const updatedDeductible = { code: value, display_name: label };
    setSelectedDeductible(updatedDeductible);
    setSearchQuery("");
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
        <TextInput
          label={"Select minimum deductible"}
          placeholder="Select"
          onClick={() => setShowDropdown(prev => !prev)}
          autoComplete={"off"}
          onChange={e => {
            setSelectedDeductible({});
            setSearchQuery(e.target.value);
            setShowDropdown(true);
          }}
          value={searchQuery || selectedDeductible?.display_name}
        />
        <Dropdown
          hideDefaultControl
          value={
            selectedDeductible
              ? getReactSelectOption(selectedDeductible)
              : "select"
          }
          onChange={handleDeductibleChange}
          options={deductibles.map(getReactSelectOption)}
          ref={dropdownRef}
          searchQuery={searchQuery}
          showDropdown={showDropdown}
        />
      </div>
      <p
        className="mt-4"
        css={`
          font-size: 12px;
          font-weight: 900;
          color: rgb(150, 150, 181);
          width: 97%;
        `}
      >
        Your minimum deductible amount should be equal to your existing Base
        Health plan's cover amount. Top Up will provide the coverage once the
        existing cover amount is exhausted.
      </p>
      <div className="mt-3">
        <InputFormCta
          disabled={!selectedDeductible?.code}
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
