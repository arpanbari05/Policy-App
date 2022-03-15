import React, { useEffect } from "react";
import { useTheme } from "../../../customHooks";
import styled from "styled-components";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { setShareType } from "../../../pages/quotePage/quote.slice";
import { RiShareForwardFill } from "react-icons/ri";

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

const Sharebutton = ({ onClick = () => {}, label, shareQuotes }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { shareType } = useSelector(state => state.quotePage);

  const selectStyles = {
    control: provided => ({
      ...provided,
      width: "150px",
      fontSize: "13px",
      fontWeight: "bold",
      minHeight: "initial",
      borderRadius: "1000px",
      border: `2px solid ${colors.primary_color}`,
      boxShadow: '0 !important',
      "&:hover": {
        border: `2px solid ${colors.primary_color}`,
      },
      }),
      indicatorSeparator: () => ({ display: "none" }),
      option: provided => ({
        ...provided,
        fontSize: "12px",
        fontWeight: "bold",
        padding: "7px 7px !important",
        textAlign: "center !important"
      }),
  }

  useEffect(() => {
    dispatch(setShareType(SHARE_OPTIONS[0]));
  }, [])

  const onChangeHandler = (e) => {
    dispatch(setShareType(e));
  }

  return (
      !shareQuotes ? (
        <ShareButton onClick={onClick} color={colors.primary_color}>
          <RiShareForwardFill color={colors.primary_color} />
          <span style={{marginLeft: 5}}>{label ? label : "Share"}</span>
        </ShareButton>
      ) : (
        <Select styles={selectStyles} placeholder="Share Quotes" value={shareType.value && shareType || SHARE_OPTIONS[0]} options={SHARE_OPTIONS} onChange={onChangeHandler} />
      )
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
  padding: 7px 10px;
  font-size: 16px;
  margin: 0 15px;

  @media (max-width: 1499px) {
    font-size: 14px;
  }
`;
