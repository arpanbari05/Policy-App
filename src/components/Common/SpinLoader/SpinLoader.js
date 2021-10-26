import React from "react";
import "./Loader.scss";
import "styled-components/macro";
import { useSelector } from "react-redux";
const SpinLoader = ({
  style = {},
  proposalpage,
  customHeight,
  customWidth,
  zIndexGiven,
}) => {

  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade } = theme;

  return (
    <div
      className="loader"
      style={style}
      css={`
        position: ${proposalpage && "unset !important"};

        width: ${customWidth && `${customWidth} !important`};
        display: inline !important;
        z-index: ${zIndexGiven};
      `}
    >
      <div
        className={!proposalpage ? "spinner" : "proposal"}
        css={`
          height: ${customHeight} !important ;
          &  > div {
            background-color: ${PrimaryColor};
          }
        `}
      >
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
};

export default SpinLoader;
