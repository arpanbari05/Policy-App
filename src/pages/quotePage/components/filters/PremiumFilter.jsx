import {
  useState,
  //  useEffect
} from "react";
// import { Modal } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import styled from "styled-components";
// import { setFilters, premiumFilterCards } from "../../quote.slice";
import "styled-components/macro";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";
import { Filter, OptionWrapper, ApplyBtn } from "./Filter.style";
import useFilters from "./useFilters";
import { useGetFrontendBootQuery } from "../../../../api/api";
import useUpdateFilters from "./useUpdateFilters";
import { useTheme } from "../../../../customHooks";

function PremiumFilterModal({ handleClose, ...props }) {
  const {
    data: { premiums },
  } = useGetFrontendBootQuery();

  const { colors } = useTheme();

  const { getSelectedFilter } = useFilters();

  const [selectedPremiumFilter, setSelectedPremiumFilter] = useState(() =>
    getSelectedFilter("premium"),
  );

  const { updateFilters } = useUpdateFilters();

  const handleChange = premium => {
    setSelectedPremiumFilter(premium);
  };

  const isChecked = premium =>
    selectedPremiumFilter && selectedPremiumFilter.code === premium.code;

  const handleApplyClick = () => {
    updateFilters({ premium: selectedPremiumFilter });
    handleClose && handleClose();
  };

  return (
    <CustomModal1
      header="Premium"
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
      handleClose={handleClose}
      customizedTopMargin="65"
      tooltipDesc="Select a range of premium to view plans of desired premium rates"
      {...props}
    >
      <div>
        <OptionWrapper PrimaryColor={colors.primary_color}>
          {premiums.map(premium => (
            <PremiumOption
              premium={premium}
              checked={isChecked(premium)}
              onChange={handleChange}
              key={premium.code}
            />
          ))}
        </OptionWrapper>
      </div>
    </CustomModal1>
  );
}

function PremiumOption({ premium, checked, onChange, ...props }) {
  const handleChange = evt => {
    if (evt.target.checked) onChange && onChange(premium);
  };

  return (
    <li
      css={`
        margin: 5px 0;
      `}
      className="option d-flex align-items-center justify-content-between"
      {...props}
    >
      <label htmlFor={premium.code}>{premium.display_name}</label>
      <input
        type="radio"
        id={premium.code}
        name="select_premium"
        checked={checked}
        onChange={handleChange}
      />
    </li>
  );
}

const PremiumFilter = () => {
  const [showModal, setShowModal] = useState(false);
  // const filters = useSelector(({ quotePage }) => quotePage.filters);

  const { getSelectedFilter } = useFilters();

  // const {
  //   data: { premiums },
  // } = useGetFrontendBootQuery();

  const selectedPremiumFilter = getSelectedFilter("premium");

  // const displayPremiumFilter = !selectedPremiumFilter
  //   ? "Select Premium"
  //   : premiums.find((premium) => premium.code === selectedPremiumFilter)
  //       ?.display_name;

  const displayPremiumFilter = !selectedPremiumFilter
    ? "Select Premium"
    : selectedPremiumFilter.display_name;

  return (
    <>
      <Filter className="filter d-flex flex-column flex-fill">
        <span className="filter_head">Premium</span>
        <span onClick={() => setShowModal(true)} className="filter_sub_head">
          {/* {filters.premium ? filters.premium.displayName : "Select Premium"}{" "} */}
          {displayPremiumFilter}
          <i class="fas fa-chevron-down"></i>
        </span>
      </Filter>

      {showModal && (
        <PremiumFilterModal
          // show={showModal}
          handleClose={() => setShowModal(false)}
          //existingPremium={filters.premium}
          //filters={filters}
        />
      )}
    </>
  );
};

// const FilterModal = ({ show, handleClose }) => {
//   const premiumOptions = useSelector(
//     ({ frontendBoot }) => frontendBoot.frontendData.data
//   );
//   const filters = useSelector(({ quotePage }) => quotePage.filters);
//   const dispatch = useDispatch();
//   const { theme } = useSelector((state) => state.frontendBoot);

//   const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
//   const [selectedPremium, setSelectedPremium] = useState({
//     code: "",
//     displayName: "",
//   });

//   console.log(selectedPremium, "selectedPremium");
//   useEffect(() => {
//     if (filters.premium === "" && selectedPremium.code !== "") {
//       setSelectedPremium({ code: "", displayName: "" });
//     }
//   }, [filters.premium]);

//   const handleChange = (code, displayName) => {
//     if (displayName) {
//       setSelectedPremium({ code, displayName });
//     }
//   };

//   const { updateFilters } = useUpdateFilters();

//   const handleApply = () => {
//     dispatch(setFilters({ premium: selectedPremium }));

//     // dispatch(premiumFilterCards(selectedPremium));

//     updateFilters({ premium: selectedPremium });
//     handleClose();
//   };

//   return (
//     <>
//       {show && (
//         <CustomModal1
//           header="Premium"
//           footerJSX={
//             <ApplyBtn
//               css={`
//                 height: 65px !important;
//               `}
//               PrimaryColor={PrimaryColor}
//               className=" apply_btn mx-auto h-100 w-100"
//               onClick={() => handleApply()}
//             >
//               Apply
//             </ApplyBtn>
//           }
//           handleClose={handleClose}
//           customizedTopMargin="65"
//           tooltipDesc="Select a range of premium to view plans of desired premium rates"
//         >
//           <div>
//             <OptionWrapper PrimaryColor={PrimaryColor}>
//               {premiumOptions
//                 ? premiumOptions.premiums.map((option, i) => {
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
//                           checked={
//                             selectedPremium.code === option.code || false
//                           }
//                           name="select_premium"
//                           onChange={() =>
//                             handleChange(option.code, option.display_name)
//                           }
//                         />
//                       </li>
//                     );
//                   })
//                 : ""}
//             </OptionWrapper>
//           </div>
//         </CustomModal1>
//       )}
//     </>
//     /*<Modal
//       show={show}
//       onHide={handleClose}
//       animation={false}
//       css={`
//         .modal-dialog {
//           margin: 0px !important;
//           max-width: 440px;
//         }
//         .modal-content {
//           top: 248px;
//           left: 8.5vw;
//           @media (min-width: 1400px) {
//             left: 5.5vw;
//           }
//           @media (min-width: 1550px) {
//             left: 9.5vw;
//           }
//           @media (min-width: 1700px) {
//             left: 13.5vw;
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
//           Premium
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <div>
//           <OptionWrapper>
//             {premiumOptions
//               ? premiumOptions.premiums.map((option, i) => {
//                   return (
//                     <li
//                       className="option d-flex align-items-center justify-content-between"
//                       key={i}
//                     >
//                       <label htmlFor={option.code}>{option.display_name}</label>
//                       <input
//                         type="radio"
//                         id={option.code}
//                         checked={selectedPremium.code === option.code || false}
//                         name="select_premium"
//                         onChange={() =>
//                           handleChange(option.code, option.display_name)
//                         }
//                       />
//                     </li>
//                   );
//                 })
//               : ""}
//           </OptionWrapper>
//         </div>
//       </Modal.Body>
//       <Modal.Footer className="text-center">
//         <ApplyBtn
//           className=" apply_btn mx-auto h-100 w-100"
//           onClick={() => handleApply()}
//         >
//           Apply
//         </ApplyBtn>
//       </Modal.Footer>
//     </Modal>*/
//   );
// };

export default PremiumFilter;
