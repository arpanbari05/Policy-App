import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';

const useOtherDetails = ({defaultValue,setValues,name,values,insuredDetails,proposalDetails,schema}) => {
    console.log("dbfkbjhfjh",defaultValue)

    const [nomineeRelationAutopopulated, setNomineeRelationAutopopulated] =
    useState(false);

    let memberGroupsAsPerMembers = useSelector(({ greetingPage }) =>
    greetingPage.proposerDetails.groups.reduce(
      (acc, { id, members }) => ({
        ...acc,
        [members.reduce((acc, el) => acc + el, "")]: id,
      }),
      {},
    ),
  );


  useEffect(() => {
      if(name === "Other Details"){
    setValues(prev => ({...defaultValue,...prev}));
      }
  },[])

   // for auto populate self data when nominee relation is self
   const autoPopulateSelfOtherDetails = ({values, key, setValues,schema,selectedNomineeRelation}) => {

        let nomineeRelation = selectedNomineeRelation;
  
        let dataForAutopopulate;
        if (nomineeRelation === "self") {
          dataForAutopopulate = {
            ...proposalDetails,
            ...(insuredDetails ? insuredDetails["self"] : {}),
          };
        } else if (insuredDetails[nomineeRelation]) {
          dataForAutopopulate = insuredDetails[nomineeRelation];
          let groupIdOfmember =
            memberGroupsAsPerMembers[
              Object.keys(memberGroupsAsPerMembers).find(key =>
                key.includes(nomineeRelation),
              )
            ];
          let memberDetailsInProposerD = Object.keys(proposalDetails)
            .filter(key => key.includes(groupIdOfmember))
            .reduce((acc, key) => ({ ...acc, [key]: proposalDetails[key] }), {});
  
          dataForAutopopulate = {
            ...memberDetailsInProposerD,
            ...insuredDetails[nomineeRelation],
          };
        }  


        let acc = {};
        schema.forEach(({ name }) => {
          let nameWithoutNominee = name.slice(name.indexOf("_") + 1, name.length);
          if (nameWithoutNominee === "contact") nameWithoutNominee = "mobile";
          if (nameWithoutNominee.includes("address"))
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
        setValues({ ...acc, nominee_relation: nomineeRelation },"SAVE_AS_IT_IS");
        setNomineeRelationAutopopulated(true);
      
   };


  return {
    nomineeRelationAutopopulated,
    setNomineeRelationAutopopulated,
    autoPopulateSelfOtherDetails
  }
}

export default useOtherDetails