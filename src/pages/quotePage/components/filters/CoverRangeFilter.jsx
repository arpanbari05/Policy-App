import { useState, useRef } from "react";
import styled from "styled-components";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";
import "styled-components/macro";
import { OptionWrapper, ApplyBtn } from "./Filter.style";
import useFilters from "./useFilters";
import { useFrontendBoot, useTheme } from "../../../../customHooks";
import useUpdateFilters from "./useUpdateFilters";
import { Filter, FilterHead } from ".";

function validateCustomCover(customCover) {
  if (customCover < 200000) {
    return "Minimum should be 2 lac";
  } else if (customCover > 20000000) {
    return "Maximum should be 2 Crore";
  } else if (customCover % 100000 !== 0) {
    return "Enter in multiples of 1 lac";
  }
  return "";
}

function CoverFilterModal({ onClose, ...props }) {
  const {
    data: { covers },
  } = useFrontendBoot();

  const { colors } = useTheme();

  const { getSelectedFilter } = useFilters();

  const [selectedCover, setSelectedCover] = useState(() =>
    getSelectedFilter("cover"),
  );

  const [customCover, setCustomCover] = useState(
    () => getSelectedFilter("cover").custom || "",
  );

  const [customCoverError, setCustomCoverError] = useState("");

  const handleOptionChange = cover => {
    setSelectedCover(cover);
    setCustomCover("");
    setCustomCoverError("");
  };

  const handleCustomCoverChange = evt => {
    let { value: givenCustomCover } = evt.target;

    if (!givenCustomCover) {
      setCustomCover("");
      setCustomCoverError("");
      setSelectedCover(getSelectedFilter("cover"));
      return;
    }

    givenCustomCover = parseInt(givenCustomCover);

    if (givenCustomCover >= 0) {
      setCustomCover(givenCustomCover);

      const customCoverError = validateCustomCover(givenCustomCover);

      if (customCoverError) {
        setCustomCoverError(customCoverError);
        setSelectedCover(undefined);
        return;
      }

      setCustomCoverError("");
      setSelectedCover({
        code: `${givenCustomCover}-${givenCustomCover}`,
        displayName: givenCustomCover,
      });
    }
  };

  const isSelected = cover =>
    Boolean(selectedCover && selectedCover.code === cover.code);

  const { updateFilters } = useUpdateFilters();

  const handleApplyClick = () => {
    if (customCoverError) return;
    let updatedCoverFilter = selectedCover;
    if (customCover)
      updatedCoverFilter = {
        ...selectedCover,
        code: `${customCover}-${customCover}`,
        custom: `${customCover}`,
      };
    updateFilters({
      cover: updatedCoverFilter,
    });
    onClose && onClose();
  };

  return (
    <CustomModal1
      header="Choose Your Cover Range"
      footerJSX={
        <ApplyBtn
          css={`
            background-color: ${colors.primary_color};
          `}
          className="apply_btn mx-auto h-100 w-100"
          onClick={handleApplyClick}
        >
          Apply
        </ApplyBtn>
      }
      handleClose={() => onClose && onClose()}
      leftAlignmnetMargin="-22"
      tooltipDesc="Select a range of cover amount to view plans offering required cover amount"
      {...props}
    >
      <div>
        <OptionWrapper>
          {covers.map(cover => (
            <CoverOption
              cover={cover}
              checked={isSelected(cover)}
              onChange={handleOptionChange}
              key={cover.code}
            />
          ))}
        </OptionWrapper>
        <div
          style={{
            fontWeight: "600",
          }}
          className="text-center w-100"
        >
          OR
        </div>

        <CustomInputWrapper>
          <input
            type="number"
            placeholder="Enter your own cover."
            className="w-100"
            value={customCover}
            onChange={handleCustomCoverChange}
          />
          {customCoverError ? (
            <div className="bottom_msg">{customCoverError}</div>
          ) : null}
        </CustomInputWrapper>
      </div>
    </CustomModal1>
  );
}

function CoverOption({ cover, checked, onChange, ...props }) {

  const inputRef = useRef();

  const handleChange = evt => {
    if (evt.target.checked) onChange && onChange(cover);
  };

  return (
    <li
      css={`
        margin: 5px 0;
      `}
      className="option d-flex align-items-center justify-content-between"
      {...props}
      onClick={() => {
        inputRef.current.click()
      }}
    >
      <label htmlFor={cover.code}>{cover.display_name}</label>
      <input
        type="radio"
        id={cover.code}
        ref={inputRef}
        checked={checked}
        name="selectCover"
        onChange={handleChange}
      />
    </li>
  );
}

// const FilterModal = ({ show, handleClose }) => {
//   const { filters, selectedGroup } = useSelector((state) => state.quotePage);
//   const coverRangeOptions = useSelector(
//     ({ frontendBoot }) => frontendBoot.frontendData.data
//   );
//   const { theme } = useSelector((state) => state.frontendBoot);

//   const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
//   const [ownCover, setOwnCover] = useState(filters.ownCover);

//   const [inputCoverError, setinputCoverError] = useState(false);
//   const companies = useSelector(
//     (state) => state.frontendBoot.frontendData.data.companies
//   );

//   const { getSelectedFilter } = useFilters();

//   const selectedCoverFitler = getSelectedFilter("cover");

//   const [inputCover, setInputCover] = useState(
//     selectedCoverFitler.custom || ""
//   );

//   const dispatch = useDispatch();

//   const [selectedCover, setselectedCover] = useState(
//     filters.cover
//       ? {
//           code: coverRangeOptions.covers.find(
//             (filter) => filter.display_name === filters.cover
//           )?.code,
//           displayName: filters.cover,
//         }
//       : {}
//   );

//   useEffect(() => {
//     if (filters.cover !== selectedCover.displayName) {
//       setselectedCover({
//         code: coverRangeOptions.covers.find(
//           (filter) => filter.display_name === filters.cover
//         )?.code,
//         displayName: filters.cover,
//       });
//     }
//   }, [filters.cover]);
//   useEffect(() => {
//     if (inputCover) {
//       if (inputCover < 200000) {
//         setinputCoverError("Minimum should be 2 lac");
//       } else if (inputCover > 20000000) {
//         setinputCoverError("Maximum should be 2 Crore");
//       } else if (inputCover % 100000 != 0) {
//         setinputCoverError("Enter in multiples of 1 lac");
//       } else {
//         setinputCoverError(false);
//         setselectedCover({ code: inputCover, displayName: inputCover });
//       }
//     } else {
//       setinputCoverError(false);
//     }
//   }, [inputCover]);

//   const handleChange = (code, displayName) => {
//     setInputCover(false);
//     if (displayName) {
//       setselectedCover({
//         code,
//         displayName,
//       });
//     }
//   };

//   const { updateFilters } = useUpdateFilters();

//   const handleApply = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     dispatch(setFilters({ cover: selectedCover.displayName }));

//     if (selectedCover && selectedCover.code) {
//       let updatedCoverFilter = selectedCover;
//       if (inputCover)
//         updatedCoverFilter = {
//           ...selectedCover,
//           code: `${selectedCover.code}-${selectedCover.code}`,
//           custom: inputCover,
//         };
//       updateFilters({
//         cover: updatedCoverFilter,
//       });
//     }

//     // dispatch(replaceQuotes([]));
//     // dispatch(replaceFilterQuotes([]));
//     // console.log("fetchQuotes cover range", selectedCover.code);
//     // dispatch(
//     //   fetchQuotes(companies, {
//     //     plan_type:
//     //       filters.planType === "Individual"
//     //         ? "I"
//     //         : filters.planType === "Family Floater"
//     //         ? "F"
//     //         : "M",
//     //     tenure: parseInt(filters.multiYear),
//     //     sum_insured: selectedCover.code,
//     //     member: selectedGroup,
//     //   })
//     // );

//     if (!inputCoverError) handleClose();
//   };

//   return (
//     <>
//       {show && (
//         <CustomModal1
//           header="Choose Your Cover Range"
//           footerJSX={
//             <ApplyBtn
//               PrimaryColor={PrimaryColor}
//               css={`
//                 height: 65px !important;
//               `}
//               className="apply_btn mx-auto h-100 w-100"
//               onClick={(e) => handleApply(e)}
//             >
//               Apply
//             </ApplyBtn>
//           }
//           handleClose={handleClose}
//           leftAlignmnetMargin="-22"
//           tooltipDesc="Select a range of cover amount to view plans offering required cover amount"
//         >
//           <div>
//             <OptionWrapper>
//               {coverRangeOptions
//                 ? coverRangeOptions.covers.map((option, i) => {
//                     return (
//                       <li
//                         css={`
//                           margin: 5px 0;
//                         `}
//                         className="option d-flex align-items-center justify-content-between"
//                         key={i}
//                       >
//                         <label htmlFor={option.code}>
//                           {option.display_name}
//                         </label>
//                         <input
//                           type="radio"
//                           id={option.code}
//                           checked={option.code === selectedCover.code || false}
//                           name="selectCover"
//                           onChange={(e) => {
//                             setInputCover("");
//                             handleChange(option.code, option.display_name);
//                           }}
//                         />
//                       </li>
//                     );
//                   })
//                 : ""}
//             </OptionWrapper>
//             <div
//               style={{
//                 fontWeight: "600",
//               }}
//               className="text-center w-100"
//             >
//               OR
//             </div>

//             <CustomInputWrapper>
//               <input
//                 type="number"
//                 placeholder="Enter your own cover."
//                 className="w-100"
//                 value={inputCover}
//                 onChange={(e) => {
//                   if (e.target.value >= 0) {
//                     setInputCover(e.target.value);
//                     setselectedCover("");
//                   }
//                 }}
//               />
//               {inputCoverError ? (
//                 <div className="bottom_msg">{inputCoverError}</div>
//               ) : (
//                 <></>
//               )}
//             </CustomInputWrapper>
//           </div>
//         </CustomModal1>
//       )}

//       {/*<Modal
//         show={show}
//         onHide={handleClose}
//         animation={false}
//         css={`
//           .modal-dialog {
//             margin: 0px !important;
//             max-width: 440px;
//           }
//           .modal-content {
//             top: 248px;

//             left: 24.5vw;
//             @media (min-width: 1400px) {
//               left: 21.5vw;
//             }
//             @media (min-width: 1550px) {
//               left: 24.5vw;
//             }
//             @media (min-width: 1700px) {
//               left: 26.5vw;
//             }
//           }
//           .modal-footer {
//             padding: 0px !important;

//             border-top: none !important;
//           }
//           .modal-footer > * {
//             margin: 0px !important;
//           }
//         `}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title
//             style={{
//               fontSize: "20px",
//               fontWeight: "600",
//               color: "black",
//             }}
//           >
//             Choose Your Cover Range
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div>
//             <OptionWrapper>
//               {coverRangeOptions
//                 ? coverRangeOptions.covers.map((option, i) => {
//                     return (
//                       <li
//                         className="option d-flex align-items-center justify-content-between"
//                         key={i}
//                       >
//                         <label htmlFor={option.code}>
//                           {option.display_name}
//                         </label>
//                         <input
//                           type="radio"
//                           id={option.code}
//                           checked={option.code === selectedCover.code || false}
//                           name="selectCover"
//                           onChange={(e) => {
//                             setInputCover("");
//                             handleChange(option.code, option.display_name);
//                           }}
//                         />
//                       </li>
//                     );
//                   })
//                 : ""}
//             </OptionWrapper>
//             <div
//               style={{
//                 fontWeight: "600",
//               }}
//               className="text-center w-100"
//             >
//               OR
//             </div>

//             //custom input range for plan
//             <CustomInputWrapper>
//               <input
//                 type="number"
//                 placeholder="Enter your own cover."
//                 className="w-100"
//                 value={inputCover}
//                 onChange={(e) => {
//                   setInputCover(e.target.value);
//                   setselectedCover("");
//                 }}
//               />
//               {inputCoverError ? (
//                 <div className="bottom_msg">{inputCoverError}</div>
//               ) : (
//                 <></>
//               )}
//             </CustomInputWrapper>
//           </div>
//         </Modal.Body>
//         <Modal.Footer className="text-center">
//           <ApplyBtn
//             className="apply_btn mx-auto h-100 w-100"
//             onClick={(e) => handleApply(e)}
//           >
//             Apply
//           </ApplyBtn>
//         </Modal.Footer>
//               </Modal>*/}
//     </>
//   );
// };

const CoverRangeFilter = () => {
  const [showModal, setShowModal] = useState(false);
  // const filters = useSelector(({ quotePage }) => quotePage.filters);

  const { getSelectedFilter } = useFilters();

  // const {
  //   data: { covers },
  // } = useGetFrontendBootQuery();

  const selectedCover = getSelectedFilter("cover");

  // const displayCover = covers.find(
  //   (cover) => cover.code === selectedCover
  // ).display_name;

  const displayCover = selectedCover.display_name;

  return (
    <Filter>
      <FilterHead label={"Cover"}>{displayCover}</FilterHead>
      <CoverFilterModal />
    </Filter>
  );
};

export default CoverRangeFilter;

const CustomInputWrapper = styled.div`
  width: 100%;
  .bottom_msg {
    background-color: #d5ddea;
    font-size: 13px;
    margin: 5px 0px;
    padding: 10px;
  }
  input {
    border: none;
    border-bottom: 2px solid #0a87ff;
    padding: 5px 0px;
    :focus {
      outline: none;
    }
  }
`;

// <9999999?`upto ${inputCover/100000} ${inputCover/100000 === 1?"lac":"lacs"}`:`upto ${inputCover/10000000} ${inputCover/10000000 === 1?"cr.":"crs."}`
