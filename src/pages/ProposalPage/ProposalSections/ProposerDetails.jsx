import React, { useState, useEffect } from "react";
import { components } from "../components/componentSchema";
import FormBuilder from "../../../components/FormBuilder/FormBuilder";
import { Form } from "./../ProposalPage.style";
import BackBtn from "../components/Buttons/BackBtn";
import ContinueBtn from "../components/Buttons/ContinueBtn";
import useProposalSections from "./useProposalSections";
import { useDispatch, useSelector } from "react-redux";

import "styled-components/macro";
import BMI from "./components/BMI";
import { callApi } from "../../../components/FormBuilder/FormBuilder.slice";
import { setActiveIndex } from "./ProposalSections.slice";
import { useGetEnquiriesQuery } from "../../../api/api";
import { RevisedPremiumPopup } from "../../ProductDetails/components/ReviewCart";

const ProposerDetails = ({
  schema = {},
  setActive,
  name,
  defaultValue = {},
  setProposerDactive,
  setActivateLoader,
  setBlockTabSwitch,
  listOfForms,
}) => {
  const {
    values,
    setValues,
    setValid,
    submit,
    setSubmit,
    triggerSaveForm,
    revisedPremiumPopupUtilityObject,
    setErrorInField,
    setErrors,
  } = useProposalSections({
    setActive,
    name,
    setActivateLoader,
    setBlockTabSwitch,
    listOfForms,
  });

  const proposelSelectedDOBRedux = useSelector(
    ({ proposalPage }) => proposalPage?.proposalData["Proposer Details"]?.dob,
  );

  const dispatch = useDispatch();

  const {
    data: {
      data: {
        input: { gender, members },
        name: proposerName,
        mobile,
        email,
      },
    },
  } = useGetEnquiriesQuery();

  const firstName = proposerName?.split(" ")[0];

  useEffect(() => {
    if (name === "Proposer Details") {
      let proposerAge = parseInt(
        members?.filter(i => i.type === "self")[0]?.age,
      );
      let currentYear = new Date().getFullYear();

      let estimatedProposerDOB = `${currentYear - proposerAge}`;

      let prefilledValues = {
        name: proposerName,
        gender,
        mobile,
        email,
        dob: proposelSelectedDOBRedux || estimatedProposerDOB,
        title: gender === "M" ? "mr" : "",
      };

      schema.forEach(item => {
        if (item?.value)
          prefilledValues = { ...prefilledValues, [item?.name]: item?.value };
        if (item.fill && item.name === "pincode") {
          dispatch(
            callApi(item?.fill?.using, {
              [item.name]: item?.value,
              [item.fill.alsoUse]: values[item?.fill?.alsoUse],
            }),
            item.fill,
          );
        }
      });

      setValues({ ...prefilledValues, ...defaultValue });
    }
  }, []);

console.log("ergnjkg",values)

  return (
    <>
      <div>
        <Form>
          <FormBuilder
            schema={schema}
            formName={name}
            components={components}
            fetchValues={setValues}
            fetchErrors={setErrors}
            fetchValid={setValid}
            submitTrigger={submit}
            setSubmit={setSubmit}
            options={{ defaultValues: values, validateOn: "change" }}
            setErrorInField={setErrorInField}
            isPanelVisible={true}
          />
        </Form>
      </div>
      <div class="proposal_continue_back_margin container">
        <BackBtn
          hide={name === "Proposer Details"}
          onClick={() => {
            setProposerDactive(false);
            setActive(prev => {
              if (prev === 0) return 0;
              else return prev - 1;
            });
          }}
        />
        <ContinueBtn
          onClick={() => {
            setSubmit(true);
            triggerSaveForm({
              sendedVal: values,
              formName: "Proposer Details",
            });
          }}
        />
        {revisedPremiumPopupUtilityObject.isOnProposal && (
          <RevisedPremiumPopup
            revisedPremiumPopupUtilityObject={revisedPremiumPopupUtilityObject}
            onClose={revisedPremiumPopupUtilityObject.off}
            title={
              revisedPremiumPopupUtilityObject?.isAnyPlanUnAvailableInCart
                ? "Plan Unavailable due to change in date of birth"
                : `Hi ${firstName}, Revised Premium due to change in date of birth.`
            }
          />
        )}
      </div>
    </>
  );
};

export default ProposerDetails;
