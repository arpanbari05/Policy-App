import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../../customHooks";
import styled from "styled-components";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  setShareType,
  setShowSharePopup,
} from "../../../pages/quotePage/quote.slice";
import { RiShareForwardFill } from "react-icons/ri";
import useOutsiteClick from "../../../customHooks/useOutsideClick";
import { IoShareSocialSharp } from "react-icons/io5";
import { ClickSound } from "../../../utils/helper";

const SHARE_OPTIONS = [
  // {
  //   value: "share",
  //   label: "Share quotes",
  // },
  {
    value: "quotation_list",
    label: "Share quotation list",
  },
  {
    value: "specific_quotes",
    label: "Share specific quotes",
  },
];

const Sharebutton = ({
  onClick: onClickButton = () => {},
  label,
  shareQuotes,
  float,
  mobile,
  floatCss,
}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { shareType } = useSelector(state => state.quotePage);
  const selectRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  useOutsiteClick(selectRef, () => setShowMenu(false));
  const primary_color = mobile ? "#fff" : colors?.primary_color;

  const onClick = () => {
    ClickSound();
    onClickButton();
  };

  const selectStyles = {
    control: provided => ({
      ...provided,
      display: "none !important",
      width: "max-content",
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
      maxWidth: "150px",
      textAlign: "left !important",
    }),
    menu: provided => ({
      ...provided,
      width: "max-content",
      marginLeft: -15,
    }),
  };

  // useEffect(() => {
  //   dispatch(setShareType(SHARE_OPTIONS[0]));
  // }, []);

  const onChangeHandler = e => {
    dispatch(setShareType(e));
    setShowMenu(false);
    if (e.value === "quotation_list") {
      dispatch(setShowSharePopup(false));
    } else if (e.value === "specific_quotes") {
      dispatch(setShowSharePopup(true));
    }
  };

  if (float)
    return (
      <FloatButton
        onClick={onClick}
        floatCss={floatCss}
        color={colors?.primary_color}
      >
        <IoShareSocialSharp size={20} />
      </FloatButton>
    );

  return !shareQuotes ? (
    <ShareButton
      onClick={onClick}
      color={primary_color}
      data-html2canvas-ignore="true"
    >
      <RiShareForwardFill color={primary_color} />
      <span style={{ marginLeft: 5 }}>{label ? label : "Share"}</span>
    </ShareButton>
  ) : (
    <>
      <ShareButton
        ref={selectRef}
        onClick={() => {
          ClickSound();
          setShowMenu(true);
        }}
        color={primary_color}
        data-html2canvas-ignore="true"
      >
        <RiShareForwardFill color={primary_color} />
        <span style={{ marginLeft: 5 }}>{"Share quotes"}</span>
      </ShareButton>
      <Select
        styles={selectStyles}
        placeholder="Share Quotes"
        value={shareType.value && shareType}
        options={SHARE_OPTIONS}
        onChange={opt => {
          ClickSound();
          onChangeHandler(opt);
        }}
        menuIsOpen={showMenu}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: colors.primary_color,
            primary25: colors.primary_shade,
          },
        })}
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
  font-size: 12px;
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

const FloatButton = styled.button`
  @media (min-width: 768px) {
    display: none;
  }
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.color};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 7vw;
  bottom: 7vw;
  z-index: 99;
  box-shadow: 0 4px 13px rgba(0, 0, 0, 0.4);
  ${props => props.floatCss}
`;
