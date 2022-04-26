import React, { useEffect } from "react";

const useInsuredDetails = (
  name,
  schema,
  proposalData,
  values,
  membersDataFromGreetingPage,
  groups,
  setValues,
  defaultValue,
  equriesData
) => {
  console.log("sgsfkvbjkfv",values)
  function formatter(number) {
    if (!isNaN(number)) number = parseInt(number);
    const updatedNumber = number.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    return updatedNumber;
  }

  const getPanelDescContent = item => {
    let result = [];
    if (values && name === "Insured Details") {
      values[item] &&
        Object.keys(values[item]).forEach(key => {
          if (key === "dob" && values[item][key]) {
            let updatedKey = values[item][key].split("-");
            const date = updatedKey[0];
            const month = updatedKey[1];
            const year = updatedKey[2] || values[item][key];
            updatedKey = `${year}`;
            result[1] = updatedKey;
          } else if (key === "name" && values[item][key]) {
            result[0] = `${values[item]["title"]}. ${values[item][key]}`;
          } else if (key !== "title") {
            // result[2] = `${values[item][key]}`;
          }
        });

      result = result.filter(r => r);
    }
    return result.join(", ");
  };

  const findGroupMembersCount = member => {
    groups.forEach(group => {
      return group.members.includes(member.toLowerCase())
        ? group.members.count
        : 0;
    });
  };

  //   --------------------------------------------------------------------------------------------------------------------------------
  // -------------------------------------------   SIDE EFFECTS FOR INSURED DETAILS  ------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------------------------------------

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
            let tempObj = {...defaultValue?.[memberType]};
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
          } else {
            // if (
            //   // for autopopulate Estimated DOB
            //   !proposalData["Insured Details"] ||
            //   !proposalData["Insured Details"][memberType].dob
            // )
             
            let memberAge = membersDataFromGreetingPage.find(
              member => member.type === memberType,
            )?.age;
            console.log("dfbkvd",memberAge)
            let estimatedMemberDOB;
            if (
              `${memberAge}`.includes("Month") ||
              `${memberAge}`.includes(".")
            ) {
            console.log("cghdhdadfd", Number(memberAge));

              let current = new Date();
              // current.setMonth(
              //   current.getMonth() -
              //     (`${memberAge}`.includes(".")
              //       ? parseInt(`${memberAge}`.split(".")[1])
              //       : parseInt(memberAge)) -
              //     1,
              // );

              estimatedMemberDOB = `${current.getUTCFullYear()}`;
            }
             else {
              estimatedMemberDOB = `${currentYear - parseInt(memberAge)}`;
            }
            console.log("fbjklbdxb",estimatedMemberDOB)
            let title = memberType === "spouse" || memberType === "mother" || memberType === "mother_in_law" ? "mrs":""
            prefilledValues[memberType] = {
              ...(values && values.hasOwnProperty(memberType)
                ? values[memberType]
                : {}),
              dob: estimatedMemberDOB,
              title,
              ...defaultValue?.[memberType]
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
        console.log("sbnlfkb", prefilledValues, defaultValue);

        setValues({
          ...prefilledValues,
          //  ...defaultValue,
        });
      }
    }
  }, []);

  return {
    getPanelDescContent,
  };
};

export default useInsuredDetails;
