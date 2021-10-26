import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import "styled-components/macro";
const CoverMobile = ({
  coverFilter,
  selected,
  setSelected,
  ownCover,
  setOwnCover,
  resetPremium,
}) => {
  const { filters, selectedGroup } = useSelector((state) => state.quotePage);

  const [inputCover, setInputCover] = useState(ownCover);
  const [inputCoverError, setinputCoverError] = useState(false);
  useEffect(() => {
    if (inputCover) {
      if (inputCover <= 200000) {
        setinputCoverError("Minimum should be 2 lac");
      } else if (inputCover >= 10000000) {
        setinputCoverError("Maximum should be 1 Crore");
      } else if (inputCover % 100000 != 0) {
        setinputCoverError("Enter in multiples of 1 lac");
      } else {
        setinputCoverError(false);
      }
    } else {
      setinputCoverError(false);
      setOwnCover(inputCover);
    }
  }, [inputCover]);
  return (
    <>
      <article>
        <Row className=" mt--38">
          {coverFilter?.map((item) => (
            <Col md={6} className="padding-none">
              <div className="inputGroup">
                <input
                  id={item.code}
                  name="radio"
                  type="radio"
                  checked={selected === item?.display_name}
                />
                <label
                  className="label--before mobile-filter-label"
                  htmlFor={item.code}
                  onClick={() => {
                    setSelected(item?.display_name);
                    setOwnCover("");
                    setInputCover("");
                    setInputCover(false);
                  }}
                >
                  {item?.display_name}
                  <div className="checkbox--button"></div>
                </label>
              </div>
            </Col>
          ))}
          <Col md={12} className=" text-center">
            <p
              css={`
                @media screen and (max-width: 753px) {
                  margin-left: -25px;
                }
              `}
              className="mb-10"
            >
              OR
            </p>
          </Col>
          <Col
            md={12}
            id="myDIV"
            className="en padding-none"
            css={`
              @media screen and (min-width: 359px) and (max-width: 753px) {
                margin-left: -27px;
                width: 110%;
              }
              @media screen and (max-width: 359px) {
                min-width: 200px;
                margin-left: -27px;
              }
            `}
          >
            {/* <!-- <p className="p_title_cover">Enter value of your choice</p> --> */}
            <input
              type="text"
              placeholder="e.g. Enter your own cover"
              className="custom__cover--mobile"
              onChange={(e) => {
                setInputCover(e.target.value);
                setSelected("");
              }}
            />
            {inputCoverError && (
              <p className="formbuilder__error">{inputCoverError}</p>
            )}

            <p className="float_value custom__cover--text ">
              Enter value between 2 Lac to 1 Crore in multiples of 1 Lac{" "}
            </p>
          </Col>
        </Row>
      </article>
    </>
  );
};

export default CoverMobile;
