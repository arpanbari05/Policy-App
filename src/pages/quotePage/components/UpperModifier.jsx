import { useState } from "react";
import styled from "styled-components";
import PlanTypeFilter from "./filters/PlanTypeFilter";
import EditMemberFilter from "./filters/EditMemberFilter";
import ShareQuoteModal from "../../../components/ShareQuoteModal";

const UpperModifier = () => {

const [showShareQuoteModal, setShowShareQuoteModal] = useState(false);

  return (
    <>
    <UpperModifierWrapper>
      <div className="container d-flex justify-content-between align-items-center py-3">
        <div className="left_modifiers  d-flex align-items-center">
          <EditMemberFilter />
          <span className="plans_for plans_for_members active position-relative">
            Self,Spouse <div className="active_bar"></div>
          </span>
          <span className="plans_for plans_for_members">
            Father,Mother <div className="active_bar"></div>
          </span>
        </div>

        <div className="right_midifiers d-flex justify-content-between align-items-center ">
          <button className="btn share_Quote_btn" onClick={() => setShowShareQuoteModal(true)}>
            <i class="fas fa-share"></i> Share Quote
          </button>
          <PlanTypeFilter />
        </div>
      </div>
    </UpperModifierWrapper>

{/* modal */}
    <ShareQuoteModal
      show={showShareQuoteModal}
      handleClose={() => setShowShareQuoteModal(false)}
    />
    </>
  );
};

export default UpperModifier;

const UpperModifierWrapper = styled.div`
  background-color: #eaeef2;
  .left_modifiers {
    font-size: 20px;
    font-family: Inter;
    .plans_for {
      margin-right: 15px;
      cursor: pointer;
    }
    .plans_for_editable {
      font-weight: bold;
    }
    .plans_for_members {
      font-weight: 500;
      width: fit-content;
      text-align: center;
    }
    .plans_for_members.active {
      color: #0a87ff;
      background-color: white;
      border-radius: 27px;
      padding: 3px 10px;
      & .active_bar {
        width: 90%;
        bottom: -16px;
        left: 50%;
        transform: translateX(-50%);
        height: 5px;
        background-color: #0a87ff;
        position: absolute;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
    }
  }

  .right_midifiers {
    .btn {
      background-color: white;
      margin-left: 7px;
      border-radius: 31px;
      font-weight: 500;
    }
    .share_Quote_btn {
      border: solid 2px #0a87ff;
      color: #0a87ff;
    }
  }
`;



