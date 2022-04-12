import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../customHooks";
import styled from "styled-components";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { setShareType } from "../../../pages/quotePage/quote.slice";
import { RiShareForwardFill } from "react-icons/ri";
import useOutsiteClick from "../../../customHooks/useOutsideClick";

const SHARE_OPTIONS = [
  {
    value: "share",
    label: "Share quotes",
  },
  {
    value: "quotation_list",
    label: "Share quotation list",
  },
  {
    value: "specific_quotes",
    label: "Share specific quotes",
  },
];

const Sharebutton = ({ onClick = () => {}, label, shareQuotes, mobile }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { shareType } = useSelector(state => state.quotePage);
  const selectRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  useOutsiteClick(selectRef, () => setShowMenu(false));
  const primary_color = mobile ? "#fff" : colors?.primary_color;

  const selectStyles = {
    control: provided => ({
      ...provided,
      display: "none !important",
      width: "150px",
      fontSize: "13px",
      fontWeight: "bold",
      minHeight: "initial",
      borderRadius: "1000px",
      border: `2px solid ${primary_color}`,
      boxShadow: "0 !important",
      "&:hover": {
        border: `2px solid ${primary_color}`,
      },
    }),
    indicatorSeparator: () => ({ display: "none" }),
    option: provided => ({
      ...provided,
      fontSize: "12px",
      fontWeight: "bold",
      padding: "7px 7px !important",
      textAlign: "center !important",
    }),
  };

  useEffect(() => {
    dispatch(setShareType(SHARE_OPTIONS[0]));
  }, []);

  const onChangeHandler = e => {
    dispatch(setShareType(e));
    setShowMenu(false);
  };

  return !shareQuotes ? (
    <ShareButton onClick={onClick} color={primary_color}>
      <RiShareForwardFill color={primary_color} />
      <span style={{ marginLeft: 5 }}>{label ? label : "Share"}</span>
    </ShareButton>
  ) : (
    <>
      <ShareButton
        ref={selectRef}
        onClick={() => setShowMenu(true)}
        color={primary_color}
      >
        <RiShareForwardFill color={primary_color} />
        <span style={{ marginLeft: 5 }}>{"Share quotes"}</span>
      </ShareButton>
      <Select
        styles={selectStyles}
        placeholder="Share Quotes"
        ope
        value={(shareType.value && shareType) || SHARE_OPTIONS[0]}
        options={SHARE_OPTIONS}
        onChange={onChangeHandler}
        menuIsOpen={showMenu}
      />
    </>
  );
};

export default Sharebutton;

const ShareButton = styled.button`
  background-color: #fff;
  display: flex;
  align-items: center;
  border-radius: 100px;
  border: 2px solid ${props => props.color};
  color: ${props => props.color};
  padding: 0.7em;
  font-size: 0.79rem;
  // margin: 0 15px;
  font-weight: bold;
  justify-content: center;

  @media (max-width: 768px) {
    background: transparent;
    height: 30px;
    padding: 0;
    width: 65px;
  }
`;
