import React from "react";
import "styled-components/macro";
import { useTheme } from "../../../customHooks";
import { mobile } from "../../../utils/mediaQueries";

const JourneyCard = ({ title, link }) => {
  const { colors } = useTheme();

  return (
    <div
      css={`
        text-align: center;
        border: 2px solid ${colors.primary_color};
        width: 100%;
        border-radius: 20px;
        box-sizing: border-box;
        padding: 20px;
        margin: 15px 0;
        background: #fff;
        transition: all 500ms;
        animation: fadeIn 2000ms normal ease-out;

        ${mobile} {
          width: 90% !important;
          margin: 10px auto;
          padding: 15px;
          border-radius: 10px;
        }

        &:hover {
          background: ${colors.primary_shade};
          box-shadow: 0px 0px 30px ${colors.primary_shade};
          transform: scale(1.05);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.2);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}
      onClick={window.location.assign.bind(null, link)}
    >
      <h1
        css={`
          @import url("https://fonts.googleapis.com/css?family=Raleway");
          font-family: "Raleway", sans-serif;
          font-size: 34px;
          ${mobile} {
            font-size: 20px;
            color: ${colors.primary_color};
          }
        `}
      >
        {title}
      </h1>
    </div>
  );
};

export default JourneyCard;
