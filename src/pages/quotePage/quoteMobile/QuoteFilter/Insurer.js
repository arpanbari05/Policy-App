import React, { useRef, useState } from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  insurerFilter,
  saveQuotesData,
  setFilters,
} from "../../quotePage.slice";
import styled from "styled-components";
import useOutsideClick from "../../../../customHooks/useOutsiteClick";
import Modal from "../../../../components/Common/Modal";
import "styled-components/macro";
import info from "../../../../assets/images/info.png";

const Insurer = ({
  setExpandSelected,
  setSelected,
  selected = [],
  companies,
}) => {
  const data = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data,
  );

  const sortedCompanies = companies
    .filter(
      comp =>
        data?.companies[comp].insurance_types.includes("top_up") ||
        data?.companies[comp].insurance_types.includes("health") ||
        data?.companies[comp].insurance_types.includes("cancer") ||
        data?.companies[comp].insurance_types.includes("critical_illness") ||
        data?.companies[comp].insurance_types.includes("personal_accident"),
    )
    .sort((a, b) => data?.companies[b].csr - data?.companies[a].csr);

  const dispatch = useDispatch();

  const [insurer, setInsurer] = useState(selected);

  const insurerRef = useRef();

  useOutsideClick(insurerRef, () => setExpandSelected(""));

  return (
    <Modal>
      <div
        ref={insurerRef}
        css={`
          position: absolute;
          top: 133%;
          left: -10px;
          z-index: 99;
        `}
      >
        <div>
          <div
            className="top_d"
            style={{ width: "461px", height: "60px", backgroundColor: "white" }}
          >
            <StyledInsurerHead
              css={`
                display: flex;
                & img {
                  height: 23px;
                  object-fit: contain;
                  position: relative;
                  top: 3px;
                  left: 3px;
                }
              `}
            >
              Insurers{" "}
              <OverlayTrigger
                placement={"right"}
                overlay={props => (
                  <Tooltip {...props}>
                    {"Claim settled by Insurer against claims received."}
                  </Tooltip>
                )}
              >
                <img src={info} />
              </OverlayTrigger>
            </StyledInsurerHead>

            <div
              className="x-touch"
              onClick={event => {
                // document.querySelector(".email").classList.remove("expand");
                setExpandSelected("");
                event.stopPropagation();
              }}
            >
              <div
                className="x"
                style={{
                  top: "4px",
                  right: "8px",
                  zIndex: "99",
                }}
              >
                <div className="line1"></div>
                <div className="line2"></div>
              </div>
            </div>
          </div>
          <InsurerSStyledDiv className="bottom_d">
            <form>
              <Row style={{ margin: 0 }}>
                {/* <Col
                  md={10}
                  className="product_title_p_bor_pop"
                  
                >
                  <p className="multi_text">Insurers</p>
                </Col>

                <Col md={12}>
                  <hr className="hr_width_pop" />
                </Col> */}

                {sortedCompanies?.map(item => (
                  <Col md={12} key={data?.companies[item].short_name}
                    onClick={() => {
                      if (insurer.includes(data?.companies[item]))
                        setInsurer(
                          insurer.filter(
                            ins => ins !== data?.companies[item],
                          ),
                        );
                      else setInsurer([...insurer, data?.companies[item]]);
                    }}>
                    <div className="inputGroup">
                      <input
                        id={data?.companies[item].short_name}
                        name="radio"
                        type="checkbox"
                        checked={insurer.includes(data?.companies[item])}
                      />
                      <label
                        css={`
                          &:after {
                            z-index: 0 !important;
                          }
                        `}
                        htmlFor={data?.companies[item].short_name}
                        style={{
                          background: "transparent",
                          border: "1px solid #d2d8e2",
                          display: "flex",
                        }}
                      >
                        <img
                          src={data?.companies[item].logo}
                          alt="company"
                          style={{
                            width: "30px",
                            marginRight: "10px",
                            marginLeft: "10px",
                          }}
                        />
                        {data?.companies[item].short_name}{" "}
                        <span className="font_radio_span">
                          {data?.companies[item].csr}%
                        </span>{" "}
                        <span
                          className="color_csr"
                          title="Claim Settlement Ratio"
                        >
                          CSR
                        </span>
                      </label>
                    </div>
                  </Col>
                ))}

                <Col
                  md={12}
                  className="text-center"
                  style={{
                    position: "sticky",
                    bottom: "-25px",
                    backgroundColor: "white",
                    width: "100%",
                  }}
                >
                  <button
                    className="btn btn_brd_grey"
                    onClick={e => {
                      setExpandSelected("");
                      e.stopPropagation();
                      e.preventDefault();
                      // dispatch();
                      // saveQuotesData({ alias: selected, type: "filterInsurer" })
                      setSelected(insurer);
                      dispatch(setFilters({ insurers: insurer }));
                      dispatch(insurerFilter(insurer));
                    }}
                    style={{ borderRadius: "2px", marginBottom: "10px" }}
                  >
                    Apply
                  </button>
                  {/* <button
                    className="btn btn_brd_grey ml-4"
                    onClick={e => {
                      setExpandSelected("");
                      e.stopPropagation();
                      e.preventDefault();
                      // dispatch();
                      // saveQuotesData({ alias: selected, type: "filterInsurer" })
                      // setSelected({ short_name: "Please Select Insurer" });
                      dispatch(setFilters({ insurers: [] }));
                      dispatch(insurerFilter([]));
                    }}
                  >
                    Reset
                  </button> */}
                </Col>
              </Row>
            </form>
          </InsurerSStyledDiv>
        </div>
      </div>
    </Modal>
  );
};

const InsurerSStyledDiv = styled.div`
  width: 461;
  padding-right: 17px;
  padding-left: 17px;
  width: 461px;
  padding-right: 17px;
  padding-left: 17px;
  height: 60vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 2px;
  }
`;

const StyledInsurerHead = styled.p`
  padding: 15px 35px;
  width: 100%;
  &:after {
    content: "";
    height: 29px;
    width: 7px;
    position: absolute;
    left: 0px;
    top: 14px;
    background-color: #2cd44a;
    border-radius: 10px;
  }
`;

export default Insurer;
