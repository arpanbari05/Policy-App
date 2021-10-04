import { useState } from "react";
import { useSelector } from "react-redux";
import filterImage from "../../../../assets/images/filter.png";
import saveImage from "../../../../assets/images/save.png";
import ShareQuoteModal from "../../../../components/ShareQuoteModal";
import "./filterFooter.css"
export function MobileQuoteFilterFooter({
  setShowTalkModal,
  handleFilterClick = () => {},
  sendQuote,
}) {
  const successMsg = useSelector(({comparePage}) => comparePage.emailStatus)
  const [showShareQuoteModal, setShowShareQuoteModal] = useState(false);
  return (
    <div className="mobileViewStaticChat  hidden-lg">
      <div className="nw-chat-card">
        <div className="chat-div-containers">
          <button
            className="btn btn_recommend_plan_btn"
            data-toggle="modal"
            data-target="#mb-3-w"
            style={{ cursor: "pointer" }}
          >
            Recommend a Plan&nbsp;&nbsp; <i className="fa fa-angle-right"></i>
          </button>
        </div>


        <div
      
          className="chat-div-containers"
        >
          <a     onClick={() => {
            setShowTalkModal(true);
          }} data-toggle="modal" data-target="#myModal">
            <div className="nw-img-with-content">
              <img
                style={{ width: 24, marginLeft: 12 }}
                src={saveImage}
                alt="save-icon"
              />
            </div>
            <span className="clr_span_footer_fixed">Talk&nbsp;to&nbsp;Us</span>
          </a>
        </div>
        <div className="chat-div-containers">
          <div onClick={() => handleFilterClick()}>
            <div className="nw-img-with-content">
              <img style={{ width: 24 }} src={filterImage} alt="filter-icon" />
            </div>
            <span className="clr_span_footer_fixed">Filter</span>
          </div>
        </div>
        <div className="chat-div-containers">
          <span>
            <div className="nw-img-with-content"
             onClick={() => setShowShareQuoteModal(true)}
            >
              {/* <img style={{ width: 24 }} src={filterImage} alt="filter-icon" /> */}
              <i class="fas fa-share" style={{marginTop:"3px",color:"#bbbcbc",backgroundColor:"#eef1f5",padding:"5px",borderRadius:"50px"}}></i>
            </div>
            <span className="clr_span_footer_fixed">share</span>
          </span>
        </div>

          {/* modal */}
      <ShareQuoteModal
        show={showShareQuoteModal}
        handleClose={() => setShowShareQuoteModal(false)}
        imageSend={sendQuote}
        emailStatus={successMsg}
      />
      </div>
      <div className="nw-cht-border-btn"></div>
    </div>
  );
}
