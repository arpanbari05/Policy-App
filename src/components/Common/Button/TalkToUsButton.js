import React from "react";
import call from "./../../../assets/images/call.png";


const TalkToUsButton = ({ setShowTalkModal, showTalkModal }) => {
  return (
    <div
      id="mybutton"
      className="feature-block-three trigger_call display-none-at_992"
      data-original-title=""
      title=""
      onClick={() => setShowTalkModal(!showTalkModal)}
    >
      <div
        className="icon-box icon-three"
        style={{ backgroundColor: "#ffc14e" }}
      >
        <img src={call} alt="btn" style={{ width: 50 }} />
      </div>
    </div>
  );
};

export default TalkToUsButton;
