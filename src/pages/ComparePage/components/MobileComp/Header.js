import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import print from "../../../../assets/images/printMobile.png";
import html2canvas from "html2canvas";
import shareSvgIcon from "../../../../assets/svg/share-icon";
import jsPDF from "jspdf";
import { requestDownload, requestDownloadSuccess } from "../../compare.slice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useUrlQuery from "../../../../customHooks/useUrlQuery";
import CardModal from "../../../../components/Common/Modal/CardModal";
import mail from "../../../../assets/images/mail.png";
import whatsapp from "../../../../assets/images/whatsapp.png";

const MobileHeader = ({
  emailStatus,
  imageSend,
  sendContent,
  groupCode,
  path,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const urlQueries = useUrlQuery();
  const enquiryID = urlQueries.get("enquiryId");
  const { downloading } = useSelector(state => state.comparePage);
  const { proposerDetails } = useSelector(state => state.greetingPage);
  const [email, setEmail] = useState();
  const sendRef = useRef();
  const [send, setSend] = useState(false);
  const [shareState, setShareState] = useState(false);
  const download = () => {
    const input = document.getElementById("printCompareM");
    html2canvas(input).then(canvas => {
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
  return (
    <StyledHeader>
      <a style={{color: 'white'}}
        className="first-container"
        onClick={() => {
          history.push({
            pathname: `${path}/${groupCode}`,
            search: `enquiryId=${enquiryID}`,
          });
        }}
      >
        <i class="fas fa-arrow-circle-left"></i>
        <span> Compare Plan</span>
      </a>
      <span className="second-container">
        <Link
          // onClick={() => {
          //   dispatch(requestDownload());
          //   download();
          // }}
        >
        <span style={{
          fontSize:"30px"
        }}>
          <i class="bi bi-printer"></i>
          </span>
        </Link>

        <Link>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span onClick={() => setShareState(!shareState)}>
              {shareSvgIcon()}
            </span>

            <Styledul
              class="submenu"
              style={shareState ? { display: "block" } : { display: "none" }}
            >
              <li>
                <button
                  onClick={() => {
                    // setShareState(false);
                    // setSend("email");
                  }}
                  className="btn"
                >
                 <i class="far fa-envelope"></i>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    // setShareState(false);
                    // setSend("whatsapp");
                  }}
                  className="btn"
                >
                  <i class="fab fa-whatsapp"></i>
                </button>
              </li>
            </Styledul>
          </div>
        </Link>
      </span>
      <CardModal
        show={send}
        content={sendContent(
          send,
          proposerDetails?.name?.split(" ")[0],
          imageSend,
          email,
          setEmail,
          emailStatus,
          sendRef,
        )}
        showButton={false}
        handleClose={() => setSend(false)}
      />
    </StyledHeader>
  );
};

export default MobileHeader;
const drop = keyframes`
  from {
	  top:30px;
opacity:0;
  }

  to {
    top:60px;
	opacity:1;
  }
`;
const Styledul = styled.ul`
  position: absolute;
  animation: ${drop} 0.3s;
  opacity: 1;
  z-index: 2000;
  top: 60px;
  right:8px;
  & li {
    background-color:#0d6efd;
    border-radius: 100%;
    
    box-shadow: 0px 1px 2px grey;
    margin-bottom: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    & i {
      color: white;
    }
  }
`;
const StyledHeader = styled.div`
  display: none;
  height: 57px;
  background:#0d6efd;
  align-items: center;
  justify-content: space-between;
  & a {
    color: white;
    display: flex;
    align-items: center;
    & i {
      height: unset;
    }
  }
  & .first-container {
    & i:before {
      margin: 0 4px 0px 12px !important;
      padding: unset !important;
    }
  }
  & .second-container {
    display: flex;
    width: 25%;
    align-items: center;
    justify-content: flex-end;
    & a {
      margin-right: 20px;
    }
    & img {
      max-width: unset;
    }
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;
