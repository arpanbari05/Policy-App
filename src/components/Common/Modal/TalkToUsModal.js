import React from "react";
import { Col, Row } from "react-bootstrap";
import TalkToUsModalMobile from "./TalkToUsModalMobile";

const TalkToUsModal = ({ showTalkModal, setShowTalkModal }) => {
  return (
    <>
      <div
        className="popover-markup popover-talk-to-us bs-popover-left display-none-at_992"
        style={{
          display: ` ${showTalkModal ? "block" : "none"}`,
          willChange: "transform",
          transform: `translate3d(887px, 126px, 0px)`,
          top: 0,
          left: 0,
        }}
        role="tooltip"
      >
        {/* <!-- <div className="head hide">Lorem Ipsum II</div> --> */}
        <div className="arrow" style={{ top: 189 }}></div>
        <div
          style={{ padding: "2px 0", width: 369 }}
          className="content_call hide popover-body"
        >
          <div className="modal-content">
            <div className="modal-header" style={{ borderBottom: "none" }}>
              <p className="text-black p_modal_header p_talk_p_s">Talk to Us</p>
              <button
                type="button"
                className="close close_btn_p_f"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowTalkModal(false)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <div className="modal-body">
              <div id="dialog">
                <h3 className="get_call_back_p">Get a Call back</h3>
                <h3 className="mobile_number_p">Mobile No.</h3>
                <div>
                  <br />
                  <input
                    type="text"
                    className=" form__field"
                    placeholder="Enter your mobile number"
                    style={{ width: "100%", marginLeft: 0 }}
                  />
                  <p className="text-black p_txt_p_s_91_quote">+91 | </p>
                </div>
                <div id="form" style={{ marginTop: -23 }}>
                  <a
                    href="#"
                    data-toggle="modal"
                    data-target="#otp_m"
                    data-toggle-className="fade-up"
                    data-toggle-className-target="#animate"
                  >
                    <button className="btn btn-primary btn-embossed call_me_quote">
                      Call me
                    </button>
                  </a>
                </div>
                <p className="text-center">Get Help online! chat with us</p>
                <Row>
                  <Col md={4}>&nbsp;</Col>
                  <Col md={4}>
                    <button className="btn button_being_chat">
                      Begin chat
                    </button>
                  </Col>
                  <Col md={4}>&nbsp;</Col>
                </Row>
                <Row>
                  <Col xs={12} className="text-center super_u_bg">
                    <p className="text-center">
                      Super Urgent? Call us on our Toll Free numbers
                    </p>
                    <p className="text-center text-black font_family_bold_quote">
                      1234&nbsp;999&nbsp;0799
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="footer hide">test</div> */}
      </div>
      <TalkToUsModalMobile
        showTalkModal={showTalkModal}
        setShowTalkModal={setShowTalkModal}
      />
    </>
  );
};

export default TalkToUsModal;
