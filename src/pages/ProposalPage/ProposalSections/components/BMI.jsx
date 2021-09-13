import styled from "styled-components";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowBMI } from "../ProposalSections.slice";
import { useHistory } from "react-router";
import useUrlQuery from "../../../../customHooks/useUrlQuery";

const BMI = () => {
  const { showBMI } = useSelector(state => state.proposalPage);
  const history = useHistory();
  const urlQuery = useUrlQuery();
  const enquiryId = urlQuery.get("enquiryId");
  const { memberGroups } = useSelector(state => state.greetingPage);
  const member = Object.keys(memberGroups)[0];
  const dispatch = useDispatch();
  if (!showBMI) return <></>;
  if (showBMI)
    return (
      <PopupWrapper>
        <Popup>
          <CloseButton
            onClick={() => {
              dispatch(setShowBMI(false));
            }}
          >
            <i className="fa fa-close"></i>
          </CloseButton>
          <Container>
            <p>
              Based on BMI of <span>{showBMI}</span> this plan isn't available.
              Please change your details for selected plan or choose another
              plan
            </p>
            <ButtonWrapper>
              <button
                onClick={() => {
                  dispatch(setShowBMI(false));
                }}
              >
                OK
              </button>
            </ButtonWrapper>
            <ViewQuotesWrapper>
              <button
                onClick={() => {
                  history.push(`/quotes/${member}?enquiryId=${enquiryId}`);
                }}
              >
                View Quotes {">"}
              </button>
            </ViewQuotesWrapper>
          </Container>
        </Popup>
      </PopupWrapper>
    );
};

export default BMI;
export const ViewQuotesWrapper = styled.div`
  text-align: center;
  margin-top: 12px;
  & button {
    color: #c72229;
    display: inline-block;
    border-bottom: 1px dashed #c72229;
  }
`;
export const PopupWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
`;
export const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  box-shadow: rgb(0 0 0 / 50%) 0px 5px 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  max-width: 400px;
  border-radius: 8px;

  @media (max-width: 767px) {
width: 100%;
    max-width: 320px;
    padding:15px;
   
  }
`;
export const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 12px;
  top: 12px;
  border: 1px solid #dce2ea;
  border-radius: 50%;
  font-size: 14px;
  & i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export const Container = styled.div`
  padding: 40px 50px;

  
  & p {
    font-weight: 100;
  }
  & span {
    text-transform: capitalize;
    font-weight: 600;
  }

  @media(max-width: 767px){
    padding:12px 16px;
    width:95%;
  
  }
`;
export const ButtonWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  margin-top: 30px;

  & button {
    padding: 5px 20px;
    background: #c72229;
    color: #fff;
    border-radius: 8px;
    display: inline-block;
  }
`;
