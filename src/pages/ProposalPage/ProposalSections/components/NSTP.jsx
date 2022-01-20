import styled from "styled-components";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setShowNSTP } from "../ProposalSections.slice";
import { useHistory } from "react-router";
import useUrlQuery from "../../../../customHooks/useUrlQuery";

const NSTP = () => {
  const { showNSTP, mediUnderwritting } = useSelector(
    state => state.proposalPage,
  );

  const { proposerDetails } = useSelector(state => state.greetingPage);

  const dispatch = useDispatch();
  if (!showNSTP || !mediUnderwritting) return <></>;
  if (showNSTP && mediUnderwritting)
    return (
      <PopupWrapper>
        <Popup>
          <CloseButton
            onClick={() => {
              dispatch(setShowNSTP(false));
            }}
          >
            <i className="fa fa-close"></i>
          </CloseButton>
          <Container>
            <p>
              Hello {proposerDetails?.name?.split(" ")[0]}! Your policy will be
              issued by Insurance company after medical underwriting. There
              might be medical check-up required before issuance of policy. Our
              Team will keep you updated on the progress
            </p>
            <ButtonWrapper>
              <button
                onClick={() => {
                  dispatch(setShowNSTP(false));
                }}
              >
                OK
              </button>
            </ButtonWrapper>
          </Container>
        </Popup>
      </PopupWrapper>
    );
};

export default NSTP;
const ViewQuotesWrapper = styled.div`
  text-align: center;
  margin-top: 12px;
  & button {
    color: #c72229;
    display: inline-block;
    border-bottom: 1px dashed #c72229;
  }
`;
const PopupWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999;
`;
const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  box-shadow: rgb(0 0 0 / 50%) 0px 5px 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  max-width: 500px;
  border-radius: 8px;

  @media (max-width: 767px) {
    width: 100%;
    max-width: 320px;
    padding: 15px;
  }
`;
const CloseButton = styled.button`
  width: 26px;
  height: 26px;
  position: absolute;
  right: 12px;
  top: 12px;
  border: 1px solid #dce2ea;
  border-radius: 50%;
  font-size: 16px;
  & i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const Container = styled.div`
  padding: 60px 50px 30px;
  & p {
    font-weight: 400;

    font-size: 20px;
  }
  & span {
    text-transform: capitalize;
    font-weight: 600;
  }

  @media (max-width: 767px) {
    padding: 14px 16px;
    width: 95%;
    & p {
      font-weight: 400;

      font-size: 18px;
      line-height: 1.4;
    }
  }
`;
const ButtonWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  margin-top: 30px;

  & button {
    padding: 14px 40px;
    background: #c72229;
    color: #fff;
    border-radius: 8px;
    display: inline-block;
    font-size: 18px;
  }
`;
