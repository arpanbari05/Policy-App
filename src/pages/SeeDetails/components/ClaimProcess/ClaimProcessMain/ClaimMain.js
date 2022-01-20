import React, { useState } from "react";

import cashlessImg from "../../../../../assets/images/cashless_m.png";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import { useTheme } from "../../../../../customHooks";
const claimBtn = (
  title,
  id,
  handleClick,
  activeBtn,
  PrimaryColor,
  SecondaryShade,
) => {
  return (
    <a
      onClick={() => handleClick(id)}
      // className={`nav-link claim  font-weight-bold rounded-0 border ${
      //   activeBtn === id && "active"
      // }`}
      css={`
        padding: 10px 20px;
        background-color: ${activeBtn === id ? PrimaryColor : SecondaryShade}};
        color: ${activeBtn === id ? "white" : "#000;"};
        margin-right: 12px;
        border-radius: 37px;
        &:hover {
          color: ${activeBtn === id ? "white" : "#000;"};
        }
        box-shadow: ${activeBtn === id && "0 3px 6px 0 rgba(0, 0, 0, 0.16)"};
        position: relative;
        &:after {
          content: "";
          display: ${activeBtn !== id && "none"};
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          top: 100%;
          width: 0;
          height: 0;
          border-left: 9px solid transparent;
          border-right: 9px solid transparent;
          border-top: 15px solid ${PrimaryColor};
        }
      `}
    >
      {title}
    </a>
  );
};
const claimContent = (
  title,
  description,
  id,
  image,
  activeBtn,
  activeDelayedBtn,
) => {
  return (
    <div
      className={`tab-pane fade  py-5 ${activeBtn === id && "show"} ${
        activeDelayedBtn === id && "active"
      }`}
      css={`
        padding-top: 25px !important;
      `}
    >
      {/* <img src={image} style={{ width: "110px" }} /> */}
      <h2
        className="text-left cashless_t_r_t_main"
        css={`
          color: #253858;
          font-weight: 900;
          font-size: 23px;
        `}
      >
        {title}
      </h2>
      <Paragraph
        className="leade_p"
        css={`
          color: #253858;
        `}
        style={{
          whiteSpace: "normal",
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      ></Paragraph>
    </div>
  );
};

const description =
  "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.";

const ClaimMain = ({ claimProccess }) => {
  const { colors } = useTheme();

  const [activeBtn, setActiveBtn] = useState(1);
  const [activeDelayedBtn, setActiveDelayedBtn] = useState(1);

  console.log("claim", claimProccess);

  const handleClick = id => {
    setActiveBtn(id);
    setTimeout(() => setActiveDelayedBtn(id), 500);
  };
  return (
    <>
      <div>
        <h2
          css={`
            color: #253858;
            font-weight: 900;
            font-size: 23px;
            margin-bottom: 24px;
          `}
        >
          How do I file a claim?
        </h2>
      </div>
      {/* <p className="color_gray_sub mb-15 title_h4_title_claim claimProcessMain__p">
				Loreum ipsum site visit
			</p> */}
      <div css={``}>
        {/* ============================================================ */}
        <ul
          css={`
            padding: 0;
          `}
        >
          <li
            className="nav-item flex-sm-fill"
            style={{
              display: "flex",
            }}
          >
            {claimBtn(
              "Cashless Claim",
              1,
              handleClick,
              activeBtn,
              colors.primary_color,
              colors.secondary_shade,
            )}
            {claimBtn(
              "Documents Required",
              2,
              handleClick,
              activeBtn,
              colors.primary_color,
              colors.secondary_shade,
            )}
            {claimBtn(
              "Reimbursement Claim",
              3,
              handleClick,
              activeBtn,
              colors.primary_color,
              colors.secondary_shade,
            )}
          </li>
        </ul>
        {/* ============================================================ */}
        <div
          className="tab-content"
          css={`
            margin-left: 10px;
            font-family: "Inter-Regular" !important;
            & p {
              margin: 0px;
            }
          `}
        >
          {claimContent(
            "Cashless Claim",
            claimProccess?.cashless_claim || "No data available",
            1,
            cashlessImg,
            activeBtn,
            activeDelayedBtn,
          )}
          {claimContent(
            "Document Required",
            claimProccess?.document_required || "No data available",
            2,
            cashlessImg,
            activeBtn,
            activeDelayedBtn,
          )}
          {claimContent(
            "Reimbursement Claim",
            claimProccess?.reimbursement_claim || "No data available",
            3,
            cashlessImg,
            activeBtn,
            activeDelayedBtn,
          )}
        </div>
        {/* ============================================================ */}
      </div>
    </>
  );
};

export default ClaimMain;

const Paragraph = styled.p`
  & u {
    color: black;
    line-height: 4;
  }
  & a {
    color: blue;
  }
`;
