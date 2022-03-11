import React, { useEffect, useState } from "react";
import {
  checkAllow,
  fetchMembers,
  fillingUtility,
  generateRange,
  renderField,
} from "./formUtils";
import styled from "styled-components";
import axios from "axios";
import useFormBuilder from "./useFormBuilder";
import { useDispatch, useSelector } from "react-redux";
import { callApi } from "./FormBuilder.slice";
import { render } from "@testing-library/react";
import "styled-components/macro";

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
  setNoForAllEmpty,
  keyStr,
  lastName,
  isInsuredDetails,
  proposalData,
}) => {
  const insuredDetails = useSelector(
    ({ proposalPage }) => proposalPage.proposalData["Insured Details"],
  );
  // if nominee relation selected as "self"
  let proposalDetails = useSelector(
    ({ proposalPage }) => proposalPage.proposalData["Proposer Details"],
  );
  let memberGroupsAsPerMembers = useSelector(({ greetingPage }) =>
    greetingPage.proposerDetails.groups.reduce(
      (acc, { id, members }) => ({
        ...acc,
        [members.reduce((acc, el) => acc + el, "")]: id,
      }),
      {},
    ),
  );

  const {
    updateValue,
    values,
    triggerValidation,
    errors,
    isValid,
    setValues,
    insertValue,
    setErrors,
    updateValues,
  } = useFormBuilder(
    schema,
    fetchValues,
    options.defaultValues,
    noForAll,
    setNoForAll,
    formName,
    insuredDetails,
  );

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



  // for auto populate self data when nominee relation is self
  useEffect(() => {
    if (values.nominee_relation && insuredDetails[values.nominee_relation]) {
      let dataForAutopopulate;
      if (values.nominee_relation === "self") {
        dataForAutopopulate = {
          ...proposalDetails,
          ...(insuredDetails ? insuredDetails["self"] : {}),
        };
      } else if (insuredDetails[values.nominee_relation]) {
        dataForAutopopulate = insuredDetails[values.nominee_relation];
        let groupIdOfmember =
          memberGroupsAsPerMembers[
            Object.keys(memberGroupsAsPerMembers).find(key =>
              key.includes(values.nominee_relation),
            )
          ];
        let memberDetailsInProposerD = Object.keys(proposalDetails)
          .filter(key => key.includes(groupIdOfmember))
          .reduce((acc, key) => ({ ...acc, [key]: proposalDetails[key] }), {});

        dataForAutopopulate = {
          ...memberDetailsInProposerD,
          ...insuredDetails[values.nominee_relation],
        };

        console.log("bndglbd", values.nominee_relation, dataForAutopopulate);
      }

      let acc = {};
      schema.forEach(({ name }) => {
        let nameWithoutNominee = name.slice(name.indexOf("_") + 1, name.length);
        if (nameWithoutNominee === "contact") nameWithoutNominee = "mobile";
        if (nameWithoutNominee.includes("address"))
          console.log(
            "snfklnfk",
            nameWithoutNominee,
            name,
            dataForAutopopulate,
            memberGroupsAsPerMembers,
          );
        nameWithoutNominee = Object.keys(dataForAutopopulate).find(key =>
          key.includes(nameWithoutNominee),
        );
        if (name.includes("pincode"))
          nameWithoutNominee = Object.keys(dataForAutopopulate).find(key =>
            key.includes("pincode"),
          );
        if (dataForAutopopulate[nameWithoutNominee])
          acc[name] = dataForAutopopulate[nameWithoutNominee];
      });

      console.table("ejrgvbjhsb", schema, dataForAutopopulate, acc);
      setValues(acc);
    }
  }, [values.nominee_relation]);



  useEffect(() => {
    if (trigger) {
      console.log("erngfn", trigger);
      triggerValidation(trigger);
      setTrigger(false);
    }
  }, [trigger, triggerValidation]);
  useEffect(() => {
    fetchValid(isValid);
  }, [isValid]);

  useEffect(() => {
    if (submitTrigger) {
      triggerValidation();
      setSubmit("SUBMIT");
    }
  }, [submitTrigger]);
  useEffect(() => {
    if (noForAll) {
      setValues("");
    }
  }, [noForAll]);

  const [fillBus, setFillBus] = useState([]);
  const { asyncOptions, asyncValues } = useSelector(state => state.formBuilder);

  const dispatch = useDispatch();
  useEffect(() => {
    const tempValues = { ...values };
    schema.forEach(item => {
      if (
        item.type === "select" &&
        !values[item.name] &&
        item?.validate?.required &&
        !item.fill &&
        !item?.additionalOptions?.options?.length &&
        Object.keys(item.additionalOptions.options || {}).length === 1
      ) {
        const tempValue = Object.keys(item.additionalOptions.options)[0];

        tempValues[item.name] = tempValue;
      }
    });
    updateValues(tempValues);
  }, [schema, errors]);
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
    setValues({ ...values, ...asyncValues });
  }, [asyncValues]);

  return (
    <>
      {schema instanceof Array &&
        schema.map((item, index) => {
          if (item instanceof Array) {
            return (
              <>
                {item[0]?.additionalOptions?.members?.map(member => {
                  if (
                    values[item[0]?.parent] &&
                    values[item[0]?.parent]?.members &&
                    values[item[0]?.parent]?.members instanceof Object &&
                    values[item[0]?.parent]?.members?.[member] &&
                    (item[0].render.when.includes("||")
                      ? renderField(item[0], values, member)
                      : true)
                  )
                    return (
                      <CustomWrapper>
                        <div className="col-md-12">
                          <Title>
                            {member}
                            {/* proposalData["Insured Details"]?.[
                                member
                              ]?.name?.split(" ")[0] */}
                          </Title>
                          {item.map(innerItem => {
                            const Comp = components[innerItem.type];

                            if (!Comp) {
                              alert("Type :" + innerItem.type + "Not found");
                              return <></>;
                            } else
                              return (
                                renderField(innerItem, values, member) && (
                                  <Wrapper
                                    key={index + member + innerItem.name}
                                    width={innerItem.width}
                                    medical
                                  >
                                    <Comp
                                      name={innerItem.name}
                                      checkValidation={innerItem.validate}
                                      innerMember={member}
                                      onChange={(e, value) => {
                                        console.log(
                                          "qdjbjics",
                                          innerItem,
                                          innerItem.parent,
                                          innerItem.type,
                                        );
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
                                          } else updateValue(innerItem.name, e);
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
                                      onBlur={e => {
                                        if (options.validateOn === "blur") {
                                          setTrigger(innerItem.name);
                                        }
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
                                            ? values[innerItem.parent][member][
                                                innerItem.name
                                              ]
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
                                    />
                                  </Wrapper>
                                )
                              );
                          })}
                        </div>
                        {/* {
                          schema[index-1].additionalOptions.showMembersIf &&
                          schema[index-1].additionalOptions.showMembersIf.split("||").some(key => values[key][`is${key}`]) &&
                          values[schema[index-1].name].members[member] &&
                          !values[schema[index-1].name][member] ||
                          (!Object.keys(values[schema[index-1].name][member]).length ||
                          !Object.keys(values[schema[index-1].name][member]).some(key => values[schema[index-1].name][member][key] === "Y")) 
                        ?(<p className="formbuilder__error">Select atleast one!</p>):(<></>)
                        } */}

                        {/* .some(key => Object.keys(values[schema[index-1].name][key]).some(key2 => values[schema[index-1].name][key][key2] === "Y")) */}
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
              alert("Type :" + item.type + "Not found");
              return <></>;
            } else
              return (
                <>
                  {renderField(item, values) && (
                    <Wrapper key={index} width={item.width}>
                      <Comp
                        name={item.name}
                        checkValidation={item.validate}
                        selectedValues={values}
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
                              console.log(
                                "sdvnsjdbvs",
                                item.name,
                                e.target.value,
                              );
                              updateValue(item.name, e.target.value);
                            } else {
                              // if()
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
                        readOnly={
                          item.readOnly
                          //  ||(isInsuredDetails && item.name === "mobile")
                        }
                        allValues={proposalData}
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
                  {item.type === "custom_toggle" &&
                    renderField(item, values) && <HR />}
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
  margin-bottom: 10px;
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
  margin-bottom: 59px;
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
  margin-bottom: 12px;
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
