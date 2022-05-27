import { useState } from "react";
import styled from "styled-components/macro";
import { useTheme } from "../../../../../customHooks";

export const claimBtn = (
  title,
  id,
  handleClick,
  activeBtn,
  primaryColor,
  secondaryShade,
) => {
  return (
    <span
      onClick={() => handleClick(id)}
      css={`
        padding: 10px 20px;
        background-color: ${activeBtn === id ? primaryColor : secondaryShade}};
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
          border-top: 15px solid ${primaryColor};
        }
      `}
    >
      {title}
    </span>
  );
};

export const claimContent = (
  title,
  description,
  id,
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

const ClaimMain = ({ claimProccess }) => {
  const { colors } = useTheme();

  const [activeBtn, setActiveBtn] = useState(1);

  const [activeDelayedBtn, setActiveDelayedBtn] = useState(1);

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
            activeBtn,
            activeDelayedBtn,
          )}
          {claimContent(
            "Document Required",
            claimProccess?.document_required || "No data available",
            2,
            activeBtn,
            activeDelayedBtn,
          )}
          {claimContent(
            "Reimbursement Claim",
            claimProccess?.reimbursement_claim || "No data available",
            3,
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
