import { useState, useEffect } from "react";
import StyledButton from "../../../components/StyledButton";
import TextInput from "../../../components/TextInput";
import CustomProgressBar from "../../../components/ProgressBar";
import {
  Title,
  SubTitle,
  ErrorMessage,
  formButtons,
  SubQuestions,
  SubAnswer,
} from "./FormComponents";
import { useSelector, useDispatch } from "react-redux";
import RadioCapsule from "../../../components/RadioCapsule";
import {
  getRegion,
  saveForm1UserDetails,
  saveForm4UserDetails,
  saveForm5UserDetails,
  setIsDisabled,
} from "../greetingPage.slice";
import "styled-components/macro";
import BackButton from "../../../components/BackButton";
import RadioButton from "../../../components/RadioButton";
import SecureLS from "secure-ls";
import { useHistory } from "react-router";

export const medicalHistoryRadioArr = [
  {
    type: "radio",
    id: "hasMedicalYes",
    code: "Yes",
    value: "Yes",
    display_name: "Yes",
    itemsCentered: true,
  },
  {
    type: "radio",
    id: "hasMedicalNo",
    code: "No",
    value: "No",
    display_name: "No",
    itemsCentered: true,
  },
];

const Form3 = ({ handleChange, currentForm }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const [diseaseArray, setDiseaseArray] = useState([]);
  const [customErrors, setCustomErrors] = useState(false);
  const [isIndividualPlan, setIsIndividualPlan] = useState(false);

  const greetingPage = useSelector((state) => state.greetingPage);
  const {
    proposerDetails: { member, plan_type },
  } = greetingPage;
  console.log(isIndividualPlan, "gdsa3", plan_type);
  useEffect(() => {
    if (plan_type && plan_type === "I") {
      setIsIndividualPlan(true);
    } else {
      setIsIndividualPlan(false);
    }
  }, [plan_type]);

  const { frontendData } = useSelector((state) => state.frontendBoot);
  const { data } = frontendData || [""];
  const { existingdiseases } = data || [""];

  console.log(diseaseArray);
  const ls = new SecureLS();
  const history = useHistory();
  const pushToQuotes = (groupCode) => {
    history.push({
      pathname: `/quotes/${groupCode}`,
      search: `enquiryId=${ls.get("enquiryId")}`,
    });
  };

  const handleSubmit = () => {
    console.log("aabbcc")
    if (selected) {
      const medical_history = [...diseaseArray];
      dispatch(
        saveForm5UserDetails(medical_history, pushToQuotes)


      );

    } else {
      setCustomErrors("Please Select One");
    }
  };
  const handleDiseases = (disease) => {
    const tempArray = [...diseaseArray];

    if (!tempArray.includes(disease)) {
      tempArray.push(disease);
    } else {
      const index = tempArray.indexOf(disease);

      if (index > -1) {
        tempArray.splice(index, 1);
      }
    }
    setDiseaseArray(tempArray);
  };

  return (
    <div
      css={`
        display: ${currentForm !== 5 && "none"};
      `}
    >
      <div
        css={`
          padding: 17px;
        `}
      >
        <Title>Do you have any medical history?</Title>
        <CustomProgressBar now={currentForm} total={5} />
        <div
          css={`
            margin-bottom: 13px;
          `}
        >
          {medicalHistoryRadioArr &&
            medicalHistoryRadioArr.map(({ code, display_name }, i) => {
              return (
                <RadioButton
                  onClick={(e) => {
                    customErrors && setCustomErrors(false);
                    setSelected(code);
                  }}
                  id={display_name}
                  value={code}
                  checked={selected === code || undefined}
                  label={display_name}
                />
              );
            })}
        </div>
        {selected === "Yes" &&
          existingdiseases.map(({ display_name, code }, i) => {
            return (
              <RadioCapsule
                value={code}
                id={code}
                styledCss={`margin-bottom: 10px; margin-right: 5px;`}
                label={display_name}
                checked={(diseaseArray.includes(code) && true) || undefined}
                onClick={() => handleDiseases(code)}
              />
            );
          })}
        {customErrors && <ErrorMessage>{customErrors}</ErrorMessage>}
        {/* {formButtons(() => {
          if (isIndividualPlan) {
            handleChange(2);
          } else {
            handleChange(3);
          }
        }, handleSubmit)} */}
        {formButtons(
          () => {
            handleChange(currentForm - 1);
          },
          handleSubmit,
          true
        )}
      </div>
    </div>
  );
};

export default Form3;
