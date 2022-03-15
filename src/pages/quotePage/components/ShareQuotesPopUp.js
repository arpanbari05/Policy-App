import React, { useState } from 'react';
import { Button } from "../../../components/index";
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import { replaceShareQuotes, setShareType } from '../quote.slice';
import { RiShareForwardFill } from "react-icons/ri";

const Sharequotespopup = ({ onClick = () => {}, show }) => {
    const { quotesToShare, shareType } = useSelector(state => state.quotePage);
    const dispatch = useDispatch();

    const clearHandler = () => {
        dispatch(replaceShareQuotes([]));
        dispatch(setShareType({}))
    }
    return (
        quotesToShare.length && show && shareType.value !== "share" ? (
        <ShareQuoteWrapper>
            <Plan>
                {`${quotesToShare.length} plan(s) selected`}
            </Plan>
            <Button css={`height: 40px;`} onClick={onClick}>
                    <span>Share</span>
                    <RiShareForwardFill color='#fff' />
            </Button>
            <Clear onClick={clearHandler}>Clear</Clear>
        </ShareQuoteWrapper>
        ) : (<></>)
    );
}

export default Sharequotespopup;

const ShareQuoteWrapper = styled.div`
    background: rgba(0,0,0,.8);
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
`;

const Plan = styled.div`
    color: #fff;
    font-size: 14px;
`;

const Clear = styled.div`
color: #fff;
    font-size: 14px;
    cursor: pointer;
`