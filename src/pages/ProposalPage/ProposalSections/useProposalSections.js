import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { getCart } from "../../Cart/cart.slice";
import {
  saveProposalData,
  setMedUnderwritting,
  setProposalData,
  setShowBMI,
  setShowNSTP,
  setActiveIndex,
} from "./ProposalSections.slice";
import { useRenewalPremiumModal } from "../../../customHooks";


const useProposalSections = (
  setActive,
  name,
  defaultValue,
  partialLength,
  setShow,
) => {
  const [values, setValues] = useState(defaultValue);

  const [isValid, setValid] = useState(
    partialLength ? Array(partialLength) : undefined,
  );

  const [customValid, setCustomValid] = useState();

  const dispatch = useDispatch();

  const [additionalErrors, setAdditionalErrors] = useState({});

  const [submit, setSubmit] = useState(false);

  const [finalSubmit, setFinalSubmit] = useState(false);

  const cart = useSelector(state => state.cart);

  const revisedPremiumPopupUtilityObject =
    useRenewalPremiumModal();

  useEffect(() => {
    if (typeof isValid === "object") {
      if (
        !isValid.some(item => item === undefined || item === false) &&
        submit &&
        submit !== "PARTIAL" &&
        finalSubmit
      ) {
        // setActive(prev => prev + 1);
      }
    } else if (isValid && submit) {
     
      dispatch(
        saveProposalData({ [name]: values }, () =>
          dispatch(setActiveIndex(false)),
        ),
      );

      setSubmit(false);
    }
    setFinalSubmit(false);
  }, [isValid, submit, finalSubmit, customValid]);

  useEffect(() => {
    if (
      submit === "SUBMIT" &&
      setShow &&
      isValid.some(item => item === undefined || item === false)
    ) {
      setShow(isValid.indexOf(false) + 1);
    }
    if (
      submit === "SUBMIT" &&
      setShow &&
      !isValid.some(item => item === undefined || item === false)
    ) {
      console.log("sfbnsflbjfs FIED")
      dispatch(
        saveProposalData(
          { [name]: values },
          response => {
            dispatch(setMedUnderwritting(response?.is_medical_under_writing));

            if (
              name === "Insured Details" &&
              !isValid.some(item => item === undefined || item === false)
            ) {
              if (response.failed_bmi.health) {
                dispatch(
                  setShowBMI(
                    Object.keys(response.failed_bmi.health).join(", "),
                  ),
                );
              } else {
                revisedPremiumPopupUtilityObject.getUpdatedCart();
                /* dispatch(
                  getCart(true, () => {
                    // setActive(prev => prev + 1);
                    revisedPremiumPopup.on();
                    dispatch(setActiveIndex(false));
                  }),
                ); */
              }
            } else if (
              name === "Medical Details" &&
              !isValid.some(item => item === undefined || item === false) &&
              submit
            ) {
              let flag = false;
              Object.keys(values).forEach(item => {
                if (
                  Object.keys(values[item]).some(
                    innerItem =>
                      values[item][innerItem] &&
                      values[item][innerItem][`is${innerItem}`] === "Y",
                  )
                ) {
                  flag = true;
                }
              });
              if (flag) dispatch(setShowNSTP(true));
              // setActive(prev => prev + 1);
              dispatch(setActiveIndex(false));
            } else if (
              !isValid.some(item => item === undefined || item === false) &&
              submit
            ) {
              // setActive(prev => prev + 1);
              dispatch(setActiveIndex(false));
            }
          },
          errors => {
            if (name === "Other Details" && errors) {
              const err = errors[Object.keys(errors || {})[0]];
              swal(`${err}`);
            }
            if (name === "Insured Details") {
              let errorsTemp = {};
              setShow("all");
              Object.keys(errors).forEach(item => {
                if (item !== "message") {
                  errorsTemp = {
                    ...errorsTemp,
                    [item]: { dob: errors[item][0] },
                  };
                }
              });
              setAdditionalErrors(errorsTemp);
            }
          },
        ),
      );
    }
  }, [submit]);

  return {
    values,
    setValues,
    isValid,
    setValid,
    setSubmit,
    submit,
    setFinalSubmit,
    setCustomValid,
    additionalErrors,
    revisedPremiumPopupUtilityObject,
  };
};

export default useProposalSections;
