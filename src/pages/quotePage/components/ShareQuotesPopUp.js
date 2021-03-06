import React from "react";
import { Button } from "../../../components/index";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  replaceShareQuotes,
  setShareType,
  setShowSharePopup,
} from "../quote.slice";
import { RiShareForwardFill } from "react-icons/ri";
import { ClickSound } from "../../../utils/helper";
import { useRouteMatch } from "react-router-dom";

const Sharequotespopup = ({ onClick = () => {} }) => {
  const { quotesToShare, shareType, showSharePopup } = useSelector(
    state => state.quotePage,
  );
  const dispatch = useDispatch();

  const isShortlistedRoute = useRouteMatch("/shortlisted");

  const clearHandler = () => {
    ClickSound();
    dispatch(replaceShareQuotes([]));
    dispatch(setShareType({}));
  };
  return !isShortlistedRoute &&
    quotesToShare?.length &&
    showSharePopup &&
    shareType.value ? (
    <ShareQuoteWrapper>
      <Plan>{`${quotesToShare?.length} plan(s) selected`}</Plan>
      <Button
        css={`
          height: 40px;
        `}
        onClick={() => {
          onClick();
          dispatch(setShowSharePopup(false));
        }}
      >
        <span>Share</span>
        <RiShareForwardFill color="#fff" />
      </Button>
      <Clear onClick={clearHandler}>Clear</Clear>
    </ShareQuoteWrapper>
  ) : (
    <></>
  );
};

export default Sharequotespopup;

const ShareQuoteWrapper = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 5px 10px;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  z-index: 99999;

  @media (max-width: 768px) {
    width: max-content;
    bottom: 50px;
  }
`;

const Plan = styled.div`
  color: #fff;
  font-size: 14px;
`;

const Clear = styled.div`
  color: #fff;
  font-size: 14px;
  cursor: pointer;
`;
