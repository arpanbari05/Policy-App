import React from "react";
import "./Loader.scss";
import "styled-components/macro";

const SpinLoader = ({
  style = {},
  proposalpage,
  customHeight,
  customWidth,
}) => {
  return (
    <div
      className="loader"
      style={style}
      css={`
        position: ${proposalpage && "unset !important"};

        width: ${customWidth && `${customWidth} !important`};
        display: inline !important;
      `}
    >
      <div
        className={!proposalpage ? "spinner" : "proposal"}
        css={`
          height: ${customHeight} !important ;
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
