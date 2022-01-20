import CustomProgressBar from "../../../components/ProgressBar";
import { Title } from "./FormComponents";
import {
  useFrontendBoot,
  useMembers,
  useUpdateEnquiry,
  useUrlEnquiry,
} from "../../../customHooks";
import { useGetEnquiriesQuery } from "../../../api/api";
import {
  MemberOptions,
  useMembersForm,
} from "../../../components/MemberOptions";
import "styled-components/macro";
import { useHistory } from "react-router-dom";
import { InputFormCta } from ".";

function InputMembersForm(props) {
  const { journeyType } = useFrontendBoot();

  const { isLoading } = useGetEnquiriesQuery();

  const { getAllMembers } = useMembers();

  const getInitialMembersList = () => {
    const allMembers = getAllMembers();
    const mainMembers = allMembers.slice(0, allMembers.length - 4);

    return mainMembers;
  };

  const { isError, validate, getSelectedMembers, ...membersForm } =
    useMembersForm(getInitialMembersList);

  const { updateEnquiry, ...updateEnquiryQuery } = useUpdateEnquiry();

  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const history = useHistory();

  const handleSubmit = () => {
    const isValid = validate();
    if (!isValid) return;

    const selectedMembers = getSelectedMembers();

    const sendData = {
      members: selectedMembers.map(member => ({
        age: member.age.code,
        type: member.code,
      })),
    };

    const isSingleMember = selectedMembers.length === 1;

    if (isSingleMember) {
      sendData.plan_type = "I";
    }

    if (journeyType === "top_up" && !isSingleMember) {
      sendData.plan_type = "F";
    }

    updateEnquiry(sendData).then(res => {
      let nextPagePath = "/input/plantype";

      if (journeyType !== "top_up" && !isSingleMember) {
        history.push(getUrlWithEnquirySearch(nextPagePath));
        return;
      }

      const { groups } = res.data.data;
      const firstGroup = Math.min(...groups.map(group => group.id));

      nextPagePath = `/input/location-${firstGroup}`;
      history.push(getUrlWithEnquirySearch(nextPagePath));
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="py-3" {...props}>
      <div className="px-3">
        <Title className="w-100">Who all would you like to insure?</Title>
        <CustomProgressBar now={2} total={4} />
      </div>
      <MemberOptions {...membersForm} />
      <InputFormCta
        backLink={`/input/basic-details`}
        onContinueClick={handleSubmit}
        loader={updateEnquiryQuery.isLoading}
      />
    </div>
  );
}

export default InputMembersForm;

// import { useState, useEffect } from "react";
// import StyledButton from "../../../components/StyledButton";
// import CustomProgressBar from "../../../components/ProgressBar";
// import { Title, ErrorMessage, formButtons } from "./FormComponents";
// import { useSelector, useDispatch } from "react-redux";
// import { AiFillCloseCircle } from "react-icons/ai";
// import { v4 as uuidv4 } from "uuid";
// import { IoAddCircle } from "react-icons/io5";
// import {
//   saveForm3UserDetails,
//   selectMembersWithAge,
// } from "../greetingPage.slice";
// import { dataset, getAge } from "./data";
// import { Modal } from "react-bootstrap";
// import {
//   useFrontendBoot,
//   useMembers,
//   useTheme,
//   useUpdateEnquiry,
//   useUrlEnquiry,
// } from "../../../customHooks";
// import { useGetEnquiriesQuery } from "../../../api/api";
// import {
//   MemberOptions,
//   useMembersForm,
// } from "../../../components/MemberOptions";
// import "styled-components/macro";
// import { Button } from "../../../components";
// import { useHistory } from "react-router-dom";

// const MembersForm1 = ({ handleChange, currentForm }) => {
//   const { error } = useSelector(state => state.greetingPage);

//   const { colors } = useTheme();

//   const {
//     data: { members },
//   } = useFrontendBoot();

//   const [membersArray, setMembersArray] = useState([]);

//   const [childCount, setChildCount] = useState(0);

//   const [ageError, setAgeError] = useState([]);

//   const [showModal, setShowModal] = useState(false);
//   const [errors, setErrors] = useState(false);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (members?.length > 0) {
//       setMembersArray([...members]);
//     }
//   }, [members]);

//   // Will contain list of insurer names that are checked
//   const [insurerCBXArray, setInsurerCBXArray] = useState([]);
//   console.log(insurerCBXArray, "insurerCBXArray");
//   // Will contain list of insurer Dropdown values if checkbox is checked
//   const [insurerDDArray, setInsurerDDArray] = useState([]);

//   useEffect(() => {
//     if (window.matchMedia("(max-width: 767px)")) {
//       if (!insurerCBXArray.includes("daughter")) {
//         const tempArray = insurerCBXArray.filter(
//           element => element.slice(0, 8) !== "daughter",
//         );
//         setInsurerCBXArray(tempArray);
//       }
//       if (!insurerCBXArray.includes("son")) {
//         const tempArray = insurerCBXArray.filter(
//           element => element.slice(0, 3) !== "son",
//         );
//         setInsurerCBXArray(tempArray);
//       }
//     }
//   }, [membersArray]);

//   useEffect(() => {
//     let count = 0;
//     insurerCBXArray.forEach(element => {
//       if (element.slice(0, 8) === "daughter" || element.slice(0, 3) === "son") {
//         count += 1;
//       }
//     });

//     setChildCount(count);
//   }, [insurerCBXArray]);

//   const addChild = name => {
//     const code = name.toLowerCase();
//     if (insurerCBXArray.includes(code)) {
//       if (childCount < 4) {
//         const { max_age, min_age } = membersArray.filter(
//           item => item.code === code,
//         )[0];
//         setChildCount(childCount + 1);
//         const genCode = `${code + uuidv4()}`;
//         const tempArray = [...membersArray];
//         const index = tempArray.findIndex(x => x.display_name === name);
//         tempArray.splice(index + 1, 0, {
//           [`code`]: genCode,
//           [`display_name`]: name,
//           [`min_age`]: `${min_age}`,
//           [`max_age`]: `${max_age}`,
//           ["is_primary"]: true,
//           ["hasClose"]: true,
//         });
//         handleinsurerCBXArray(genCode);

//         setMembersArray(tempArray);
//       }
//     }
//   };

//   const handleinsurerCBXArray = insurer => {
//     const tempArray = [...insurerCBXArray];

//     if (!tempArray.includes(insurer)) {
//       tempArray.push(insurer);
//     } else {
//       const index = tempArray.indexOf(insurer);

//       if (index > -1) {
//         tempArray.splice(index, 1);
//         handleinsurerDDArray(insurer, "Select Age");
//       }
//     }
//     console.log("insurers cbx array", tempArray);
//     setInsurerCBXArray(tempArray);
//   };

//   const handleinsurerDDArray = (insurer, value) => {
//     const tempArray = [...insurerDDArray];
//     var index = tempArray.map(o => o.insurer).indexOf(insurer);
//     if (value !== "Select Age") {
//       if (index > -1) {
//         tempArray[index].value = value;
//         if (!insurerCBXArray.includes(insurer)) {
//           handleinsurerCBXArray(insurer);
//         }
//       } else {
//         tempArray.push({ insurer: `${insurer}`, value: `${value}` });
//         if (!insurerCBXArray.includes(insurer)) {
//           handleinsurerCBXArray(insurer);
//         }
//       }
//     } else if (index > -1) {
//       tempArray.splice(index, 1);
//     }
//     if (tempArray.length > 0) {
//       setErrors(false);
//     } else {
//       setErrors(true);
//     }
//     setInsurerDDArray(tempArray);
//   };

//   const handleInput = (insurer, value, type) => {
//     if (type === "checkbox") {
//       if (
//         (insurer.slice(0, 3) === "son" && insurer !== "son") ||
//         (insurer.slice(0, 8) === "daughter" && insurer !== "daughter")
//       ) {
//         const tempArray = [...membersArray];
//         var index = tempArray.map(o => o.code).indexOf(insurer);
//         if (index > -1) {
//           tempArray.splice(index, 1);
//           setMembersArray(tempArray);
//         }
//       }
//       if (
//         (insurer.slice(0, 3) === "son" || insurer.slice(0, 8) === "daughter") &&
//         insurerCBXArray.includes(insurer)
//       ) {
//         if (insurer === "son") {
//           const tempArray = membersArray.filter(element => {
//             return (
//               element.display_name !== "Son" ||
//               (element.display_name === "Son" && element.code === "son")
//             );
//           });
//           setMembersArray(tempArray);
//         } else if (insurer === "daughter") {
//           const tempArray = membersArray.filter(
//             element =>
//               element.display_name !== "Daughter" ||
//               (element.display_name === "Daughter" &&
//                 element.code === "daughter"),
//           );
//           setMembersArray(tempArray);
//         }
//       }
//       handleinsurerCBXArray(insurer, value);
//     } else if (type === "dropdown") {
//       handleinsurerDDArray(insurer, value);
//     }
//   };
//   const handleSubmit = e => {
//     e.preventDefault();
//     const ageErrorArray = [];
//     insurerCBXArray.forEach(data => {
//       const hasAge = insurerDDArray.some(item => item.insurer === data);
//       if (!hasAge) {
//         ageErrorArray.push(data);
//       }
//     });

//     if (insurerCBXArray.length < 1) {
//       setErrors("Select at least one Insured");
//     } else if (insurerDDArray.length < 1 || ageErrorArray.length > 0) {
//       setErrors("Select age for Insured");
//       setAgeError(ageErrorArray);
//     } else {
//       setErrors(false);
//     }
//     if (ageErrorArray.length < 1 && !errors && insurerDDArray.length > 0) {
//       const dataArray = [];
//       insurerDDArray.forEach(data => {
//         const i = membersArray.findIndex(x => x.code === data.insurer);
//         if (membersArray[i]?.is_primary) {
//           dataArray.push({
//             type: `${membersArray[i].code}`,
//             age: data.value.endsWith("months")
//               ? `0.${data.value.split(" ")[0]}`
//               : `${data.value.split(" ")[0]}`,
//           });
//         }
//       });

//       dispatch(saveForm3UserDetails(dataArray, handleChange));
//     }
//   };

//   return (
//     <div
//       css={`
//         display: ${currentForm !== 2 && "none"};
//       `}
//     >
//       <div
//         css={`
//           padding: 17px;
//         `}
//       >
//         <Title>Who all would you like to insure?</Title>
//         <CustomProgressBar now={currentForm} total={5} />
//         {membersArray &&
//           membersArray.map(
//             ({
//               display_name,
//               min_age,
//               max_age,
//               is_primary,
//               is_primary_modal,
//               hasClose,
//               code,
//             }) => {
//               const age = getAge(min_age, max_age);

//               return (
//                 (is_primary || is_primary_modal) && (
//                   <div
//                     css={`
//                       display: flex;
//                       align-items: center;
//                       padding: 2px 10px;
//                       border: solid 1px #b0bed0;
//                       margin-bottom: 10px;
//                       border-radius: 7px;

//                       @media (max-width: 480px) {
//                         padding: 2px 5px !important;
//                         // border: none;
//                         margin: 10px -16px;
//                       }
//                     `}
//                   >
//                     {dataset(
//                       display_name,
//                       age,
//                       insurerCBXArray,
//                       insurerDDArray,
//                       handleInput,
//                       hasClose,
//                       code,
//                       ageError,
//                       childCount,
//                       addChild,
//                       //checked
//                     )}
//                   </div>
//                 )
//               );
//             },
//           )}
//         {errors && <ErrorMessage>{errors}</ErrorMessage>}

//         {!errors &&
//           error &&
//           error.map(msg => <ErrorMessage>{msg}</ErrorMessage>)}

//         <StyledButton
//           onClick={() => {
//             setShowModal(true);
//           }}
//           styledCss={`
//             background-color:${colors.primary_shade};
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             color: black;
//             height: 43px;
//             margin-bottom: 10px;
//             margin-top: unset;
//             & span {
//               position: relative;
//               top: -3px;
//               left: -3px;
//               font-size: 25px;
//               color:${colors.primary_color};
//             }
//           `}
//           noIcon
//         >
//           <span>
//             <IoAddCircle />
//           </span>
//           Other Members
//           {showModal && <AllMembersModal />}
//         </StyledButton>

//         {formButtons(() => {
//           handleChange(currentForm - 1);
//         }, handleSubmit)}
//       </div>
//     </div>
//   );
// };

// function AllMembersModal({ onClose, ...props }) {
//   const handleClose = () => {
//     onClose && onClose();
//   };
//   return (
//     <Modal
//       css={`
//         .modal-dialog {
//           position: absolute;
//           right: 0;
//           top: 0;
//           bottom: 0;
//           margin: 0;
//           width: 502px;
//         }
//         .modal-content {
//           border-radius: 0;
//           min-height: 100%;
//           padding: 20px;
//         }

//         @media screen and (min-width: 395px) and (max-width: 501px) {
//           .modal-dialog {
//             width: 100%;
//           }
//         }
//         @media screen and (max-width: 395px) {
//           .modal-dialog {
//             width: 100%;
//           }
//         }
//       `}
//       show
//       {...props}
//     >
//       <Modal.Header
//         css={`
//           padding: 0rem 1rem;
//           @media screen and (max-width: 395px) {
//             & > h3 {
//               font-size: 20px;
//             }
//           }
//         `}
//       >
//         <Title>All your family members</Title>{" "}
//         <div
//           css={`
//             position: relative;
//           `}
//         ></div>
//         <button
//           onClick={handleClose}
//           css={`
//             position: relative;
//             color: #ebf5ff;
//             font-size: 32px;
//             font-size: 31px;
//             top: -11px;
//           `}
//         >
//           <AiFillCloseCircle color="#eaeef2" />
//         </button>
//       </Modal.Header>

//       <div
//         css={`
//           margin-top: 10px;
//         `}
//       >
//         {/* {membersArray &&
//           membersArray.map(
//             ({
//               display_name,
//               min_age,
//               max_age,
//               is_primary,
//               is_primary_modal,
//               hasClose,
//               code,
//             }) => {
//               const age = getAge(min_age, max_age);
//               //let checked = insurerCBXArray.includes(code);
//               return (
//                 <div
//                   css={`
//               display: flex;
//               align-items: center;
//               padding: 2px 10px;
//               border: solid 1px #b0bed0;
//               margin-bottom: 10px;
//               border-radius: 7px;

//               @media (max-width: 480px) {
//                 padding: 2px 3px !important;
//                 // border: none;
//                 margin: 10px -16px;
//               `}
//                 >
//                   {dataset(
//                     display_name,
//                     age,
//                     insurerCBXArray,
//                     insurerDDArray,
//                     handleInput,
//                     hasClose,
//                     code,
//                     ageError,
//                     childCount,
//                     addChild
//                     //checked
//                   )}
//                 </div>
//               );
//             }
//           )} */}
//       </div>
//       {/* <StyledButton
//         noIcon
//         value={`Add Member`}
//         onClick={() => {
//           const tempArray = membersArray.map((data) => {
//             if (!data.is_primary && insurerCBXArray.includes(data.code)) {
//               return {
//                 [`code`]: data.code,
//                 [`display_name`]: data.display_name,
//                 [`min_age`]: data.min_age,
//                 [`max_age`]: data.max_age,
//                 ["is_primary"]: true,
//                 ["is_primary_modal"]: true,
//               };
//             } else {
//               return data;
//             }
//           });
//           setMembersArray(tempArray);
//           setShowModal(false);
//         }}
//       /> */}
//     </Modal>
//   );
// }
