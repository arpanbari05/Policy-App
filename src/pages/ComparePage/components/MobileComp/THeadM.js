import { useState, useEffect } from "react";
import PlanContainerM from "./PlanContainerM";
import PlanContainer from "../PlanContainer/PlanContainer";

// import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { requestDownload, requestDownloadSuccess } from "../../compare.slice";
import { useDispatch, useSelector } from "react-redux";

import PlansDetailsMobile from "../MobileComp/PlanDetailsMobile";
// import { overflow } from "html2canvas/dist/types/css/property-descriptors/overflow";
const plansDataset = (plans, removePlan, setShowM, setShowBuyNowPopup) => {
  console.log("closjwns", plans);
  const containerArray = [];
  for (let i = 0; i < 2; i++) {
    containerArray.push(
      <PlanContainerM
        setShowM={setShowM}
        removePlan={removePlan}
        plans={plans[i]?.data || undefined}
        index={i}
        setShowBuyNowPopup={setShowBuyNowPopup}
      />,
    );
  }

  return containerArray;
};

const THeadM = ({
  setshowDiffCbx,
  showDiffCbx,
  plans,
  removePlan,
  setShowM,
  setShowBuyNowPopup,
}) => {
  const [scroll, setScroll] = useState(false);
  const dispatch = useDispatch();
  const { downloading } = useSelector(state => state.comparePage);

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

  //   const download = () => {
  //     const input = document.getElementById("printCompare");
  //     html2canvas(input).then(canvas => {
  //       const componentWidth = input.offsetWidth;
  //       const componentHeight = input.offsetHeight;

  //       const orientation = componentWidth >= componentHeight ? "l" : "p";

  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF({
  //         orientation,
  //         unit: "px",
  //       });

  //       pdf.internal.pageSize.width = componentWidth;
  //       pdf.internal.pageSize.height = componentHeight;

  //       pdf.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
  //       pdf.save("download.pdf");
  //       dispatch(requestDownloadSuccess());
  //     });

  // console.log("====", width);
  return (
    
    <thead
      style={{
        display: "flex",
        marginTop:'20px',
        alignItems: "center",
        alignItems: "stretch",
        justifyContent: "space-evenly",
        flexWrap: "nowrap",
      }}
    >
      {plansDataset(plans, removePlan, setShowM, setShowBuyNowPopup)}
    </thead>
  );
};

export default THeadM;
