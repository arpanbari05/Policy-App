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

const InsuredDetails = ({
  schema,
  setActive,
  name,
  defaultValue,
  setBack,
  setActivateLoader
}) => {
  const [continueBtnClick, setContinueBtnClick] = useState(false);
  const [show, setShow] = useState(1);
  const { proposalData } = useSelector(state => state.proposalPage);
  const { insuredMembers: membersDataFromGreetingPage, data: frontBootData } =
    useFrontendBoot();
  console.log("aefjbk", frontBootData);
  const { getGroupMembers, groups } = useMembers();

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
    errorInField,
    setErrorInField,
    triggerSaveForm
  } = useProposalSections({
    setActive,
    name,
    defaultValue,
    partialLength: Object.keys(schema).length,
    setShow,
    setActivateLoader
  });

  const { getPanelDescContent } = useInsuredDetails(
    name,
    schema,
    proposalData,
    values,

    membersDataFromGreetingPage,
    groups,
    setValues,
  );

  const { noForAll, setNoForAll, checkCanProceed, canProceed, yesSelected } =
    useMedicalQuestions(schema, values, setValues, name, proposalData);

  console.log("wgvkjdba", canProceed);
  const { colors } = useTheme();

  const PrimaryColor = colors.primary_color;

  const [initColor, setInitColor] = useState(PrimaryColor);

  const dispatch = useDispatch();

  const fullName = proposalData["Proposer Details"]?.name;

  // useEffect(() => {
  //   if(continueBtnClick && errorInField){
     
  //     setContinueBtnClick(false);
  //   }
  // },[submit,continueBtnClick])




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
                    setValues({ ...values, [item]: res });
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
              setSubmit("PARTIAL");
              triggerSaveForm({sendedVal:values,formName:name})
              // setContinueBtnClick(true);
            } else if (name !== "Medical Details") {
              setSubmit("PARTIAL");
              triggerSaveForm({sendedVal:values,formName:name})
              // setContinueBtnClick(true);
            }
          }}
        />
        {revisedPremiumPopupUtilityObject.isOn && (
          <RevisedPremiumPopup
            revisedPremiumPopupUtilityObject={revisedPremiumPopupUtilityObject}
            onClose={revisedPremiumPopupUtilityObject.off}
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
