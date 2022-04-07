import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { renderField } from "../../../components/FormBuilder/formUtils";

import {
  saveProposalData,
  submitProposalData,
  setMedUnderwritting,
  setProposalData,
  setShowBMI,
  setShowNSTP,
  setActiveIndex,
  getProposalData,
  setFailedBmiData,
} from "./ProposalSections.slice";
import useUrlQuery from "../../../customHooks/useUrlQuery";
import { useRevisedPremiumModal } from "../../../customHooks";
import { useGetEnquiriesQuery } from "../../../api/api";

const useProposalSections = ({
  setActive,
  defaultValue,
  partialLength,
  setActivateLoader,
  setShow,
}) => {
  const [values, setValues] = useState(defaultValue);
  const [errors, setErrors] = useState({});
  console.log("dbdgbgbndgbd 2", errors, values);
  const [errorInField, setErrorInField] = useState(true);

  const history = useHistory();

  const queryStrings = useUrlQuery();

  const enquiryId = queryStrings.get("enquiryId");

  const [isValid, setValid] = useState(
    partialLength ? Array(partialLength) : undefined,
  );

  const { data: equriesData } = useGetEnquiriesQuery();

  const groups = equriesData.data ? equriesData.data.groups : [];

  const [allDataSubmitted, setAllDataSubmitted] = useState(false);

  const schema = useSelector(({ schema }) => schema.currentSchema);

  const [canProceedToSummary, setCanProceedToSummary] = useState(false);

  const revisedPremiumPopupUtilityObject = useRevisedPremiumModal();

  const dispatch = useDispatch();

  const havingAnyError = (errors, key) => {
    console.log("fvbdkvsv", errors, key);
    if (key) {
      return Object.values(errors[key]).some(el => Boolean(el));
    } else {
      return Object.keys(errors).map(key => {
        if (errors[key] instanceof Object) {
          return havingAnyError(errors, key);
        } else return Boolean(errors[key]);
      });
    }
    // return true
  };

  console.log("dfbnfdb", havingAnyError(errors), errors);

  const everyRequiredFilled = (schema, values) => {
    console.log("vbksdv", schema, values);
    if (Array.isArray(schema))
      return schema
        .filter(
          el => el.validate && el.validate.required && renderField(el, values),
        )
        .every(el => values[el.name]);
    else
      return Object.keys(schema)
        .map(key =>
          schema[key]
            .filter(
              el =>
                el.validate &&
                el.validate.required &&
                renderField(el, values, key),
            )
            .every(el => values[key][el.name]),
        )
        .includes(false)
        ? false
        : true;

    return false;
  };

  const [additionalErrors, setAdditionalErrors] = useState({});

  const [submit, setSubmit] = useState(false);

  // UPDATES THE VALUES REST OF THE FORMS
  const setSelfFieldsChange = ({
    checkFor,
    checkFrom,
    updationFor,
    dispatch,
    insuredDetails,
    callback,
  }) => {
    if (updationFor === "Other Details") {
      let updatedParent = { ...checkFor };

      Object.keys(checkFor).forEach(key => {
        if (
          Object.keys(insuredDetails).includes(checkFor[key].nominee_relation)
        ) {
          const groupCodeOfmember = groups.find(group =>
            group.members.includes(checkFor[key].nominee_relation),
          ).id;
          let checkFrom2 =
            checkFor[key].nominee_relation.toLowerCase() === "self"
              ? { ...checkFrom, ...insuredDetails.self }
              : insuredDetails[checkFor[key].nominee_relation.toLowerCase()];

          let updatedOtherDetail = { ...checkFor[key] };

          Object.keys(checkFor[key]).forEach(key2 => {
            let nameWithoutNominee = key2.slice(
              key2.indexOf("_") + 1,
              key2.length,
            );

            if (nameWithoutNominee === "contact") nameWithoutNominee = "mobile";
            if (
              nameWithoutNominee.includes("address") ||
              nameWithoutNominee.includes("pincode")
            )
              nameWithoutNominee += "_" + groupCodeOfmember;

            if (
              checkFrom2[nameWithoutNominee] &&
              checkFor[key][key2] !== checkFrom2[nameWithoutNominee]
            )
              updatedOtherDetail[key2] = checkFrom2[nameWithoutNominee];
          });
          updatedParent[key] = updatedOtherDetail;
        }
      });
      triggerSaveForm({
        sendedVal: updatedParent,
        formName: updationFor,
        callback,
      });
    } else if (updationFor === "Insured Details") {
      let updatedObj = { ...checkFor.self };
      let checkForKeys = Object.keys(checkFor.self);
      checkForKeys.forEach(key => {
        if (checkFrom[key] && checkFrom[key] !== checkFor.self[key])
          updatedObj[key] = checkFrom[key];
      });
      // updatedVal = { ...checkFor, self: updatedObj };
      triggerSaveForm({
        sendedVal: { ...checkFor, self: updatedObj },
        formName: updationFor,
        callback,
      });
    } else if (updationFor === "Medical Details") {
      let updatedObj = checkFor;
      triggerSaveForm({
        sendedVal: updatedObj,
        formName: updationFor,
        callback,
      });
    }
  };

  const schemaKeys = Object.keys(schema);
  const getUnfilledForm = updatedProposalData => {
    return schemaKeys.indexOf(
      schemaKeys.find((key, index) => !updatedProposalData[key]),
    );
  };

  const triggerSaveForm = ({ sendedVal, formName, callback = () => {} }) => {
    if (havingAnyError(errors).includes(true)) {
      setShow(havingAnyError(errors).indexOf(true));
    }
    if (
      formName === "Proposer Details" &&
      !havingAnyError(errors).includes(true) &&
      everyRequiredFilled(schema[formName], sendedVal)
    ) {
      setSubmit(true);
      dispatch(
        saveProposalData(
          { [formName]: sendedVal },
          ({ prevProposalData, updatedProposalData }) => {
            if (
              prevProposalData["Insured Details"] &&
              prevProposalData["Insured Details"].self
            ) {
              setSelfFieldsChange({
                checkFor: prevProposalData["Insured Details"],
                checkFrom: sendedVal,
                updationFor: "Insured Details",
                dispatch: dispatch,
                callback: () => {
                  revisedPremiumPopupUtilityObject?.getUpdatedCart(() => {});
                },
              });
            } else {
              setActive(getUnfilledForm(updatedProposalData));
            }
          },
        ),
      );
    } else if (
      formName === "Insured Details" &&
      !havingAnyError(errors).includes(true) &&
      everyRequiredFilled(schema[formName], sendedVal)
    ) {
      dispatch(
        saveProposalData(
          { [formName]: sendedVal },
          ({ prevProposalData, updatedProposalData,responseData }) => {
            callback();

            revisedPremiumPopupUtilityObject?.getUpdatedCart(() => {});

            if (prevProposalData["Medical Details"]) {
              setSelfFieldsChange({
                checkFor: prevProposalData["Medical Details"],
                checkFrom: sendedVal,
                updationFor: "Medical Details",
                dispatch: dispatch,
                callback: () => {},
              });
            } else {
              if (
                responseData.failed_bmi.health &&
                !groups.some(
                  group => group.plan_type === "I" || group.plan_type === "F",
                )
              ) {
                dispatch(setFailedBmiData(responseData.failed_bmi.health));
                dispatch(
                  setShowBMI(
                    Object.keys(responseData.failed_bmi.health).join(", "),
                  ),
                );
              }
              console.log("sblsdwgsd", updatedProposalData);
              setActive(getUnfilledForm(updatedProposalData));
            }
          },
        ),
      );
    } else if (formName === "Medical Details" && !errorInField) {
      dispatch(
        saveProposalData(
          { [formName]: sendedVal },
          ({ prevProposalData, updatedProposalData }) => {
            callback();
            if (prevProposalData["Other Details"]) {
              setSelfFieldsChange({
                checkFor: prevProposalData["Other Details"],
                checkFrom: updatedProposalData["Proposer Details"],
                updationFor: "Other Details",
                dispatch: dispatch,
                insuredDetails: updatedProposalData["Insured Details"],
                callback: () => {},
              });
            } else {
              setActive(getUnfilledForm(updatedProposalData));
            }
          },
        ),
      );
    } else if (
      formName === "Other Details" &&
      !havingAnyError(errors).includes(true) &&
      everyRequiredFilled(schema[formName], sendedVal)
    ) {

      dispatch(
        saveProposalData(
          { [formName]: sendedVal },
          ({ prevProposalData, updatedProposalData }) => {
            callback();
            setAllDataSubmitted(true);
          },
        ),
      );
    }
  };

  // =================================================================================================================
  // ================================================  SIDE EFFECTS ==================================================
  // =================================================================================================================

  useEffect(() => {
    if (!revisedPremiumPopupUtilityObject.isOn && allDataSubmitted) {
      setCanProceedToSummary(true);
    } else setCanProceedToSummary(false);
  }, [revisedPremiumPopupUtilityObject.isOn, allDataSubmitted]);

  useEffect(() => {
    if (canProceedToSummary) {
      setActivateLoader(true);
      dispatch(
        submitProposalData(() => {
          history.push("/proposal_summary?enquiryId=" + enquiryId);
          setActivateLoader(false);
        }),
      );
    }
  }, [canProceedToSummary]);

  return {
    values,
    setValues,
    isValid,
    setValid,
    setSubmit,
    submit,
    revisedPremiumPopupUtilityObject,
    triggerSaveForm,
    setErrorInField,
    errorInField,
    additionalErrors,
    setErrors,
    errors,
  };
};

export default useProposalSections;
