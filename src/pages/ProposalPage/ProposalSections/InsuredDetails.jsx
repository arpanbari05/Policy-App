import React, { useEffect, useState } from "react";
import Panel from "./../components/AccordionPanel/Panel";
import FormBuilder from "../../../components/FormBuilder/FormBuilder";
import { Form } from "./../ProposalPage.style";
import { components } from "../components/componentSchema";
import styled from "styled-components";
import ContinueBtn from "../components/Buttons/ContinueBtn";
import BackBtn from "../components/Buttons/BackBtn";
import useProposalSections from "./useProposalSections";
import useMedicalQuestions from "./useMedicalQuestions";
import { useDispatch, useSelector } from "react-redux";
import {
  noForAllCheckedFalse,
  noForAllCheckedTrue,
  setProposalData,
} from "./ProposalSections.slice";
import { useGetProposalDataQuery } from "../../../api/api";
import ProposalCheckBox from "../../../components/Common/ProposalSummary/summaryCheckBox";

import "styled-components/macro";
import { element } from "prop-types";
import CheckBox from "../components/Checkbox/Checkbox";
import Checkbox2 from "../../ComparePage/components/Checkbox/Checbox";
import { useFrontendBoot, useTheme, useMembers } from "../../../customHooks";
import { RevisedPremiumPopup } from "../../ProductDetails/components/ReviewCart";

const InsuredDetails = ({
  schema,
  setActive,
  name,
  defaultValue,
  setBack,
  continueSideEffects,
}) => {
  const [show, setShow] = useState(1);
  const {
    values,
    setValues,
    isValid,
    setValid,
    submit,
    setSubmit,
    setFinalSubmit,
    additionalErrors,
    revisedPremiumPopupUtilityObject,
  } = useProposalSections(
    setActive,
    name,
    defaultValue,
    Object.keys(schema).length,
    setShow,
  );
  const { proposalData } = useSelector(state => state.proposalPage);

  const { noForAll, setNoForAll, checkCanProceed, canProceed, yesSelected } =
    useMedicalQuestions(schema, values, setValues, name, proposalData);

  const { getGroupMembers } = useMembers();

  const { colors } = useTheme();

  const PrimaryColor = colors.primary_color;

  const [initColor, setInitColor] = useState(PrimaryColor);

  const dispatch = useDispatch();

  const { insuredMembers: membersDataFromGreetingPage, groups } =
    useFrontendBoot();

  const fullName = proposalData["Proposer Details"]?.name;

  useEffect(() => {
    if (
      name === "Insured Details" &&
      Object.values(schema).length &&
      // && Object.keys(values).
      proposalData["Proposer Details"]
    ) {
      let prefilledValues = {};

      if (schema) {
        // let tempAllMemberDetail = {...values};
        let currentYear = new Date().getUTCFullYear();
        let currentMonth = new Date().getMonth();
        let currentDate = new Date().getDate();
        Object.keys(schema).forEach(memberType => {
          if (memberType === "self") {
            let tempObj = {};
            schema["self"].forEach(item => {
              if (
                (proposalData["Proposer Details"][item.name] &&
                  (!proposalData["Insured Details"] ||
                    !proposalData["Insured Details"][memberType][item.name])) ||
                (proposalData["Proposer Details"][item.name] &&
                  proposalData["Insured Details"][memberType][item.name] &&
                  proposalData["Insured Details"][memberType][item.name] !==
                    proposalData["Proposer Details"][item.name])
              )
                tempObj = {
                  ...tempObj,
                  [item.name]: proposalData["Proposer Details"][item.name],
                };
            });
            prefilledValues[memberType] =
              values && values[memberType]
                ? { ...values[memberType], ...tempObj }
                : tempObj;
          } else if (
            // for autopopulate Estimated DOB
            !proposalData["Insured Details"] ||
            !proposalData["Insured Details"][memberType].dob
          ) {
            let memberAge = membersDataFromGreetingPage.find(
              member => member.type === memberType,
            )?.age;
            console.log("cghdhd", Number(memberAge));
            let estimatedMemberDOB;
            if (
              `${memberAge}`.includes("Month") ||
              `${`${memberAge}`}`.includes(".")
            ) {
              let current = new Date();
              current.setMonth(
                current.getMonth() -
                  (`${memberAge}`.includes(".")
                    ? parseInt(`${memberAge}`.split(".")[1])
                    : parseInt(memberAge)) -
                  1,
              );

              estimatedMemberDOB = `${current.getUTCFullYear()}`;
            } else {
              estimatedMemberDOB = `${currentYear - parseInt(memberAge)}`;
            }

            prefilledValues[memberType] = {
              ...(values && values.hasOwnProperty(memberType)
                ? values[memberType]
                : {}),
              dob: estimatedMemberDOB,
            };
          }
          if (
            !proposalData["Insured Details"] ||
            !proposalData["Insured Details"][memberType]?.insured_marital
          ) {
            if (findGroupMembersCount(memberType) > 1)
              prefilledValues[memberType] = {
                ...prefilledValues[memberType],
                insured_marital: "2",
              };
            else
              prefilledValues[memberType] = {
                ...prefilledValues[memberType],
                insured_marital: "1",
              };
          }
        });
        console.log("sbnlfkb", prefilledValues, membersDataFromGreetingPage);

        setValues({
          ...values,
          ...prefilledValues,
        });
      }
    }
  }, []);

  function formatter(number) {
    if (!isNaN(number)) number = parseInt(number);
    const updatedNumber = number.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    return updatedNumber;
  }

  const findGroupMembersCount = member => {
    groups.forEach(group => {
      return group.members.includes(member.toLowerCase())
        ? group.members.count
        : 0;
    });
  };

  return (
    <div>
      {Object.keys(schema).map((item, index) => {
        let result = [];
        if (values && name === "Insured Details") {
          values[item] &&
            Object.keys(values[item]).forEach(key => {
              if (key === "dob" && values[item][key]) {
                let updatedKey = values[item][key].split("-");
                const date = updatedKey[0];
                const month = updatedKey[1];
                const year = updatedKey[2] || values[item][key];
                updatedKey = `${year}`;
                result[1] = updatedKey;
              } else if (key === "name" && values[item][key]) {
                result[0] = `${values[item]["title"]}. ${values[item][key]}`;
              } else if (key !== "title") {
                // result[2] = `${values[item][key]}`;
              }
            });

          result = result.filter(r => r);
        }
        return (
          <Panel
            allMembers={getGroupMembers(parseInt(item))}
            formName={name}
            isFilled={
              Object.keys(values && values[item] ? values[item] : {}).length
            }
            // values={Object.values(
            //   values && values[item] ? values[item] : {},
            // ).join(", ")}
            values={result.join(", ")}
            key={index}
            title={`${item}`}
            show={show === "all" ? true : show === index + 1 ? true : false}
            onClick={() =>
              setShow(prev => (prev === index + 1 ? 0 : index + 1))
            }
          >
            <div>
              {name === "Medical Details" && (
                <div
                  css={`
                    margin: 20px 29px;
                    margin-top: -36px;
                    @media (max-width: 1024px) {
                      margin-top: 10px;
                    }
                  `}
                >
                  <div
                    css={`
                      display: flex;
                      justify-content: flex-end;

                      & .container {
                        margin: 0;
                        width: max-content;
                      }
                      @media (max-width: 1024px) {
                        justify-content: flex-start;
                        margin-left: -26px;
                      }
                    `}
                  >
                    <div style={{ marginRight: "15px" }}>
                      <Checkbox2
                        showTitle={false}
                        title={"No" + item}
                        //value={noForAll[item]}
                        checked={noForAll[item]}
                        onChange={e => {
                          setNoForAll({
                            ...noForAll,
                            [item]: e.target.checked,
                          });
                          // if (noForAllChecked) {
                          //   dispatch(noForAllCheckedFalse());
                          // } else {
                          //   dispatch(noForAllCheckedTrue());
                          // }
                        }}
                      ></Checkbox2>{" "}
                    </div>
                    <span>No For All Questions </span>{" "}
                  </div>

                  {!noForAll[item] && !yesSelected[item] && (
                    <p
                      css={`
                        display: flex;
                        font-size: 12px;
                        justify-content: flex-end;
                        color: ${initColor};
                        @media (max-width: 1024px) {
                          justify-content: flex-start;
                          /* margin-left: -26px; */
                        }
                      `}
                    >
                      Please select the checkbox if no for all questions item
                    </p>
                  )}
                </div>
              )}
              <Form>
                <FormBuilder
                  isInsuredDetails
                  keyStr={item}
                  lastName={fullName?.split(" ").slice(-1)}
                  schema={schema[item]}
                  components={components}
                  fetchValues={res => {
                    setValues({ ...values, [item]: res });
                  }}
                  fetchValid={res => {
                    let valid = isValid;
                    valid[index] = res;
                    setValid(valid);
                  }}
                  options={{
                    defaultValues: values ? values[item] : {},
                    validateOn: "change",
                  }}
                  formName={name}
                  additionalErrors={additionalErrors[item]}
                  setSubmit={setSubmit}
                  submitTrigger={submit}
                  noForAll={noForAll[item]}
                  proposalData={proposalData}
                  setNoForAll={value => {
                    setNoForAll({ ...noForAll, [item]: value });
                  }}
                />
              </Form>{" "}
            </div>
          </Panel>
        );
      })}
      <div className="proposal_continue_back_margin container">
        <BackBtn
          onClick={() => {
            setActive(prev => {
              if (prev === 0) return 0;
              else return prev - 1;
            });
          }}
        />

        <ContinueBtn
          onClick={() => {
            setInitColor("#c7222a");

            if (name === "Medical Details" && canProceed.canProceed) {
              setSubmit("PARTIAL");
              continueSideEffects();
            } else if (name !== "Medical Details") {
              setSubmit("PARTIAL");
              continueSideEffects();
            }
          }}
        />
      </div>

      {revisedPremiumPopupUtilityObject.isOn && (
        <RevisedPremiumPopup
          revisedPremiumPopupUtilityObject={revisedPremiumPopupUtilityObject}
          onClose={revisedPremiumPopupUtilityObject.off}
        />
      )}
    </div>
  );
};

export default InsuredDetails;
const NoCheckBox = styled.div`
  text-align: right;
  font-size: 18px;
  position: relative;
  right: 12px;
  @media (max-width: 768px) {
    text-align: left;
  }
`;
