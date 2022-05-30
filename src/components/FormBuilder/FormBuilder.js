import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import "styled-components/macro";
import { useTheme } from "../../customHooks";
import { callApi } from "./FormBuilder.slice";
import {
  checkAllow,
  fetchMembers,
  generateRange,
  renderField,
  ValueExtractor,
} from "./formUtils";
import useFormBuilder from "./useFormBuilder";

const FormBuilder = ({
  components = {},
  schema = [],
  formName,
  fetchValues = () => {},
  fetchValid = () => {},
  submitTrigger = false,
  setSubmit = () => {},
  additionalErrors = {},
  options = {
    validateOn: "change",
    defaultValues: {},
  },
  setCustomValid = () => {},
  noForAll,
  setNoForAll,
  keyStr,
  lastName,
  proposalData,
  canProceed,
  yesSelected,
  setErrorInField,
  fetchErrors,
  setNomineeRelationAutopopulated,
  nomineeRelationAutopopulated,
  autoPopulateSelfOtherDetails,
  preFilledDataBase,
  isPanelVisible,
}) => {
  const { colors } = useTheme();
  const PrimaryShade = colors.primary_shade;

  const insuredDetails = useSelector(
    ({ proposalPage }) => proposalPage.proposalData["Insured Details"],
  );

  const proposalDetails = useSelector(
    ({ proposalPage }) => proposalPage.proposalData["Proposer Details"],
  );

  const otherDetails = useSelector(
    ({ proposalPage }) => proposalPage.proposalData["Other Details"],
  );

  const {
    updateValue,
    values,
    triggerValidation,
    errors,
    setValues,
    insertValue,
    updateValues,
    checkReadOnly,
    updateValidateObjSchema,
    setBlockScrollEffect,
    scrollToErrors,
  } = useFormBuilder({
    schema,
    fetchValues,
    defaultValues: options.defaultValues,
    noForAll,
    setNoForAll,
    formName,
    insuredDetails,
    canProceed,
    yesSelected,
    proposalDetails,
    setErrorInField,
    fetchErrors,
    fetchValid,
    isPanelVisible,
    keyStr,
    otherDetails,
  });

  useEffect(() => {
    if (formName === "Other Details") {
      if (values.nominee_relation && insuredDetails[values?.nominee_relation]) {
        autoPopulateSelfOtherDetails({
          updateValues,
          selectedNomineeRelation: values?.nominee_relation,
        });
        // triggerValidation();
      } else if (
        preFilledDataBase &&
        Object.keys(preFilledDataBase).length &&
        preFilledDataBase?.nominee_relation &&
        preFilledDataBase?.nominee_relation === values?.nominee_relation
      ) {
        updateValues(preFilledDataBase, "SAVE_AS_IT_IS");
      } else
        updateValues(
          { nominee_relation: values.nominee_relation },
          "SAVE_AS_IT_IS",
        );
    }
  }, [values?.nominee_relation]);

  const [trigger, setTrigger] = useState(false);

  const relationships = [
    "spouse",
    "son",
    "son1",
    "son2",
    "son3",
    "son4",
    "daughter",
    "daughter1",
    "daughter2",
    "daughter3",
    "daughter4",
    "father",
    "mother",
    "grand_father",
    "grand_mother",
  ];

  useEffect(() => {
    if (trigger) {
      triggerValidation(trigger);
      setTrigger(false);
    }
  }, [trigger, triggerValidation]);

  useEffect(() => {
    if (submitTrigger) {
      triggerValidation && triggerValidation();
      scrollToErrors && scrollToErrors();
      setSubmit && setSubmit("SUBMIT");
    }
  }, [submitTrigger]);

  const [fillBus, setFillBus] = useState([]);
  const { asyncOptions, asyncValues } = useSelector(state => state.formBuilder);

  const dispatch = useDispatch();

  useEffect(() => {
    let temp = {};
    if (schema instanceof Array)
      schema.forEach(item => {
        if (item.fill) temp = Object.assign(temp, { [item.name]: item.fill });
      });
    setFillBus(temp);
  }, [schema]);

  useEffect(() => {
    let pincodeSchema = schema.filter(item =>
      item?.name?.includes("pincode"),
    )[0];

    if (pincodeSchema && pincodeSchema?.value && pincodeSchema.fill) {
      dispatch(
        callApi(pincodeSchema.fill?.using, {
          [pincodeSchema.name]: pincodeSchema.value,
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (formName !== "Medical Details") {
      setValues(prev => ({ ...prev, ...asyncValues }));
    }
  }, [asyncValues]);

  const additionaMQVisibility = useCallback(
    (item, member) => {
      const { additionalOptions } = item;
      if (additionalOptions?.showMembersIf) {
        const dependentMqNames = additionalOptions.showMembersIf.split("||");
        return dependentMqNames.some(mqName => values[mqName]?.members[member]);
      } else {
        return (
          (values[item?.parent] &&
            values[item?.parent]?.members &&
            values[item?.parent]?.members instanceof Object &&
            values[item?.parent]?.members?.[member]) ||
          item.render === "noDependency"
        );
      }
    },
    [values],
  );

  return (
    <>
      {schema instanceof Array &&
        schema.map((item, index) => {
          if (item instanceof Array) {
            return (
              <>
                {item[0]?.additionalOptions?.members?.map(member => {
                  if (additionaMQVisibility(item[0], member))
                    return (
                      <CustomWrapper>
                        <div className="col-md-12">
                          <Title
                            style={{
                              backgroundImage: `linear-gradient(to right, ${PrimaryShade}, white)`,
                            }}
                          >
                            {member}
                          </Title>
                          <div
                            css={`
                              display: flex;
                              flex-wrap: wrap;
                            `}
                          >
                            {item.map(innerItem => {
                              const Comp = components[innerItem.type];
                              if (!Comp) {
                                // alert("Type :" + innerItem.type + "Not found");
                                return <></>;
                              } else
                                return (
                                  renderField(innerItem, values, member) && (
                                    <Wrapper
                                      key={index + member + innerItem.name}
                                      width={innerItem.width}
                                      id={
                                        innerItem.parent +
                                        member +
                                        innerItem.name
                                      }
                                      medical
                                    >
                                      <Comp
                                        name={innerItem.name}
                                        checkValidation={innerItem.validate}
                                        innerMember={member}
                                        onChange={(e, value) => {
                                          if (
                                            innerItem.parent &&
                                            innerItem.type === "checkboxGroup"
                                          ) {
                                            insertValue(
                                              innerItem.parent,
                                              member,
                                              innerItem.name,
                                              value,
                                            );
                                          } else if (
                                            innerItem.parent &&
                                            innerItem.type === "checkBox2"
                                          ) {
                                            insertValue(
                                              innerItem.parent,
                                              member,
                                              innerItem.name,
                                              e.target.checked ? "Y" : "N",
                                            );
                                          } else if (innerItem.parent) {
                                            insertValue(
                                              innerItem.parent,
                                              member,
                                              innerItem.name,
                                              e.target.value,
                                            );
                                          } else {
                                            if (
                                              !innerItem.type.includes("custom")
                                            ) {
                                              updateValue(
                                                innerItem.name,
                                                e.target.value,
                                              );
                                            } else
                                              e.target.value &&
                                                updateValue(
                                                  innerItem.name,
                                                  e.target.value,
                                                );
                                          }
                                          if (
                                            innerItem.fill &&
                                            (e.target.value.length === 6 ||
                                              innerItem.type === "select")
                                          ) {
                                            dispatch(
                                              callApi(
                                                fillBus[innerItem.name].using,
                                                {
                                                  [innerItem.name]:
                                                    e.target.value,
                                                  [fillBus[innerItem.name]
                                                    .alsoUse]:
                                                    values[
                                                      fillBus[innerItem.name]
                                                        .alsoUse
                                                    ],
                                                },
                                              ),
                                              fillBus[innerItem.name],
                                            );
                                          }
                                          if (options.validateOn === "change") {
                                            setTrigger({
                                              variableName: innerItem.name,
                                              parent: innerItem.parent,
                                              member,
                                            });
                                          }
                                          if (innerItem.allow) {
                                            checkAllow(
                                              innerItem.allow,
                                              e,
                                              "change",
                                            );
                                          }
                                        }}
                                        readOnly={innerItem.readOnly}
                                        onInput={e => {
                                          if (innerItem.allow) {
                                            checkAllow(
                                              innerItem.allow,
                                              e,
                                              "input",
                                            );
                                          }
                                        }}
                                        onFocus={() =>
                                          setBlockScrollEffect(false)
                                        }
                                        onBlur={e => {
                                          if (options.validateOn === "blur") {
                                            setTrigger(innerItem.name);
                                          }
                                          setBlockScrollEffect(true);
                                        }}
                                        onKeyDown={e => {
                                          if (innerItem.allow) {
                                            checkAllow(
                                              innerItem.allow,
                                              e,
                                              "down",
                                            );
                                          }
                                        }}
                                        onKeyPress={e => {
                                          if (innerItem.allow) {
                                            checkAllow(
                                              innerItem.allow,
                                              e,
                                              "press",
                                            );
                                          }
                                        }}
                                        options={
                                          innerItem.additionalOptions &&
                                          innerItem.additionalOptions
                                            .customOptions &&
                                          generateRange(
                                            innerItem.additionalOptions
                                              .customOptions,
                                            values,
                                          )
                                        }
                                        asyncOptions={
                                          asyncOptions[innerItem.name]
                                        }
                                        allValues={proposalData}
                                        value={
                                          values[innerItem.parent]
                                            ? values[innerItem.parent][member]
                                              ? values[innerItem.parent][
                                                  member
                                                ][innerItem.name]
                                              : ""
                                            : "" || innerItem.value
                                        }
                                        error={
                                          errors[
                                            innerItem.parent +
                                              member +
                                              innerItem.name
                                          ]
                                        }
                                        submitTrigger={submitTrigger}
                                        setCustomValid={setCustomValid}
                                        values={values}
                                        item={innerItem}
                                        {...innerItem.additionalOptions}
                                        label={ValueExtractor(
                                          innerItem?.additionalOptions?.label,
                                          values,
                                          member,
                                        )}
                                        notAllowed={ValueExtractor(
                                          innerItem?.additionalOptions
                                            ?.notAllowed,
                                          values,
                                          member,
                                        )}
                                      />
                                    </Wrapper>
                                  )
                                );
                            })}
                          </div>
                        </div>
                      </CustomWrapper>
                    );
                })}
                {renderField(schema[index - 1], values) && <HR></HR>}
              </>
            );
          } else {
            const Comp = components[item.type];
            const initialValue = relationships.includes(`${keyStr}`)
              ? lastName
              : null;
            if (
              !renderField(item, values) &&
              item.render &&
              item.render.when.includes(".") &&
              values[item.name] &&
              values[item.name][`is${item.name}`] === "Y"
            ) {
              setValues(prev => {
                return { ...prev, [item.name]: "" };
              });
            } else if (
              item.render &&
              item.render.when.includes(".") &&
              values[item.name] &&
              values[item.name][`is${item.name}`] === "Y" &&
              !fetchMembers(item.render.when, values).length &&
              !(
                "showMembers" in
                schema.find(_i => _i.name === item.render.when.split(".")[0])
                  .additionalOptions
              )
            ) {
              setValues(prev => {
                return { ...prev, [item.name]: "" };
              });
            }
            if (!Comp) {
              // alert("Type :" + item.type + "Not found");
              return <></>;
            }
            return (
              <>
                {renderField(
                  item,
                  values,
                  undefined,
                  show =>
                    !show &&
                    Boolean(values[item.name]) &&
                    updateValues(
                      Object.keys(values)
                        .filter(key => key !== item.name)
                        .reduce(
                          (acc, key) => ({ ...acc, [key]: values[key] }),
                          {},
                        ),
                      "SAVE_AS_IT_IS",
                    ),
                ) && (
                  <Wrapper
                    key={index + item.name}
                    id={item.name + keyStr}
                    width={item.width}
                  >
                    <Comp
                      name={item.name}
                      checkValidation={updateValidateObjSchema(item)}
                      selectedValues={values}
                      data={item.data}
                      onChange={(e, value) => {
                        if (item.parent && item.members) {
                          insertValue(
                            item.parent,
                            item.members,
                            item.name,
                            e.target.value,
                          );
                        } else {
                          if (item.name === "town" || item.name === "area") {
                            updateValues({
                              [item.name]: e.target.value,
                              [item.name + "__value"]: value,
                            });
                          } else if (!item.type.includes("custom")) {
                            if (
                              item.name === "nominee_relation" &&
                              !insuredDetails[e.target.value] &&
                              nomineeRelationAutopopulated
                            ) {
                              updateValue(item.name, e.target.value, true);
                              setNomineeRelationAutopopulated(false);
                            } else updateValue(item.name, e.target.value);
                          } else {
                            updateValue(item.name, e);
                          }
                        }
                        if (
                          item.fill &&
                          (e.target.value.length === 6 ||
                            item.type === "select")
                        ) {
                          dispatch(
                            callApi(fillBus[item.name].using, {
                              [item.name]: e.target.value,
                              [fillBus[item.name].alsoUse]:
                                values[fillBus[item.name].alsoUse],
                            }),
                            fillBus[item.name],
                          );
                        }
                        if (options.validateOn === "change") {
                          setTrigger(item.name);
                        }
                        if (item.allow) {
                          checkAllow(item.allow, e, "change");
                        }
                      }}
                      age={item?.validate?.age}
                      directUpdateValue={(name, value) => {
                        updateValue(name, value, false, () => {
                          setTrigger(name);
                        });
                      }}
                      fill={item.fill}
                      deleteValue={() => {
                        updateValues(
                          Object.keys(values)
                            .filter(key => key !== item.name)
                            .reduce(
                              (acc, key) => ({ ...acc, [key]: values[key] }),
                              {},
                            ),
                          "SAVE_AS_IT_IS",
                        );
                      }}
                      additionalQuestionsToggle={
                        formName === "Medical Details" &&
                        Array.isArray(schema[index + 1])
                          ? schema[index + 1]
                          : []
                      }
                      readOnly={
                        item.readOnly || checkReadOnly(item.name, formName)
                      }
                      allValues={proposalData}
                      onFocus={() => setBlockScrollEffect(false)}
                      customMembers={
                        item.render &&
                        item.render.when.includes(".") &&
                        !(
                          "showMembers" in
                          schema.find(
                            _i => _i.name === item.render.when.split(".")[0],
                          ).additionalOptions
                        ) &&
                        fetchMembers(item.render.when, values)
                      }
                      onInput={e => {
                        if (item.allow) {
                          checkAllow(item.allow, e, "input");
                        }
                      }}
                      onBlur={e => {
                        if (options.validateOn === "blur") {
                          setTrigger(item.name);
                        }
                        setBlockScrollEffect(true);
                      }}
                      onKeyDown={e => {
                        if (item.allow) {
                          checkAllow(item.allow, e, "down");
                        }
                      }}
                      onKeyPress={e => {
                        if (item.allow) {
                          checkAllow(item.allow, e, "press");
                        }
                      }}
                      triggerValidation={triggerValidation}
                      options={
                        item.additionalOptions &&
                        item.additionalOptions.customOptions &&
                        generateRange(item.additionalOptions.customOptions)
                      }
                      asyncOptions={asyncOptions[item.name]}
                      defaultValue={
                        item.type === "text" && item.name === "name"
                          ? values[item.name] || initialValue || item.value
                          : values[item.name] || item.value
                      }
                      value={values[item.name] || item.value}
                      error={errors[item.name] || additionalErrors[item.name]}
                      submitTrigger={submitTrigger}
                      setCustomValid={setCustomValid}
                      values={values}
                      // showMembersIf={item.additionalOptions.showMembersIf || ""}
                      {...item.additionalOptions}
                    />
                  </Wrapper>
                )}
                {item.type === "custom_toggle" && renderField(item, values) && (
                  <HR />
                )}
              </>
            );
          }
        })}
    </>
  );
};
export default FormBuilder;
const HR = styled.hr`
  border-top: 0;
  border-bottom: 1px dashed #ddd;
  width: 100%;

  margin-top: 0px;
  @media (max-width: 767px) {
    margin-left: 0px;
  }
`;
const Wrapper = styled.div`
  width: ${props => (props.width ? props.width : "25%")};
  display: inline-block;
  padding-left: ${props => (props.medical ? "0px" : "15px")};
  padding-right: 15px;
  margin-bottom: ${props => props.mb || "7px"};
  @media (max-width: 1023px) {
    width: 100%;
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const CustomWrapper = styled.div`
  box-shadow: #e2e3ed 0px 6px 12px !important;
  margin-left: 30px;
  padding: 16px 6px 0px;
  border-radius: 6px;
  margin-top: 0px;
  width: 100%;
  margin-bottom: 18px;
  @media (max-width: 767px) {
    width: calc(100% - 17px);
    margin-left: 8px;

    box-shadow: unset !important;
    & input,
    & select {
      background-color: #fff;
    }
  }
`;
const Title = styled.p`
  margin-bottom: 6px;
  font-size: 17px !important;
  color: #3b3838;
  font-weight: 900 !important;
  margin-top: -3px;
  /* background-image: , #ffe7e7 5?%, #fff 15%); */
  padding: 10px 18px;
  border-radius: 6px;

  height: 40px;
  padding: 12px;
  text-transform: capitalize;
  text-align: justify;
  line-height: 18px;
  color: #000000;

  @media (max-width: 767px) {
    &:after {
      content: "";
      height: 22px;
      width: 6px;
      position: absolute;
      left: -6px;
      top: 2px;
      background-color: #fecc28;
      border-radius: 50px;
    }
    height: 20px;

    font-size: 16px !important;
    padding: 4px 0 0;
    background-image: unset;
  }
`;
