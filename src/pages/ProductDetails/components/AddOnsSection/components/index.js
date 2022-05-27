import { useState } from "react";
import { Modal, Tabs } from "react-bootstrap";
import { BsCircleFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import styled from "styled-components/macro";
import { Button, CloseButton, OptionSelect } from "../../../../../components";
import RoundDD from "../../../../../components/RoundDD";
import { useQuoteCard, useTheme } from "../../../../../customHooks";
import { amount } from "../../../../../utils/helper";
import { mobile, small } from "../../../../../utils/mediaQueries";
import { getAddOnMembers } from "../utils";
import _ from "lodash";

export function Detail({ label, children, onClick, editable = true }) {
  return (
    <div className="p-2 d-flex align-items-center justify-content-between">
      <div>{label}</div>
      <div
        className="d-flex align-items-center"
        css={`
          gap: 0.6em;
        `}
      >
        {children}
        {editable ? (
          <button onClick={onClick}>
            <FaPen className="mb-1" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function AddOnCheckButton({
  checked = false,
  quote,
  onChange,
  totalPremium,
  ...props
}) {
  const { colors } = useTheme();
  const handleChange = evt => {
    onChange && onChange(quote, evt.target.checked);
  };

  return (
    <div {...props}>
      <label
        aria-checked={checked}
        className="w-100 p-2 d-flex align-items-center justify-content-center rounded"
        css={`
          background-color: ${colors.primary_shade};
          font-weight: 900;
          color: #000;
          cursor: pointer;
          &:hover {
            color: ${colors.primary_color};
          }
        `}
      >
        {amount(totalPremium)}
        <span
          className="mb-1 mx-2"
          css={`
            font-size: 1.2rem;
          `}
        >
          {checked ? (
            <IoCheckmarkCircleSharp
              color={colors.primary_color}
              style={{ marginRight: 3 }}
              size={20}
            />
          ) : (
            <BsCircleFill color="#fff" />
          )}
        </span>
        <input
          className="visually-hidden"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

function AddOnOptionDropdown({ list, selected, onChange, isError }) {
  const handleChange = (_, __, ___, option) => {
    onChange && onChange(option);
  };
  return (
    <RoundDD
      list={list}
      type="dropdown"
      selected={selected}
      handleChange={handleChange}
      redBorder={isError}
    />
  );
}

function AddOnOption({ label, dropdown }) {
  return (
    <div>
      <OptionSelect label={label} dropdown={dropdown} />
    </div>
  );
}

function getOptions(arr = []) {
  return arr.map(item => ({ title: _.capitalize(item + ""), id: item }));
}

export function EditModal({
  onClose,
  show,
  quotes,
  onUpdate,
  currentQuote,
  cartEntry,
}) {
  const { colors } = useTheme();

  const {
    selectedSumInsured,
    sumInsureds,
    handleSumInsuredChange,
    deductibles,
    selectedDeductible,
    handleDeductibleChange,
  } = useQuoteCard({
    quotes,
  });

  const [member, setMember] = useState(currentQuote.member);

  const sumInsuredOptions = getOptions(sumInsureds);
  const deductibleOptions = getOptions(deductibles);
  const memberOptions = getOptions(
    getAddOnMembers(currentQuote, quotes, cartEntry),
  );

  const handleClose = () => {
    onClose && onClose();
  };

  const handleUpdate = () => {
    onUpdate &&
      onUpdate({
        sumInsured: selectedSumInsured,
        deductible: selectedDeductible,
        member,
      });
    handleClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <div
        className="p-3"
        css={`
          background-color: ${colors.secondary_shade};
        `}
      >
        <h1
          css={`
            font-size: 1.2rem;
            font-weight: 900;
          `}
        >
          Edit Details
        </h1>
        <CloseButton onClick={handleClose} />
      </div>
      <div
        className="p-3 d-flex flex-column"
        css={`
          gap: 1em;
        `}
      >
        {quotes[0]?.deductible ? (
          <AddOnOption
            label="Deductible"
            dropdown={
              <AddOnOptionDropdown
                selected={selectedDeductible}
                list={deductibleOptions}
                onChange={({ id }) => handleDeductibleChange({ value: id })}
              />
            }
          />
        ) : null}
        <AddOnOption
          label="Cover"
          dropdown={
            <AddOnOptionDropdown
              list={sumInsuredOptions}
              selected={selectedSumInsured}
              onChange={({ id }) => handleSumInsuredChange({ value: id })}
            />
          }
        />
        {!quotes[0]?.deductible ? (
          <AddOnOption
            label="Insured"
            dropdown={
              <AddOnOptionDropdown
                selected={_.capitalize(member)}
                list={memberOptions}
                onChange={({ id }) => {
                  setMember(id);
                }}
              />
            }
          />
        ) : null}
      </div>
      <Button className="w-100 rounded-0" onClick={handleUpdate}>
        Update
      </Button>
    </Modal>
  );
}

export const AddOnsNav = styled(Tabs)`
  border: none;
  color: #5b5e64 !important;

  @media (max-width: 400px) {
    .nav-item {
      font-size: 12px !important;
      margin-right: 0px !important;
      color: #383b3f;
    }
  }
  & .nav-item {
    position: relative;
    width: max-content;
    background: none;
    color: #383b3f !important;
    padding: 0;
    font-size: 16px;
    font-weight: 900;

    border: none !important;
    margin-right: 10px;
    &::after {
      content: "";
      position: absolute;
      top: 110%;
      left: 0%;
      width: 100%;
      height: 4px;
      background: var(--dark-pink);
      border-radius: 20px;
      transform: scale(0, 1);
      opacity: 0;
      transition: all 0.3s ease-in-out;
    }
    .nav-link {
      color: #383b3f !important;
      border: none !important;
      border-radius: 50px !important;
      :hover {
        border: none;
        border-radius: 50px;
      }
    }
    .nav-link.active {
      border-color: #0a87ff;
      background: ${props => props.primaryColor};
      color: white !important;
      border-radius: 50px;
      &::after {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
`;

export const AddOnTabContentWrap = styled.div`
  padding: 18px 0 36px 0;
  margin-top: 20px;

  ${mobile} {
    background-color: #eff7ff;
    border-radius: 19px;

    padding-bottom: 14px;
  }
`;

export const AddOnDesc = styled.p`
  margin-top: -10px;
  margin-bottom: 1rem;

  ${mobile} {
    padding: 0px 12px;
    margin-bottom: 10px;
    margin-top: 0;
  }

  ${small} {
    padding-left: 11px;
    font-size: 11px;
    line-height: 1.67;
  }
`;
