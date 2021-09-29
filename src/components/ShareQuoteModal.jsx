import { Modal } from "react-bootstrap";
import "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import EmailIcon from "../assets/svg-icons/EmailIcon";
import WhtsappIcon from "../assets/svg-icons/WhtsappIcon";
import SmsIcon from "../assets/svg-icons/SmsIcon";
import styled from "styled-components";
import { useRef, useState } from "react";
import { EmailSent } from "../pages/ComparePage/ComparePage.style";

const ShareQuoteModal = ({ show, handleClose, imageSend, emailStatus }) => {
  const details4autopopulate = useSelector(({greetingPage}) => greetingPage.proposerDetails);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState(details4autopopulate?.email?details4autopopulate.email:"");
  const [wtsappNo, setWtsappNo] = useState(details4autopopulate?.mobile?details4autopopulate.mobile:"");
  const [smsNo, setSmsNo] = useState(details4autopopulate?.mobile?details4autopopulate.mobile:"");
  const sendRef = useRef();
  

  const  handleNumberCheck = (e, setAction) => {
    e.preventDefault();
    if(Number(e.target.value.length) <= 10){
      if(![0,1,2,3,4,5,6].includes(Number(e.target.value[0]))){
        return setAction(e.target.value);
      }
     
    } 
    
  }

  const handleSendViaEmail = (e) => {
    e.preventDefault();
    
    const validator =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    if (!email) {
      return setErrorMsg("Enter email to send.");
    } else if (!validator.test(email)) {
      return setErrorMsg("Enter valid email.");
    } else setErrorMsg("");
   
    if (!errorMsg && email) {
      setIsSending(true);
      return imageSend(email);
      
    }
  };
  // if(emailStatus){
  //   setIsSending(false);
  // 
console.log("semding....",isSending)
  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      css={`
        .modal-dialog {
          max-width: 650px !important;
        }

        .modal-footer {
          padding: 0px !important;

          border-top: none !important;
        }
        .modal-footer > * {
          margin: 0px !important;
        }
      `}
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#f5f7f9",
        }}
      >
        <Modal.Title
          style={{
            fontSize: "20px",
            fontWeight: "600",
            color: "black",
          }}
        >
          Hi, please choose the way you wish to share the quotes.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <ShareOption className="d-flex align-items-center justify-content-between  mb-3">
            <div className="d-flex align-items-center">
              <div className="icon_wrapper">
                <EmailIcon width="21" />
              </div>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                value={email}
              />
            </div>

            <button
              className="btn share_btn px-5"
              onClick={(e) => {
                
                handleSendViaEmail(e);
              }}
            >
              Share
              {isSending ? (
                  <i
                    className="fa fa-circle-notch rotate"
                    css={`
                      margin-left: 1rem;
                    `}
                  />
                ) : null}
            </button>
          </ShareOption>

          <ShareOption className="d-flex mb-3 align-items-center justify-content-between ">
            <div className="d-flex align-items-center">
              <div className="icon_wrapper">
                <WhtsappIcon width="21" />
              </div>
              <input
                type="number"
                onChange={(e) => handleNumberCheck(e,setWtsappNo)}
                placeholder="Mobile no."
                value={wtsappNo}
              />
            </div>

            {Number(wtsappNo.length) === 10 ? (
              <button className="btn share_btn px-5">Share </button>
            ) : (
              <a
                target="_blank"
                ref={sendRef}
                rel="noreferrer"
                href={`https://api.whatsapp.com/send?phone=91${wtsappNo}&text=${window.location.href}`}
              >
                <button className="btn share_btn px-5">Share </button>
              </a>
            )}
          </ShareOption>

          <ShareOption className="d-flex mb-3 align-items-center justify-content-between ">
            <div className="d-flex align-items-center">
              <div className="icon_wrapper">
                <SmsIcon width="21" />
              </div>
              <input type="number" placeholder="Mobile no." onChange={(e) => handleNumberCheck(e,setSmsNo)}
                placeholder="Mobile no."
                value={smsNo} />
            </div>

            <button className="btn share_btn px-5">Share</button>
          </ShareOption>
        
          <InfoMessage className="p-3 text-center">
            * Please note that the premium may vary in future.
          </InfoMessage>
          {errorMsg ? (
            <div className="text-center text-danger">{errorMsg}</div>
          ) : (
            ""
          )}
          {emailStatus  && (
         <EmailSent status={emailStatus.status}>
          
              {emailStatus.message}
            </EmailSent>
        
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShareQuoteModal;

const ShareOption = styled.div`
  border-radius: 10px;
  border: solid 1px #d5dce5;
  padding-left: 10px;
  input {
    border: none;
    margin-left: 15px;
    font-weight: 600;
    :focus {
      outline: none;
    }
    ::placeholder {
      color: #b0b0b0;
    }
  }
  .share_btn {
    border-radius: 4px;
    padding: 15px 10px;
    background-color: #0a87ff;
    border: solid 2px #0a87ff;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
  }
  .icon_wrapper {
    width: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 42px;
    border-radius: 100%;
    background-color: #e6f3ff;
    color: #52aaff;
  }
`;

const InfoMessage = styled.div`
  background-color: #f1f3f8;
  font-weight: 600;
  color: #778291;
  font-size: 13px;
`;
