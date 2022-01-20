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
import { setFilters } from "../../quotePage/quote.slice";

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

const Form3 = ({ handleChange, currentForm, lastForm }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(false);
  const [diseaseArray, setDiseaseArray] = useState([]);
  const [customErrors, setCustomErrors] = useState(false);
  const [planTypeSelected, { isSuperTopUpJourney }] = useSelector(state => [
    state.quotePage.filters.planType,
    state.greetingPage,
  ]);
  // const [isIndividualPlan, setIsIndividualPlan] = useState(false);

  // const greetingPage = useSelector((state) => state.greetingPage);
  // const {
  //   proposerDetails: { member, plan_type },
  // } = greetingPage;

  // useEffect(() => {
  //   if (plan_type && plan_type === "I") {
  //     setIsIndividualPlan(true);
  //   } else {
  //     setIsIndividualPlan(false);
  //   }
  // }, [plan_type]);

  const { frontendData } = useSelector(state => state.frontendBoot);
  const { data } = frontendData || [""];
  const { existingdiseases } = data || [""];
  const { defaultfilters, covers, plantypes } = frontendData.data;
  const { cover, tenure, plan_type } = defaultfilters;
  useEffect(() => {
    dispatch(
      setFilters({
        cover: covers.find(c => c.code === cover).display_name,
        planType: plantypes.find(p => p.code === plan_type).display_name,
        multiYear: `${tenure} Year`,
      }),
    );
  }, []);
  console.log(diseaseArray);
  const ls = new SecureLS();
  const history = useHistory();
  const pushToQuotes = groupCode => {
    history.push({
      pathname: `/quotes/${groupCode}`,
      search: `enquiryId=${ls.get("enquiryId")}`,
    });
  };

  const handleSubmit = () => {
    if (selected) {
      const medical_history = [...diseaseArray];

      dispatch(
        saveForm5UserDetails(
          medical_history,
          !isSuperTopUpJourney && pushToQuotes,
          isSuperTopUpJourney,
        ),
      );
      isSuperTopUpJourney && handleChange(6);
    } else {
      setCustomErrors("Please Select One");
    }
  };
  const handleDiseases = disease => {
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
                  onClick={e => {
                    if (display_name === "No") {
                      setSelected(e.target.value);
                      const medical_history = [...diseaseArray];
                      //console.log("mediacal_hiostory on no", medical_history);
                      //console.log(
                      //  "Again set plan type by form 4",
                      //  planTypeSelected
                      //);
                      dispatch(
                        saveForm5UserDetails(
                          medical_history,
                          !isSuperTopUpJourney && pushToQuotes,
                          planTypeSelected,
                        ),
                      );
                      //console.log("I m executed here in form 4");
                      //dispatch(setPlanType(planTypeSelected));
                      isSuperTopUpJourney && handleChange(6);
                    } else {
                      setSelected(e.target.value);
                    }
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
            handleChange(`4.${lastForm}`);
          },
          handleSubmit,
          !isSuperTopUpJourney,
        )}
      </div>
    </div>
  );
};

export default Form3;
