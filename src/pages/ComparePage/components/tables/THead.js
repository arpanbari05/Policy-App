import { useState, useEffect } from "react";

import PlanContainer from "../PlanContainer/PlanContainer";
import CheckBox from "../Checkbox/Checbox";
import Downloadbtn from "../buttons/Downloadbtn";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { requestDownload, requestDownloadSuccess } from "../../compare.slice";
import { useDispatch, useSelector } from "react-redux";
import "styled-components/macro";
import PlansDetailsMobile from "../MobileComp/PlanDetailsMobile";
const plansDataset = (plans, removePlan, setShow, setShowBuyNowPopup) => {
  const containerArray = [];
  for (let i = 0; i < 3; i++) {
    containerArray.push(
      <th className={`${i === 2 && "showOnDesktopF"}`} scope="row" key={i}>
        <PlanContainer
          setShow={setShow}
          removePlan={removePlan}
          plans={plans[i]?.data || undefined}
          index={i}
          setShowBuyNowPopup={setShowBuyNowPopup}
        />
      </th>
    );
  }

  return containerArray;
};

const THead = ({
  setshowDiffCbx,
  showDiffCbx,
  plans,
  removePlan,
  setShow,
  setShowBuyNowPopup,
}) => {
  console.log("wwww2", plans);
  const [scroll, setScroll] = useState(false);
  const dispatch = useDispatch();
  const { downloading } = useSelector((state) => state.comparePage);

  // const checkScrollTop = () => {
  //   console.log(window.pageYOffset);
  //   if (!scroll && window.pageYOffset > 220) {
  //     setScroll(true);
  //   } else if (scroll && window.pageYOffset <= 220) {
  //     setScroll(false);
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", checkScrollTop);
  //   // return () => {
  //   window.removeEventListener("scroll");
  // };
  // }, []);

  const download2 = () => {
    const input = document.getElementById("printCompare");
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const componentWidth = input.offsetWidth;
      const componentHeight = input.offsetHeight;

      const orientation = componentWidth >= componentHeight ? "l" : "p";

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation,
        unit: "px",
      });

      pdf.internal.pageSize.width = componentWidth;
      pdf.internal.pageSize.height = componentHeight;

      pdf.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      pdf.save("download.pdf");
      dispatch(requestDownloadSuccess());
    });
  };
  const [width, setWidth] = useState(window.innerWidth);
  return (
    <thead
      id="product-comparison-header"
      style={{
        position: !scroll ? "static" : "fixed",
        top: "0",
        // boxShadow: "0px 10px 20px rgb(134 156 213 / 25%)",
      }}
    >
      <tr>
        <th scope="row">
          <div
            css={`
              display: flex;
              flex-direction: column;
              height: 145px;
              & p {
                font-size: 22px;
                color: #253858;
              }
            `}
          >
            <p>Product Comparision</p>
            <CheckBox
              checked={showDiffCbx}
              title={`Show Difference`}
              id={`show difference`}
              handleChange={(e) => {
                setshowDiffCbx(!showDiffCbx);
              }}
            />
            <Downloadbtn
              downloading={downloading}
              onClick={() => {
                dispatch(requestDownload());
                download2();
              }}
            />
          </div>
        </th>
        {plansDataset(plans, removePlan, setShow, setShowBuyNowPopup)}
      </tr>
    </thead>
  );
};

export default THead;
