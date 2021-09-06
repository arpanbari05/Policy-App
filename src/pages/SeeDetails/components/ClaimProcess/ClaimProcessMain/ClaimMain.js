import React, { useState } from "react";

import cashlessImg from "../../../../../assets/images/cashless_m.png";
import styled from "styled-components/macro";

const claimBtn = (title, id, handleClick, activeBtn) => {
  return (
    <a

      onClick={() => handleClick(id)}
      className={`nav-link claim  font-weight-bold rounded-0 border ${activeBtn === id && "active"
        }`}
      css={`
      width:170px !important;
        &:after{
bottom:-18px !important;
        }`}
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
      className={`tab-pane fade  py-5 ${activeBtn === id && "show"} ${activeDelayedBtn === id && "active"
        }`}
      css={`
        padding-top:25px !important `}
    >
      <img src={image} style={{ width: "110px" }} />
      <h3 className="text-left cashless_t_r_t_main" style={{ marginBottom: "0px" }}>{title}</h3>
      <Paragraph
        className="leade_p"
        style={{
          textAlign: "justify",
          whiteSpace: "normal"
        }}
        dangerouslySetInnerHTML={{ __html: description }}
      ></Paragraph>
    </div>
  );
};

const description =
  "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.";

const ClaimMain = ({ claimProccess }) => {
  const [activeBtn, setActiveBtn] = useState(1);
  const [activeDelayedBtn, setActiveDelayedBtn] = useState(1);

  console.log("claim", claimProccess);

  const handleClick = id => {
    setActiveBtn(id);
    setTimeout(() => setActiveDelayedBtn(id), 500);
  };
  return (
    <>
      <div className="plan_a_t_claim">
        <h2 className="title_h4 title_h4_title_claim">
          How do I file a claim?
        </h2>
      </div>
      {/* <p className="color_gray_sub mb-15 title_h4_title_claim claimProcessMain__p">
				Loreum ipsum site visit
			</p> */}
      <div
        className=" p-5 rounded shadow mb-5"
    
      >
        {/* ============================================================ */}
        <ul className="nav nav-tabs nav-pills with-arrow flex-column flex-sm-row text-center">
          <li className="nav-item flex-sm-fill" style={{
            display: 'flex',
            
          }}>
            {claimBtn("Cashless Claim", 1, handleClick, activeBtn)}
            {claimBtn("Documents Required", 2, handleClick, activeBtn)}
            {claimBtn("Reimbursement Claim", 3, handleClick, activeBtn)}
          </li>
        </ul>
        {/* ============================================================ */}
        <div className="tab-content">
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
