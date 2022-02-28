import { useState, useRef } from "react";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";
import "styled-components/macro";
import { OptionWrapper, ApplyBtn } from "./Filter.style";
import useUpdateFilters from "./useUpdateFilters";
import useFilters from "./useFilters";
import { useTheme } from "../../../../customHooks";
import { Filter, FilterHead } from ".";
import { tenures } from "../../data";

function FilterModal({ onClose, ...props }) {
  const { colors } = useTheme();

  const { getSelectedFilter } = useFilters();

  const [selectedTenure, setSelectedTenure] = useState(() =>
    getSelectedFilter("tenure"),
  );

  const handleChange = tenure => setSelectedTenure(tenure);

  const isSelected = tenure => tenure.code === selectedTenure.code;

  const { updateFilters } = useUpdateFilters();

  const handleApplyClick = () => {
    updateFilters({ tenure: selectedTenure });
    onClose && onClose();
  };

  return (
    <CustomModal1
      header="Multiyear Options"
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
      tooltipDesc="Select desired policy period."
      {...props}
    >
      <div>
        <OptionWrapper>
          {tenures.map(tenure => (
            <MultiYearOption
              tenure={tenure}
              key={tenure.code}
              checked={isSelected(tenure)}
              onChange={handleChange}
            />
          ))}
        </OptionWrapper>
      </div>
    </CustomModal1>
  );
}

function MultiYearOption({ tenure, onChange, checked, ...props }) {
  const target = useRef(null);
  const handleChange = evt => {
    if (evt.target.value) onChange && onChange(tenure);
  };
  const discount = tenure.discount;
  return (
    <li
      css={`
        margin: 5px 0;
      `}
      className="option d-flex align-items-center justify-content-between"
      {...props}
      onClick={() => {
        target.current.click();
      }}
    >
      <label htmlFor={"tenure-" + tenure.code}>
        {tenure.display_name}{" "}
        {discount ? (
          <span
            style={{
              color: "#0a87ff",
            }}
          >
            {`(save upto ${discount}%)`}
          </span>
        ) : null}
      </label>
      <input
        type="radio"
        id={"tenure-" + tenure.code}
        name="multiYear"
        checked={checked}
        onChange={handleChange}
        ref={target}
      />
    </li>
  );
}

const MultiyearOptionFilter = () => {
  const { getSelectedFilter } = useFilters();

  const tenureFilter = getSelectedFilter("tenure");

  const displayTenureFilter = tenureFilter.display_name;

  return (
    <Filter>
      <FilterHead label={"Multiyear Options"}>{displayTenureFilter}</FilterHead>
      <FilterModal />
    </Filter>
  );
};

// const FilterModal = ({ show, handleClose }) => {
//   const { filters, selectedGroup } = useSelector((state) => state.quotePage);
//   const companies = useSelector(
//     (state) => state.frontendBoot.frontendData.data.companies
//   );
//   const frontEndData = useSelector(
//     ({ frontendBoot }) => frontendBoot.frontendData.data
//   );
//   const dispatch = useDispatch();
//   const { theme } = useSelector((state) => state.frontendBoot);

//   const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;

//   const [selectedTenure, setSelectedTenure] = useState(
//     filters.multiYear
//       ? {
//           code: parseInt(filters.multiYear),
//           displayName: filters.multiYear,
//         }
//       : {}
//   );

//   const handleChange = (code, displayName) => {
//     if (displayName) {
//       setSelectedTenure({
//         code,
//         displayName,
//       });
//     }
//   };

//   const { updateFilters } = useUpdateFilters();

//   const handleApply = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     dispatch(setFilters({ multiYear: selectedTenure.displayName }));
//     updateFilters({
//       tenure: { ...selectedTenure, display_name: selectedTenure.displayName },
//     });

//     // dispatch(replaceQuotes([]));
//     // dispatch(replaceFilterQuotes([]));
//     // console.log("fetchquotes multiyearOption")
//     // dispatch(
//     //   fetchQuotes(companies, {
//     //     plan_type: filters.planType === "Individual"
//     //       ? "I"
//     //       : filters.planType === "Family Floater"
//     //         ? "F"
//     //         : "M",
//     //     tenure: selectedTenure.code,
//     //     sum_insured: frontEndData.covers.find(
//     //       (filter) => filter.display_name === filters.cover
//     //     )?.code,
//     //     member: selectedGroup,
//     //   })
//     //);

//     handleClose();
//   };

//   return (
//     <>
//       {show && (
//         <CustomModal1
//           header="Multiyear Options"
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
//           tooltipDesc="Select desired policy period."
//         >
//           <div>
//             <OptionWrapper>
//               <li
//                 css={`
//                   margin: 5px 0;
//                 `}
//                 className="option d-flex align-items-center justify-content-between"
//               >
//                 <label htmlFor="1 Year">1 Year</label>
//                 <input
//                   type="radio"
//                   id="1 Year"
//                   name="multiYear"
//                   checked={selectedTenure.code === 1 || false}
//                   onChange={() => handleChange(1, "1 Year")}
//                 />
//               </li>
//               <li
//                 css={`
//                   margin: 5px 0;
//                 `}
//                 className="option d-flex align-items-center justify-content-between"
//               >
//                 <label htmlFor="2 Year">
//                   2 Years{" "}
//                   <span
//                     style={{
//                       color: "#0a87ff",
//                     }}
//                   >
//                     (save upto 10%)
//                   </span>
//                 </label>
//                 <input
//                   type="radio"
//                   id="2 Year"
//                   name="multiYear"
//                   checked={selectedTenure.code === 2 || false}
//                   onChange={() => handleChange(2, "2 Years")}
//                 />
//               </li>
//               <li
//                 css={`
//                   margin: 5px 0;
//                 `}
//                 className="option d-flex align-items-center justify-content-between"
//               >
//                 <label htmlFor="3 Year">
//                   3 Years{" "}
//                   <span
//                     style={{
//                       color: "#0a87ff",
//                     }}
//                   >
//                     (save upto 20%)
//                   </span>
//                 </label>
//                 <input
//                   type="radio"
//                   id="3 Year"
//                   name="multiYear"
//                   checked={selectedTenure.code === 3 || false}
//                   onChange={() => handleChange(3, "3 Years")}
//                 />
//               </li>
//             </OptionWrapper>
//           </div>
//         </CustomModal1>
//       )}
//       {/*<Modal
//       show={show}
//       onHide={handleClose}
//       animation={false}
//       css={`
//         .modal-dialog {
//           margin: 0px !important;
//           max-width: 440px;
//         }
//         .modal-content {
//           top: 238px;
//           left: 34.5vw;
//           @media(min-width: 1550px){
//             left:36.5vw;
//           }
//         }
//         .modal-footer {
//           padding: 0px !important;

//           border-top: none !important;
//         }
//         .modal-footer > * {
//           margin: 0px !important;
//         }
//       `}
//     >
//       <Modal.Header closeButton>
//         <Modal.Title
//           style={{
//             fontSize: "20px",
//             fontWeight: "600",
//             color: "black",
//           }}
//         >
//           Multiyear Options
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div>
//           <OptionWrapper>
//             <li className="option d-flex align-items-center justify-content-between">
//               <label htmlFor="1 Year">1 Year</label>
//               <input type="radio" id="1 Year" name="multiYear" checked={selectedTenure.code === 1 || false} onChange={() => handleChange(1, "1 Year")} />
//             </li>
//             <li className="option d-flex align-items-center justify-content-between">
//               <label htmlFor="2 Year">
//                 2 Years{" "}
//                 <span
//                   style={{
//                     color: "#0a87ff",
//                   }}
//                 >
//                   (save upto 10%)
//                 </span>
//               </label>
//               <input type="radio" id="2 Year" name="multiYear" checked={selectedTenure.code === 2 || false}  onChange={() => handleChange(2, "2 Years")} />
//             </li>
//             <li className="option d-flex align-items-center justify-content-between">
//               <label htmlFor="3 Year">
//                 3 Years{" "}
//                 <span
//                   style={{
//                     color: "#0a87ff",
//                   }}
//                 >
//                   (save upto 20%)
//                 </span>
//               </label>
//               <input type="radio" id="3 Year" name="multiYear" checked={selectedTenure.code === 3 || false}  onChange={() => handleChange(3, "3 Years")} />
//             </li>
//           </OptionWrapper>
//         </div>
//       </Modal.Body>
//       <Modal.Footer className="text-center">
//         <ApplyBtn className="apply_btn mx-auto h-100 w-100" onClick={(e) => handleApply(e)}>Apply</ApplyBtn>
//       </Modal.Footer>
//                 </Modal>*/}
//     </>
//   );
// };

export default MultiyearOptionFilter;
