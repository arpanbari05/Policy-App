import React, { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { premiumFilterCards, setFilters } from "../../quotePage.slice";
import useOutsideClick from "../../../../customHooks/useOutsiteClick";
import Modal from "../../../../components/Common/Modal";
import "styled-components/macro";
import { CustomRadio } from "./MoreFilter";

const Premium = ({
  setExpandSelected,
  premiumFilter,
  selected,
  setSelected,
}) => {
  const dispatch = useDispatch();

  const [premium, setPremium] = useState(selected);

  const premiumRef = useRef();

  useOutsideClick(premiumRef, () => setExpandSelected(""));

  return (
    <Modal>
      <div
        ref={premiumRef}
        css={`
          position: absolute;
          top: 133%;
          left: 0;
          z-index: 99;
        `}
      >
        <div>
          <div className="top_d" style={{ width: 454 }}>
            <div className="avatar-large me"></div>
            <div
              className="x-touch"
              onClick={event => {
                //   document.querySelector(".email1").classList.remove("expand1");
                setExpandSelected("");
                event.stopPropagation();
              }}
            >
              <div className="x">
                <div className="line1"></div>
                <div className="line2"></div>
              </div>
            </div>
          </div>
          <div
            className="bottom_d"
            style={{ width: 454, paddingRight: "17px", paddingLeft: "17px" }}
          >
            <form>
              <Row style={{ margin: "auto" }}>
                <Col md={10} className="product_title_p_bor_pop">
                  <p className="multi_text">Premium</p>
                </Col>

                <Col md={12}>
                  <hr className="hr_width_pop" />
                </Col>
                {premiumFilter?.map(item => (
                  <Col
                    md={6}
                    css={`
                      padding-right: 9px !important;
                      padding-left: 9px !important;
                    `}
                  >
                    {/* <div
                      className="inputGroup"
                      onClick={() => setPremium(item)}
                    >
                      <input
                        id={item.code}
                        name="radio"
                        type="radio"
                        checked={premium === item}
                      />
                      <label
                        htmlFor={item.code}
                        style={{
                          background: "transparent",
                          border: "1px solid #d2d8e2",
                        }}
                      >{`₹ ${item.display_name}`}</label>
                    </div> */}
                    <CustomRadio
                      //  label={"₹ " + item.display_name}
                      label={item.display_name}
                      isSelected={premium === item}
                      onClick={() => setPremium(item)}
                    />
                  </Col>
                ))}

                <Col md={12} className="text-center">
                  <button
                    className="btn btn_brd_grey"
                    onClick={e => {
                      setExpandSelected("");
                      e.stopPropagation();
                      e.preventDefault();
                      setSelected(premium);
                      dispatch(setFilters({ premium }));
                      dispatch(premiumFilterCards(premium));
                    }}
                    style={{ borderRadius: "2px" }}
                  >
                    Apply
                  </button>

                  {/* <button
                    className="btn btn_brd_grey ml-4"
                    onClick={e => {
                      setExpandSelected("");
                      e.stopPropagation();
                      e.preventDefault();
                      setSelected({ display_name: "Please Select Premium" });
                      dispatch(setFilters({ premium: "" }));
                      dispatch(premiumFilterCards(""));
                    }}
                  >
                    Reset
                  </button> */}
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Premium;
