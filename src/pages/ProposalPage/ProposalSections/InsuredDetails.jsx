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
import useInsuredDetails from "./useInsuredDetails";
import { useDispatch, useSelector } from "react-redux";
import "styled-components/macro";
import Checkbox2 from "../../ComparePage/components/Checkbox/Checbox";
import { useFrontendBoot, useTheme, useMembers } from "../../../customHooks";
import { setShowErrorPopup } from "../ProposalSections/ProposalSections.slice";
import { RevisedPremiumPopup } from "../../ProductDetails/components/ReviewCart";
import useOtherDetails from "./useOtherDetails";

const InsuredDetails = ({
  schema,
  setActive,
  name,
  defaultValue,
  setActivateLoader,
}) => {
  const [show, setShow] = useState(0);
  const { proposalData } = useSelector(state => state.proposalPage);
  const insuredDetails = useSelector(
    ({ proposalPage }) => proposalPage.proposalData["Insured Details"],
  );
  const proposalDetails = useSelector(
    ({ proposalPage }) => proposalPage.proposalData["Proposer Details"],
  );
  const { insuredMembers: membersDataFromGreetingPage, data: frontBootData } =
    useFrontendBoot();

  const { getGroupMembers, groups } = useMembers();
console.log("bxfbkfxjb",defaultValue)
  const {
    values,
    setValues,
    isValid,
    setValid,
    submit,
    setSubmit,
    additionalErrors,
    revisedPremiumPopupUtilityObject,
    setErrorInField,
    triggerSaveForm,
    setErrors,
    errors,
  } = useProposalSections({
    setActive,
    name,
    defaultValue,
    partialLength: Object.keys(schema).length,
    setShow,
    setActivateLoader,
  });


useEffect(() => {

  if (isValid.includes(false)) {
    setShow(isValid.indexOf(false));
  }
  if (isValid.includes(undefined)) {
    setShow(isValid.indexOf(undefined));
  }

},[isValid])

  const { getPanelDescContent } = useInsuredDetails(
    name,
    schema,
    proposalData,
    values,
    membersDataFromGreetingPage,
    groups,
    setValues,
    defaultValue
  );

  const {
    nomineeRelationAutopopulated,
    setNomineeRelationAutopopulated,
    autoPopulateSelfOtherDetails
  } = useOtherDetails({  
    name,
    schema,
    proposalData,
    values,
    membersDataFromGreetingPage,
    groups,
    setValues,
    defaultValue,
    insuredDetails,
    proposalDetails,
  });

  const { noForAll, setNoForAll, checkCanProceed, canProceed, yesSelected } =
    useMedicalQuestions(schema, values, setValues, name, proposalData);
console.log("bldjbdfkl",canProceed)
  const { colors } = useTheme();

  const PrimaryColor = colors.primary_color;

  const [initColor, setInitColor] = useState(PrimaryColor);

  const dispatch = useDispatch();

  const fullName = proposalData["Proposer Details"]?.name;

  const firstName = fullName?.split(" ")[0];

  return (
    <div>
      {Object.keys(schema).map((item, index) => {
        return (
          <Panel
            allMembers={getGroupMembers(parseInt(item))}
            formName={name}
            isFilled={
              Object.keys(values && values[item] ? values[item] : {}).length
            }
            values={getPanelDescContent(item)}
            key={index}
            title={`${item}`}
            show={show === index}
            onClick={() => setShow(index)}
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
                        }}
                      ></Checkbox2>{" "}
                    </div>
                    <span>No For All Questions </span>{" "}
                  </div>

                  {!noForAll[item] && !yesSelected[item] && (
                    <p
                      id={initColor === PrimaryColor ? "noID" : item}
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
                    console.log("ckdjccda",res)
                    setValues(prev => ({ ...prev, [item]:res }));
                  }}
                  fetchErrors={res => {
                    setErrors(prev => ({ ...prev, [item]: res }));
                  }}
                  setErrorInField={setErrorInField}
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
                  canProceed={!yesSelected[item] ? canProceed : ""}
                  yesSelected={yesSelected}
                  setNoForAll={value => {
                    setNoForAll({ ...noForAll, [item]: value });
                  }}
                  setNomineeRelationAutopopulated={setNomineeRelationAutopopulated}
                  preFilledDataBase={defaultValue?defaultValue[item]:{}}
                  nomineeRelationAutopopulated={nomineeRelationAutopopulated}
                  autoPopulateSelfOtherDetails={({updateValues,selectedNomineeRelation}) => autoPopulateSelfOtherDetails({
                    schema: schema[item],
                    values: values? values[item] : {},
                    setValues:updateValues,
                    selectedNomineeRelation
                  })}
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
            name === "Medical Details" && checkCanProceed();

            // setShow();
            setSubmit("Medical");
            if (name === "Medical Details" && canProceed?.canProceed) {
              // NSTP popup for RB
              Object.values(yesSelected).includes(true) &&
                frontBootData?.settings?.medical_nstp_declaration_message &&
                dispatch(
                  setShowErrorPopup({
                    show: true,
                    head: "",
                    msg: frontBootData?.settings
                      ?.medical_nstp_declaration_message,
                  }),
                );

              triggerSaveForm({ sendedVal: values, formName: name });
              // setContinueBtnClick(true);
            }else if (name !== "Medical Details") {
              setSubmit("PARTIAL");
              triggerSaveForm({ sendedVal: values, formName: name });
              // setContinueBtnClick(true);
            }else if(name === "Medical Details" && !canProceed.canProceed){
              // const {canProceedArray} = canProceed;
              // console.log("wfvhjskv",)
              setShow(Object.keys(schema).indexOf(Object.keys(canProceed.checkCanProceed).find(key => canProceed.checkCanProceed[key] && canProceed.checkCanProceed[key].length)))
            }
          }}
        />
        {revisedPremiumPopupUtilityObject.isOn && (
          <RevisedPremiumPopup
            revisedPremiumPopupUtilityObject={revisedPremiumPopupUtilityObject}
            onClose={revisedPremiumPopupUtilityObject.off}
            title={
              name === "Medical Details"
                ? `Hi ${firstName}, Revised Premium due to change in date of birth.`
                : `Hi ${firstName}, Revised Premium due to change in medical conditions.`
            }
          />
        )}
      </div>
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
