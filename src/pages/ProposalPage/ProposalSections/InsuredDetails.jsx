import React, { useEffect, useState } from "react";
import Panel from "./../components/AccordionPanel/Panel";
import FormBuilder from "../../../components/FormBuilder/FormBuilder";
import { Form } from "./../ProposalPage.style";
import { components } from "../components/componentSchema";
import ContinueBtn from "../components/Buttons/ContinueBtn";
import BackBtn from "../components/Buttons/BackBtn";
import useProposalSections from "./useProposalSections";
import useMedicalQuestions from "./useMedicalQuestions";
import useInsuredDetails from "./useInsuredDetails";
import { useDispatch, useSelector } from "react-redux";
import "styled-components/macro";
import Checkbox2 from "../../ComparePage/components/Checkbox/Checbox";
import { useFrontendBoot, useTheme, useMembers } from "../../../customHooks";
import { setShowErrorPopup, getMedicalUnderwritingStatus } from "../ProposalSections/ProposalSections.slice";
import { RevisedPremiumPopup } from "../../ProductDetails/components/ReviewCart";
import useOtherDetails from "./useOtherDetails";
import StyledButton from "../../../components/StyledButton";
import {DisableScreen, UnderWritingDiscisionTable} from "./insuredDetails.styles"
import SpinLoader from "../../../components/Common/SpinLoader/SpinLoader";

const InsuredDetails = ({
  schema,
  setActive,
  name,
  defaultValue,
  setActivateLoader,
  setBlockTabSwitch,
}) => {
  const [medicalContinueClick, setMedicalContinueClick] = useState(false);
  const { proposalData, showErrorPopup, insuredDetailsResponse, underWritingStatus,medicalUrlsRuleEngine,mdicalUnderwritingLetters } = useSelector(
    state => state.proposalPage,
  );
  const dispatch = useDispatch();

  const insuredDetails = useSelector(
    ({ proposalPage }) => proposalPage.proposalData["Insured Details"],
  );

  const proposalDetails = useSelector(
    ({ proposalPage }) => proposalPage.proposalData["Proposer Details"],
  );
  const {
    insuredMembers: membersDataFromGreetingPage,
    data: frontBootData,
    renewal_policy_status,
  } = useFrontendBoot();
  // const [checking]
  const { getGroupMembers, groups } = useMembers();

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
    equriesData,
    show,
    setShow,
    cartEntries,
    isVersionRuleEngine
  } = useProposalSections({
    setActive,
    name,
    defaultValue,
    partialLength: Object.keys(schema).length,
    setActivateLoader,
    schema,
    setBlockTabSwitch,
  });
  useEffect(() => {
    if (name === "Insured Details" && isValid.includes(false))
      setShow(isValid.indexOf(false));
  }, [...isValid]);

  const { getPanelDescContent } = useInsuredDetails(
    name,
    schema,
    proposalData,
    values,
    membersDataFromGreetingPage,
    groups,
    setValues,
    defaultValue,
    equriesData,
  );

  const {
    nomineeRelationAutopopulated,
    setNomineeRelationAutopopulated,
    autoPopulateSelfOtherDetails,
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

  const { noForAll, setNoForAll, checkCanProceed, canProceed, yesSelected, preparingMQ,getMUStatus } =
    useMedicalQuestions({
      schema,
      values,
      setValues,
      name,
      proposalData,
      defaultValue,
      dispatch,
      isVersionRuleEngine,
      medicalUrlsRuleEngine,
      insuredDetailsResponse,
      underWritingStatus
    });
    console.log("wrghrjksgv",values,cartEntries,schema,noForAll,yesSelected)

  const { colors } = useTheme();

  const PrimaryColor = colors.primary_color;

  const [initColor, setInitColor] = useState(PrimaryColor);


  const fullName = proposalData["Proposer Details"]?.name;

  const firstName = fullName?.split(" ")[0];

  useEffect(() => {
    console.log("sdbjhdkgb",{ medicalContinueClick,isValid,underWritingStatus,medicalUrlsRuleEngine,showErrorPopup});
    
    if(
      medicalContinueClick &&
      medicalUrlsRuleEngine &&
      underWritingStatus.length &&
    !underWritingStatus.map(({result}) => result)?.includes("NotSubmitted")
    ){
      if(underWritingStatus.map(({result}) => result)?.includes("Manual_UV") ||
      underWritingStatus.map(({result}) => result)?.includes("MER")){
        dispatch(
          setShowErrorPopup({
            show: true,
            head: "",
            msg: "Your application will be reviewed by our Underwriting team.",
          }),
        );
      }
      triggerSaveForm({ sendedVal: values, formName: name });
    }else if (
      medicalContinueClick &&
      !isValid.includes(undefined) &&
      !isValid.includes(false) &&
      !showErrorPopup?.show
    ) {
      triggerSaveForm({ sendedVal: values, formName: name });
      
    }else if(isValid.includes(false)){
      setShow(isValid.indexOf(false));
    }
    setMedicalContinueClick(false);
  }, [isValid, medicalContinueClick, showErrorPopup,underWritingStatus]);

  if (preparingMQ) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        {/* <span className="lds-dual-ring colored--loader"></span> */}
        <p>Preparing Medical Questions, Please Wait</p>
        <SpinLoader proposalpage={true} />
      </div>
    );
  }

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
            onClick={() => setShow(prev => (prev === index ? false : index))}
          >
          {
            isVersionRuleEngine(parseInt(item)) && name === "Medical Details"?(
              <UnderWritingDiscisionTable>
              <div className="head_section section_row d-flex align-items-center justify-content-evenly">
                <div className="section_column">Member</div>
                <div className="section_column">Medical Questions</div>
                <div className="section_column">Underwiting Discision</div>
              </div>
              {medicalUrlsRuleEngine &&
                Object.keys(medicalUrlsRuleEngine).map(member => {
                  return item.toLowerCase().includes(member.toLowerCase())?(
                    <>
                      <div className="section_row d-flex align-items-center">
                        <div className="section_column">{member}</div>
                        <div className="section_column">
                        <a href={medicalUrlsRuleEngine[member].medical_question_url} className="click_btn" target="_blank">
                        Click here
                                  </a>
                        </div>
                        <div className="section_column">{getMUStatus(member) || "Not Submitted"}
                        {getMUStatus(member) !== "NotSubmitted" && !getMUStatus(member)?.toLowerCase()?.includes("accepted") && mdicalUnderwritingLetters?.[member]?.medical_question_url?(
                          <a href={mdicalUnderwritingLetters?.[member]?.medical_question_url} className="click_btn" target="_blank">
                        Click here
                                  </a>
                        ):(<></>)}
                        </div>
                      </div>
                    </>
                  ):(
                    <></>
                  )
                })}
      
              </UnderWritingDiscisionTable> 
            ):(
              <div>
              
              {name === "Medical Details" && renewal_policy_status?.medicalQuestionsReadOnly ? (
                <DisableScreen></DisableScreen>
              ) : (
                <></>
              )}
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
                  fetchValues={(res = () => {}) => {
                    setValues(prev => {
                      return { ...prev, [item]: res(prev?.[item]) }
                    });
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
                    defaultValues: defaultValue?defaultValue[item]:values?.[item] || {},
                    validateOn: "change",
                  }}
                  formName={name}
                  additionalErrors={additionalErrors[item]}
                  setSubmit={setSubmit}
                  submitTrigger={submit}
                  isPanelVisible={show === index}
                  noForAll={noForAll[item]}
                  proposalData={proposalData}
                  canProceed={!yesSelected[item] ? canProceed : ""}
                  yesSelected={yesSelected}
                  setNoForAll={value => {
                    setNoForAll({ ...noForAll, [item]: value });
                  }}
                  setNomineeRelationAutopopulated={
                    setNomineeRelationAutopopulated
                  }
                  preFilledDataBase={defaultValue ? defaultValue[item] : {}}
                  nomineeRelationAutopopulated={nomineeRelationAutopopulated}
                  autoPopulateSelfOtherDetails={({
                    updateValues,
                    selectedNomineeRelation,
                  }) =>
                    autoPopulateSelfOtherDetails({
                      schema: schema[item],
                      values: values ? values[item] : {},
                      setValues: updateValues,
                      selectedNomineeRelation,
                    })
                  }
                />
              </Form>{" "}
            </div>
            )
          }
          
          </Panel>
        );
      })}
      {console.log("Svsfods", underWritingStatus,insuredDetailsResponse)}

 
      <div className="proposal_continue_back_margin container">
        <BackBtn
          onClick={() => {
            setActive(prev => {
              if (prev === 0) return 0;
              else return prev - 1;
            });
          }}
        />

       {/* <div className="check_status_btn">
        <StyledButton noIcon={true} styledCss={{    padding: "0px 10px", fontSize:"16px"}}>
        Check Underwriting Status
      </StyledButton>
        </div> */}
       

        <ContinueBtn
          onClick={() => {
            setInitColor("#c7222a");
            if(name === "Medical Details"){
              checkCanProceed();
              console.log("dbjfbjfd",)
              dispatch(getMedicalUnderwritingStatus());
            }
            setSubmit("Medical");
            console.log("ewrgnjkrsv", canProceed);
            if (
              name === "Medical Details" && 
            canProceed?.canProceed
            //  && (Object.keys(insuredDetailsResponse).length?underWritingStatus.length:true)
            ) {
              // NSTP popup for RB
              console.log("grnsgh",yesSelected,frontBootData?.settings?.medical_nstp_declaration_message)
              Object.values(yesSelected).includes(true) &&
                frontBootData?.settings?.medical_nstp_declaration_message &&
                dispatch(
                  setShowErrorPopup({
                    show: true,
                    head: "",
                    msg: frontBootData?.settings
                      ?.medical_nstp_declaration_message,
                      handleClose:() => {
                setMedicalContinueClick(true);
                      }
                  }),
                );
                setMedicalContinueClick(true);

              // setContinueBtnClick(true);
            } else if (name !== "Medical Details") {
              setSubmit("PARTIAL");
              triggerSaveForm({ sendedVal: values, formName: name });
            } else if (name === "Medical Details" && !canProceed.canProceed) {
              setShow(
                Object.keys(schema).indexOf(
                  Object.keys(canProceed.checkCanProceed).find(
                    key =>
                      canProceed.checkCanProceed[key] &&
                      canProceed.checkCanProceed[key].length,
                  ),
                ),
              );
            }
          }}
        />
        {revisedPremiumPopupUtilityObject.isOnProposal && (
          <RevisedPremiumPopup
            revisedPremiumPopupUtilityObject={revisedPremiumPopupUtilityObject}
            onClose={revisedPremiumPopupUtilityObject.off}
            title={
              revisedPremiumPopupUtilityObject?.isAnyPlanUnAvailableInCart
                ? "Plan Unavailable due to change in date of birth"
                : name === "Medical Details"
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



