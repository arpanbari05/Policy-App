import { useState } from "react";
import CustomProgressBar from "../../../components/ProgressBar";
import { Title, ErrorMessage } from "./FormComponents";
import RadioCapsule from "../../../components/RadioCapsule";

import "styled-components/macro";
import RadioButton from "../../../components/RadioButton";
import { useHistory } from "react-router";
import { useGetFrontendBootQuery } from "../../../api/api";
import { InputFormCta } from ".";
import {
  useFrontendBoot,
  useMembers,
  useUpdateEnquiry,
  useUrlEnquiry,
} from "../../../customHooks";

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

const MedicalHistoryForm = () => {
  const [selected, setSelected] = useState(false);
  const [diseaseArray, setDiseaseArray] = useState([]);
  const [appLoading, setAppLoading] = useState(false);
  const [customErrors, setCustomErrors] = useState(false);

  // =========================================

  const history = useHistory();
  const { getUrlWithEnquirySearch } = useUrlEnquiry();
  const { groups } = useMembers();
  const { updateEnquiry } = useUpdateEnquiry();
  const { data, isLoading } = useGetFrontendBootQuery();
  const { journeyType } = useFrontendBoot();
  const { existingdiseases } = data || [""];

  // ===========functions=============
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

  const handleSubmit = () => {
    setAppLoading(true);
    if (selected) {
      const existing_diseases = [...diseaseArray];
      if (selected !== "yes" && diseaseArray.length > 0) {
        updateEnquiry({ existing_diseases }).then(res => {
          if (res.error) {
            setAppLoading(false);
            return;
          }
          setAppLoading(false);
          history.push(getUrlWithEnquirySearch(`/quotes/${groups[0].id}`));
        });
      } else {
        setCustomErrors("Select a disease!");
        setAppLoading(false);
      }
    } else {
      setCustomErrors("Please Select One!");
      setAppLoading(false);
    }
  };

  // ============Component JSX======================

  return (
    <div
      css={`
        padding: 17px;
      `}
    >
      <Title>Any of the Insured Member have a Medical History?</Title>
      <CustomProgressBar now={5} total={5} />
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
                    setAppLoading(true);
                    updateEnquiry({ existing_diseases: [] }).then(res => {
                      if (res.error) {
                        setAppLoading(false);
                        return;
                      }
                      setTimeout(() => {
                        history.push(
                          getUrlWithEnquirySearch(`/quotes/${groups[0].id}`),
                        );
                        setAppLoading(false);
                      }, 3000);
                    });
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
        !isLoading &&
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
      <div className="mt-3">
        <InputFormCta
          backLink={() => {
            if (journeyType !== "top_up") {
              return getUrlWithEnquirySearch(`/input/location-${groups[0].id}`);
            } else {
              return getUrlWithEnquirySearch(`/input/deductible`);
            }
          }}
          onContinueClick={handleSubmit}
          loader={appLoading}
        />
      </div>
    </div>
  );
};

export default MedicalHistoryForm;
