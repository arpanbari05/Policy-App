import { useState, useRef } from "react";
import styled from "styled-components";
import CustomModal1 from "../../../../components/Common/Modal/CustomModal1";
import "styled-components/macro";
import { OptionWrapper, ApplyBtn } from "./Filter.style";
import useFilters from "./useFilters";
import { useFrontendBoot, useTheme } from "../../../../customHooks";
import useUpdateFilters from "./useUpdateFilters";
import { Filter, FilterHead } from ".";
import { setPosPopup } from "../../quote.slice";
import { useDispatch } from "react-redux";
import { isSSOJourney } from "../../../../utils/helper";

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
  let {
    data: {
      covers,
      settings: { pos_nonpos_switch_message, restrict_posp_quotes_after_limit },
    },
  } = useFrontendBoot();

  const { colors } = useTheme();

  const dispatch = useDispatch();

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
    !selectedCover?.applicable_on_pos &&
    isSSOJourney() &&
    pos_nonpos_switch_message
      ? dispatch(setPosPopup(true))
      : dispatch(setPosPopup(false));
    onClose && onClose();
  };

  if (
    localStorage.getItem("SSO_user") &&
    restrict_posp_quotes_after_limit === `${1}`
  ) {
    covers = covers.slice(0, 2);
  }

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
        </OptionWrapper>
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
        inputRef.current.click();
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

const CoverRangeFilter = () => {
  const [showModal, setShowModal] = useState(false);

  const { getSelectedFilter } = useFilters();

  const selectedCover = getSelectedFilter("cover");

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
