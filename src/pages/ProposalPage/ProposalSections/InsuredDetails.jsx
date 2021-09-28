import React, { useEffect, useState } from "react";
import Panel from "./../components/AccordionPanel/Panel";
import FormBuilder from "../../../components/FormBuilder/FormBuilder";
import { Form } from "./../ProposalPage.style";
import { components } from "../components/componentSchema";
import styled from "styled-components";
import ContinueBtn from "../components/Buttons/ContinueBtn";
import BackBtn from "../components/Buttons/BackBtn";
import useProposalSections from "./useProposalSections";
import { useDispatch, useSelector } from "react-redux";
import { setProposalData } from "./ProposalSections.slice";
import ProposalCheckBox from "../../../components/Common/ProposalSummary/summaryCheckBox";

import "styled-components/macro";
import { element } from "prop-types";
import CheckBox from "../components/Checkbox/Checkbox";
import Checkbox2 from "../../ComparePage/components/Checkbox/Checbox";

const InsuredDetails = ({ schema, setActive, name, defaultValue }) => {
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
  } = useProposalSections(
    setActive,
    name,
    defaultValue,
    Object.keys(schema).length,
    setShow
  );

  const [noForAll, setNoForAll] = useState({});
  const [canProceed, setCanProceed] = useState({
    canProceed: false,
    canProceedArray: [],
  });
  const { proposalData } = useSelector((state) => state.proposalPage);
  const [mutateValues, setMutateValues] = useState();
  const dispatch = useDispatch();

  const checkCanProceed = () => {
    const key = Object.keys(values || {});
    const key2 = Object.keys(noForAll || {});
    // const hasYes =
    //   values?.[key] &&
    //   Object.keys(values?.[key] || {})?.some(
    //     data => values?.[key]?.[data]?.[`is${data}`] === "Y",
    //   );

    if (key.length !== key2.length) {
      let noForAll2 = {};
      Object.keys(values || {}).forEach((element) => {
        noForAll2[element] = noForAll[element] || false;
      });

      setNoForAll({ ...noForAll2 });
    } else {
      let isNotChecked = {};
      let hasYes = {};
      let checkCanProceed = [];
      key2.forEach((item) => {
        if (noForAll[item] !== true) {
          isNotChecked[item] = false;
        } else {
          isNotChecked[item] = true;
        }
        const temp =
          values?.[item] &&
          Object.keys(values?.[item] || {})?.some(
            (data) => values?.[item]?.[data]?.[`is${data}`] === "Y"
          );
        if (temp === true) {
          hasYes[item] = true;
        } else {
          hasYes[item] = false;
        }
      });

      key.forEach((item) => {
        if (hasYes[item] === isNotChecked[item]) {
          checkCanProceed.push(item);
        }
      });

      if (key2.length < 1) {
        isNotChecked = true;
      }

      if (checkCanProceed.length < 1) {
        setCanProceed({ canProceed: true, canProceedArray: [{}] });
      } else {
        setCanProceed({
          canProceed: false,
          canProceedArray: [...checkCanProceed],
        });
      }
    }
  };
  // console.log("hehe3he", values);
  useEffect(() => {
    if (
      name === "Insured Details" &&
      Object.keys(schema).some((item) => item === "self") &&
      proposalData["Proposer Details"]
    ) {
      console.log("hehe3he");
      let prefilledValues = {};
      schema["self"].forEach((item) => {
        if (proposalData["Proposer Details"][item.name])
          prefilledValues = {
            ...prefilledValues,
            [item.name]: proposalData["Proposer Details"][item.name],
          };
      });

      setValues({
        ...values,
        self: {
          ...(values?.self ? values.self : {}),
          ...prefilledValues,
        },
      });
    } else if (
      name === "Medical Details" &&
      !Object.keys(values ? values : {}).length
    ) {
      let initial = {};
      Object.keys(schema).forEach((item) =>
        schema[item].forEach((innerItem) => {
          if (innerItem.name)
            initial = {
              ...initial,
              [item]: {
                ...(initial[item] ? initial[item] : {}),
                [innerItem.name]: "",
              },
            };
        })
      );
      setValues(initial);
    }
  }, []);

  useEffect(() => {
    if (name === "Medical Details") checkCanProceed();
  }, [values, noForAll]);

  useEffect(() => {
    if (name === "Medical Details") {
      const key = Object.keys(values || {});
      let tempObj = JSON.parse(JSON.stringify(values || {}));
      key.forEach((keyValue) => {
        schema?.[keyValue]?.forEach((element) => {
          //'nominee_relation=self/Proposer Details.name'
          if (
            element?.populate &&
            tempObj[keyValue][element.populate.split("/")[0].split("=")[0]] ===
              element.populate.split("/")[0].split("=")[1] &&
            tempObj[keyValue][element.name] !==
              proposalData[element.populate.split("/")[1].split(".")[0]][
                element.populate.split("/")[1].split(".")[1]
              ]
          ) {
            tempObj[keyValue][element.name] =
              proposalData[element.populate.split("/")[1].split(".")[0]][
                element.populate.split("/")[1].split(".")[1]
              ];
          }
        });
      });
      if (JSON.stringify(values) !== JSON.stringify(tempObj)) {
        setValues({ ...tempObj });
      }
    }
  }, [values]);

  useEffect(() => {
    checkCanProceed();
  }, []);
  return (
    <div>
      {Object.keys(schema).map((item, index) => {
        return (
          <Panel
            formName={name}
            isFilled={
              Object.keys(values && values[item] ? values[item] : {}).length
            }
            values={Object.values(
              values && values[item] ? values[item] : {}
            ).join(", ")}
            key={index}
            title={`${item}`}
            show={show === "all" ? true : show === index + 1 ? true : false}
            onClick={() =>
              setShow((prev) => (prev === index + 1 ? 0 : index + 1))
            }
          >
            <div>
              {name === "Medical Details" && (
                <div
                  css={`
                    margin: 20px 29px;
                    margin-top: -36px;
                    @media(max-width:1024px){
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
                      @media(max-width:1024px){
                        justify-content: flex-start;
                        margin-left: -26px;
                      }
                    `}
                  >
                    <Checkbox2
                      css
                      showTitle={false}
                      title={"No" + item}
                      value={noForAll[item]}
                      onChange={(e) => {
                        setNoForAll({ ...noForAll, [item]: e.target.checked });
                      }}
                    ></Checkbox2>{" "}
                    <span>No For All Questions </span>{" "}
                  </div>
                  {!canProceed?.canProceed &&
                    canProceed?.canProceedArray?.includes(item) && (
                      <p
                        css={`
                          display: flex;
                          justify-content: flex-end;
                          color: #0a87ff;
                        `}
                      >
                        Please select the checkbox if no for all questions item
                      </p>
                    )}
                </div>
              )}
              <Form>
                <FormBuilder
                  schema={schema[item]}
                  components={components}
                  fetchValues={(res) => {
                    setValues({ ...values, [item]: res });
                  }}
                  fetchValid={(res) => {
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
                  setNoForAll={(value) => {
                    setNoForAll({ ...noForAll, [item]: value });
                  }}
                />
              </Form>{" "}
            </div>
          </Panel>
        );
      })}
      <div className="proposal_continue_back_margin">
        <BackBtn
          onClick={() => {
            setActive((prev) => {
              if (prev === 0) return 0;
              else return prev - 1;
            });
          }}
        />
        <ContinueBtn
          onClick={() => {
            if (name === "Medical Details" && canProceed.canProceed) {
              setSubmit("PARTIAL");
            } else if (name !== "Medical Details") {
              setSubmit("PARTIAL");
            }
          }}
        />
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
