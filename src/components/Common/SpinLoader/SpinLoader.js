import React from "react";
import "./Loader.scss";

const SpinLoader = ({ style = {},proposalpage }) => {
  return (
    <div className="loader" style={style}>
      <div className={!proposalpage?"spinner":"proposal"}
  
      >
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
};

export default SpinLoader;
