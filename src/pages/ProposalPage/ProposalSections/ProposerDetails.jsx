import React, { useState, useEffect } from "react";
import { components } from "../components/componentSchema";
import FormBuilder from "../../../components/FormBuilder/FormBuilder";
import { Form } from "./../ProposalPage.style";
import BackBtn from "../components/Buttons/BackBtn";
import ContinueBtn from "../components/Buttons/ContinueBtn";
import useProposalSections from "./useProposalSections";
import { useDispatch, useSelector } from "react-redux";

import "styled-components/macro"
import BMI from "./components/BMI";
import { callApi } from "../../../components/FormBuilder/FormBuilder.slice";

const ProposerDetails = ({
  schema = {},
  setActive = () => { },
  name,
  defaultValue = {},
  activeForm,
}) => {
  const { values, setValues, setValid, submit, setSubmit, setCustomValid } =
    useProposalSections(setActive, name, defaultValue);
  const { proposerDetails } = useSelector(state => state.greetingPage);
  const dispatch = useDispatch();
  useEffect(() => {
    if (name === "Proposer Details") {
      let prefilledValues = {
        name: proposerDetails.name,
        gender: proposerDetails.gender,
        mobile: proposerDetails.mobile,
        email: proposerDetails.email,
        // pincode: proposerDetails.pincode.includes("-")
        //   ? proposerDetails.pincode.split("-")[1]
        //   : proposerDetails.pincode,
      };
      schema.forEach(item => {
        if (item.value)
          prefilledValues = { ...prefilledValues, [item.name]: item.value };
        if (item.fill && item.name === "pincode") {
          dispatch(
            callApi(item.fill.using, {
              [item.name]: item.value,
              [item.fill.alsoUse]: values[item.fill.alsoUse],
            }),
            item.fill,
          );
        }
      });
      setValues({ ...values, ...prefilledValues });
    }
  }, []);

  return (
    <>
      <div>
        <Form>
          <FormBuilder
            schema={schema}
            components={components}
            fetchValues={setValues}
            fetchValid={setValid}
            submitTrigger={submit}
            setSubmit={setSubmit}
            setCustomValid={setCustomValid}
            options={{ defaultValues: values, validateOn: "change" }}
          />
        </Form>
      </div>
      <div class="proposal_continue_back_margin"

      >
        <BackBtn
          hide={name === "Proposer Details"}
          onClick={() => {
            setActive(prev => {
              if (prev === 0) return 0;
              else return prev - 1;
            });
          }}
        />
        <ContinueBtn
          onClick={() => {
            setSubmit(true);
          }}
        />
      </div>
    </>
  );
};

export default ProposerDetails;
