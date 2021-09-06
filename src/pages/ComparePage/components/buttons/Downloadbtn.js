import React from "react";
import print from "../../../../assets/images/print.png";
import styled from 'styled-components'
const Downloadbtn = ({ onClick, downloading }) => {
  return (
    <Button
      onClick={e => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        onClick(e);
      }}
      type="button"
      className="btn  btn_preoceed_product_fix_compare"
      disabled={downloading}
    >
      <>
        {downloading ? (
          <i className="fas fa-circle-notch rotate" />
        ) : (
          <img
            src={print}
            className="img_download_compare"
            style={{ width: "30px", display: "inline-block" }}
            alt="download"
          />
        )}{" "}
        Download
      </>
    </Button>
  );
};

export default Downloadbtn;

const Button = styled.button`
border: solid 1px #70707073;
width: 136px;
margin-top: 1rem;
font-weight: 900;
padding: 6px 5px !important;
`