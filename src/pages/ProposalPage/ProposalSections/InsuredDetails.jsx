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
import { useFrontendBoot, useTheme } from "../../../customHooks";

const InsuredDetails = ({ schema, setActive, name, defaultValue, setBack }) => {
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
    setShow,
  );

  console.log("sfgblnfxbjk", values);

  const { colors } = useTheme();

  const PrimaryColor = colors.primary_color;
  const [yesSelected, setYesSelected] = useState({});
  const [noForAll, setNoForAll] = useState({});
  const [initColor, setInitColor] = useState(PrimaryColor);
  const [canProceed, setCanProceed] = useState({
    canProceed: false,
    canProceedArray: [],
  });
  const { proposalData } = useSelector(state => state.proposalPage);
  console.log("vfjgjdfgh", proposalData);

  const [mutateValues, setMutateValues] = useState();
  const dispatch = useDispatch();
  const { noForAllChecked } = useSelector(state => state.proposalPage);

  const { insuredMembers: membersDataFromGreetingPage, groups } =
    useFrontendBoot();
  const fullName = proposalData["Proposer Details"]?.name;

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
      Object.keys(values || {}).forEach(element => {
        noForAll2[element] = noForAll[element] || false;
      });

      setNoForAll({ ...noForAll2 });
    } else {
      let isNotChecked = {};
      let hasYes = {};
      let checkCanProceed = [];
      key2.forEach(item => {
        if (noForAll[item] !== true) {
          isNotChecked[item] = false;
        } else {
          isNotChecked[item] = true;
        }
        const temp =
          values?.[item] &&
          Object.keys(values?.[item] || {})?.some(
            data => values?.[item]?.[data]?.[`is${data}`] === "Y",
          );
        if (temp === true) {
          hasYes[item] = true;
        } else {
          hasYes[item] = false;
        }
      });

      key.forEach(item => {
        if (hasYes[item] === isNotChecked[item]) {
          checkCanProceed.push(item);
        }
        console.log("sbjslkh", values[item]);
        if (
          Object.keys(values[item]).length &&
          !Object.keys(values[item]).every(el =>
            values[item][el] ? values[item][el].isValid : true,
          )
        ) {
          checkCanProceed.push(item);
        }
      });
      if (key2.length < 1) {
        isNotChecked = true;
      }

      if (checkCanProceed.length < 1) {
        setCanProceed({ canProceed: true, canProceedArray: [] });
      } else {
        setCanProceed({
          canProceed: false,
          canProceedArray: [...checkCanProceed],
        });
      }
    }
  };
  console.log("sfgbnfjb", canProceed);
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

              estimatedMemberDOB = `${current.getDate()}-${
                current.getMonth() + 1
              }-${current.getUTCFullYear()}`;
            } else {
              estimatedMemberDOB = `${currentDate}-${currentMonth + 1}-${
                currentYear - parseInt(memberAge)
              }`;
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
    } else if (
      name === "Medical Details"
      // &&
      // !Object.keys(values ? values : {}).length
    ) {
      console.log("bfvefd", values);

      // let initial = {};
      // Object.keys(schema).forEach(item =>
      //   schema[item].forEach(innerItem => {
      //     if (innerItem.name && !values[item][innerItem.name])
      //       initial = {
      //         ...values,
      //         [item]: {
      //           ...(initial[item] ? initial[item] : {}),
      //           [innerItem.name]: {
      //             [`is${innerItem.name}`]:"N",
      //             members: {},
      //             isValid:true,
      //           },
      //         },
      //       };
      //   }),
      // );
      // console.log("sfbkfvn",initial)
      // setValues(initial);
    }
  }, []);

  useEffect(() => {
    if (name === "Medical Details") {
      checkCanProceed();
      const keys = Object.keys(values || {});

      let temp = keys.reduce(
        (acc, key) => ({
          ...acc,
          [key]: Object.keys(values[key]).some(
            el => values[key][el][`is${el}`] === "Y",
          ),
        }),
        {},
      );
      setYesSelected(temp)
      console.log("skbjvkvb", temp, values, keys);
    }
  }, [values, noForAll]);

  useEffect(() => {
    if (name === "Medical Details") {
      const key = Object.keys(values || {});
      let tempObj = JSON.parse(JSON.stringify(values || {}));
      key.forEach(keyValue => {
        schema?.[keyValue]?.forEach(element => {
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
          Object.keys(values[item]).forEach(key => {
            if (key === "dob" && values[item][key]) {
              let updatedKey = values[item][key].split("-");
              const date = updatedKey[0];
              const month = updatedKey[1];
              const year = updatedKey[2];
              updatedKey = `${formatter(date)}-${formatter(month)}-${year}`;
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
                          if (noForAllChecked) {
                            dispatch(noForAllCheckedFalse());
                          } else {
                            dispatch(noForAllCheckedTrue());
                          }
                        }}
                      ></Checkbox2>{" "}
                    </div>
                    <span>No For All Questions </span>{" "}
                  </div>
                  {console.log("dbfjkv",noForAll,yesSelected)}
                  {(!noForAll[item] && !yesSelected[item]) && (
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
