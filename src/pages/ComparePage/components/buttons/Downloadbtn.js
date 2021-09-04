import React from "react";
import print from "../../../../assets/images/print.png";
const Downloadbtn = ({ onClick, downloading }) => {
  return (
    <button
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
    </button>
  );
};

export default Downloadbtn;
