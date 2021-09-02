import styled from "styled-components";
import PencilIcon from "../../../assets/images/svg-icons/PencilIcon";

const UpperModifier = () => {
  return (
    <UpperModifierWrapper>
      <div className="container d-flex justify-content-between align-items-center py-3">
        <div className="left_modifiers  d-flex align-items-center">
          <span className="plans_for plans_for_editable d-flex align-items-center">
            <div className="yellow_start_line"></div>Plans For
            <PencilWrapper className="d-flex justify-content-center align-items-center">
              <PencilIcon
                style={{
                  color: "#0a87ff",
                }}
                width="14px"
              />
            </PencilWrapper>
          </span>
          <span className="plans_for plans_for_members active position-relative">
            Self,Spouse <div className="active_bar"></div>
          </span>
          <span className="plans_for plans_for_members">
            Father,Mother <div className="active_bar"></div>
          </span>
        </div>

        <div className="right_midifiers d-flex justify-content-between align-items-center ">
          <button className="btn share_Quote_btn">
            <i class="fas fa-share"></i> Share Quote
          </button>
          <button className="btn select_plan_btn d-flex align-items-center">
            Base Health{" "}
            <DownArrowWrapper>
              <i class="fas fa-chevron-down"></i>
            </DownArrowWrapper>
          </button>
        </div>
      </div>
    </UpperModifierWrapper>
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

const PencilWrapper = styled.div`
  background-color: white;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin: 0px 5px;
`;

const DownArrowWrapper = styled.div`
  background-color: #eff7ff;
  color: #0a87ff;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin: 0px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
