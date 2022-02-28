// DEDUCTIBLE FORM
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import CustomProgressBar from "../../../components/ProgressBar";
import WideCustomDD from "../../../components/WideCustomDD";
import { SaveForm7UserDeatils } from "../greetingPage.slice";
import { ErrorMessage, formButtons, Title } from "./FormComponents";
import SecureLS from "secure-ls";
import { useState } from "react";
import { useDispatch } from "react-redux";
export const tempDDItems = [
  { display: "2 lacs", code: 200000 },
  { display: "3 lacs", code: 300000 },
  { display: "4 lacs", code: 400000 },
  { display: "5 lacs", code: 500000 },
  { display: "6 lacs", code: 600000 },
  { display: "7 lacs", code: 700000 },
  { display: "8 lacs", code: 800000 },
  { display: "9 lacs", code: 900000 },
];
const Form7 = ({ handleChange, currentForm }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState({
    display: "Select Your Deductible",
    code: 0,
  });
  console.log("The value", selectedValue);
  const [showError, setShowError] = useState(false);
  const ls = new SecureLS();
  const pushToQuotes = groupCode => {
    history.push({
      pathname: `/quotes/${groupCode}`,
      search: `enquiryId=${ls.get("enquiryId")}`,
    });
  };
  const handleSubmit = () => {
    console.log("Checked submit execution");
    if (selectedValue === "Select Your Deductible") {
      setShowError(true);
      return;
    }
    dispatch(SaveForm7UserDeatils(selectedValue, pushToQuotes));
  };
  return (
    <div
      css={`
        display: ${currentForm !== 6 && "none"};
      `}
    >
      <div
        css={`
          padding: 17px;
        `}
      >
        <Title>Select your deductible</Title>
        <CustomProgressBar now={currentForm} total={6} />
        <WideCustomDD
          ddItems={tempDDItems}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          setShowError={setShowError}
        />
        {showError && <ErrorMessage>Select a valid deductible</ErrorMessage>}
      </div>
      <ButtonHolder>
        {formButtons(handleChange.bind(null, 5), handleSubmit, true)}
      </ButtonHolder>
    </div>
  );
};
export default Form7;

const ButtonHolder = styled.div`
  @media (max-width: 480px) {
    padding: 0 17px;
  }
`;
