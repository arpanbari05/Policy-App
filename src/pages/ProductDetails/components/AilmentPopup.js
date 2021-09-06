import React from "react";
import { Col, Row } from "react-bootstrap";

const AilmentPopup = ({ ailmentModalOpen, setAilmentModalOpen }) => {
  return (
    <div
      id="mb-3-w"
      className="modal"
      data-backdrop="true"
      data-aos="zoom-in-right"
      style={
        ailmentModalOpen
          ? { display: "block", backgroundColor: "rgba(0, 0, 0, 0.3)" }
          : { display: "none" }
      }
    >
      <div className="modal-dialog margin_top_gh">
        <div className="modal-content box-shadow-z3">
          {/* <!-- <div className="modal-header">
              <h5 className="modal-title">Modal</h5>
            </div> --> */}
          <div className="modal-body text-center p-lg">
            <Row className="d-flex justify-content-center mt-100">
              <Col md={12}>
                <div className="card_cancer">
                  <div className="card-body_c text-center">
                    <h4 className="card-title">
                      Are you suffering from any of the below ailments
                    </h4>
                    <p className="card-description">
                      Loreum Ipsum dhsj sjdhjsh jshdj
                    </p>
                    <hr className="mb-30" />
                    <label className="check">
                      <input type="checkbox" />
                      <span>Hypertension</span>
                    </label>
                    <label className="check">
                      <input type="checkbox" />
                      <span>Diabetes</span>
                    </label>
                    <label className="check">
                      <input type="checkbox" />
                      <span>Heart ailments</span>
                    </label>
                    <label className="check">
                      <input type="checkbox" /> <span>Cancer</span>
                    </label>
                    <br />
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <button
            type="button"
            className="btn btn-white close_btn_modal_bg"
            data-dismiss="modal"
            onClick={() => {
              setAilmentModalOpen(false);
            }}
          >
            <i className="fa fa-close"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AilmentPopup;
