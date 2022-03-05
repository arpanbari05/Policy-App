import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import EmailIcon from "../assets/svg-icons/EmailIcon";
import WhtsappIcon from "../assets/svg-icons/WhtsappIcon";
import SmsIcon from "../assets/svg-icons/SmsIcon";
import styled from "styled-components";
import { useRef, useState } from "react";
import { EmailSent } from "../pages/ComparePage/ComparePage.style";
import { setEmail as setlEmaiStatus } from "../pages/ComparePage/compare.slice";
import { useTheme } from "../customHooks/index";
import ShareButton from "../components/Common/Button/ShareButton";
import { CircleLoader, Button } from "../components/index";

const ShareQuoteModal = ({
  showModal,
  imageSend,
  emailStatus,
  stage = "",
  hideBtn = false,
  label,
}) => {
  const [show, setshow] = useState(showModal);

  const {
    colors: { primary_color: PrimaryColor, primary_shade: PrimaryShade },
  } = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setlEmaiStatus(""));
    setErrorMsg("");
    //  setyShowMsgs(false)
  }, [show]);

  const details4autopopulate = useSelector(
    ({ greetingPage }) => greetingPage.proposerDetails,
  );

  const [errorMsg, setErrorMsg] = useState("");

  const [isSending, setIsSending] = useState(false);

  const [email, setEmail] = useState(
    details4autopopulate?.email ? details4autopopulate.email : "",
  );

  const [wtsappNo, setWtsappNo] = useState(
    details4autopopulate?.mobile ? details4autopopulate.mobile : "",
  );

  const [smsNo, setSmsNo] = useState(
    details4autopopulate?.mobile ? details4autopopulate.mobile : "",
  );

  const sendRef = useRef();

  // useEffect(() => {
  //   if(emailStatus.status){
  //     setIsSending(false);
  //   }
  // },[emailStatus])

  const handleNumberCheck = (e, setAction) => {
    e.preventDefault();
    if (Number(e.target.value.length) <= 10) {
      if (![0, 1, 2, 3, 4, 5].includes(Number(e.target.value[0]))) {
        return setAction(e.target.value);
      }
    }
  };

  const handleSendViaEmail = e => {
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
      // setTimeout(() => {
      //   handleRotation();
      // }, 2000);
      return imageSend(email, stage);
    }
  };

  const handleSendViaSms = e => {
    e.preventDefault();

    const validator =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

    if (!email) {
      return setErrorMsg("Enter Number to send.");
    } else if (!validator.test(email)) {
      return setErrorMsg("Enter valid number.");
    } else setErrorMsg("");

    if (!errorMsg && email) {
      setIsSending(true);
      // setTimeout(() => {
      //   handleRotation();
      // }, 2000);
      return imageSend(email, stage);
    }
  };

  const handleRotation = () => {
    setIsSending(false);
  };
  // if(emailStatus){
  //   setIsSending(false);
  //

  const handleClose = () => {
    setshow(false);
    setIsSending(false);
  };

  const handleShow = () => setshow(true);

  return (
    <>
      {!hideBtn && <ShareButton onClick={handleShow} label={label} />}
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
          // closeButton
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
            css={`
              @media (max-width: 440px) {
                font-size: 15px !important;
              }
            `}
          >
            Hi, please choose the way you wish to share the quotes.
          </Modal.Title>
          <i
            onClick={handleClose}
            style={{ cursor: "pointer" }}
            className="fas fa-times"
          ></i>
        </Modal.Header>
        <Modal.Body>
          <div
            css={`
              .icon_wrapper {
                background-color: ${PrimaryShade};
                color: ${PrimaryColor};
              }
            `}
          >
            <ShareOption
              className="d-flex align-items-center justify-content-between  mb-3 overflow-hidden"
              PrimaryColor={PrimaryColor}
            >
              <div className="d-flex align-items-center position-relative w-100">
                <div className="icon_wrapper">
                  <EmailIcon width="21" />
                </div>
                <input
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email"
                  value={email}
                  css={``}
                />
                {/* <span
                  css={`
                    position: absolute;
                    top: 50%;
                    right: 20px;
                    color: black;
                    transform: translateY(-50%) !important;
                    display: none;
                    background: #ffffff9e;
                    @media (max-width: 400px) {
                      display: ${isSending && !emailStatus.message
                        ? "block"
                        : "none"} !important;
                    }
                  `}
                >
                  <CircleLoader animation="border" />
                </span> */}
              </div>
              <Button
                css={`display: flex; 2px; align-items: center; justify-content: center; min-width: 105px !important; max-width: 105px !important;`}
                onClick={e => {
                  handleSendViaEmail(e);
                }}
                loader={isSending && !emailStatus.message}
              >
                <div>
                  <span
                    css={`
                      display: flex;
                      gap: 10px;
                      align-items: center;
                      @media (max-width: 400px) {
                        display: none;
                      }
                    `}
                  >
                    Share
                    <span
                      css={`
                        display: none;
                        @media (max-width: 400px) {
                          display: block;
                        }
                      `}
                    >
                      <i className="fas fa-share"></i>
                    </span>
                  </span>
                </div>
              </Button>
            </ShareOption>

            <ShareOption
              className="d-flex mb-3 align-items-center justify-content-between overflow-hidden"
              PrimaryColor={PrimaryColor}
            >
              <div className="d-flex align-items-center">
                <div className="icon_wrapper">
                  <WhtsappIcon width="21" />
                </div>
                <input
                  type="number"
                  onChange={e => handleNumberCheck(e, setWtsappNo)}
                  placeholder="Mobile no."
                  value={wtsappNo}
                />
              </div>

              {Number(wtsappNo.length) === 10 ? (
                <a
                  target="_blank"
                  ref={sendRef}
                  rel="noreferrer"
                  href={`https://api.whatsapp.com/send?phone=91${wtsappNo}&text=${window.location.href}`}
                >
                  <Button
                    css={`display: flex; 2px; align-items: center; justify-content: center; width: 105px; max-width: 105px;`}
                  >
                    <div>
                      <span
                        css={`
                          display: flex;
                          gap: 10px;
                          align-items: center;
                          @media (max-width: 400px) {
                            display: none;
                          }
                        `}
                      >
                        Share
                        <span
                          css={`
                            display: none;
                            @media (max-width: 400px) {
                              display: block;
                            }
                          `}
                        >
                          <i className="fas fa-share"></i>
                        </span>
                      </span>
                    </div>
                  </Button>
                </a>
              ) : (
                <Button
                  css={`display: flex; 2px; align-items: center; justify-content: center; width: 105px; max-width: 105px;`}
                >
                  <div>
                    <span
                      css={`
                        display: flex;
                        gap: 10px;
                        align-items: center;
                        @media (max-width: 400px) {
                          display: none;
                        }
                      `}
                    >
                      Share
                      <span
                        css={`
                          display: none;
                          @media (max-width: 400px) {
                            display: block;
                          }
                        `}
                      >
                        <i className="fas fa-share"></i>
                      </span>
                    </span>
                  </div>
                </Button>
              )}
            </ShareOption>

            <ShareOption
              className="d-flex mb-3 align-items-center justify-content-between overflow-hidden"
              PrimaryColor={PrimaryColor}
            >
              <div className="d-flex align-items-center">
                <div className="icon_wrapper">
                  <SmsIcon width="21" />
                </div>
                <input
                  type="number"
                  placeholder="Mobile no."
                  onChange={e => handleNumberCheck(e, setSmsNo)}
                  value={smsNo}
                />
              </div>

              <Button
                css={`display: flex; 2px; align-items: center; justify-content: center; width: 105px; max-width: 105px;`}
              >
                <div>
                  <span
                    css={`
                      display: flex;
                      gap: 5px;
                      align-items: center;
                      @media (max-width: 400px) {
                        display: none;
                      }
                    `}
                  >
                    Share
                    <span
                      css={`
                        display: none;
                        @media (max-width: 400px) {
                          display: block;
                        }
                      `}
                    >
                      <i className="fas fa-share"></i>
                    </span>
                  </span>
                </div>
              </Button>
            </ShareOption>

            <InfoMessage
              className="p-3 text-center"
              PrimaryShade={PrimaryShade}
            >
              * Please note that the premium may vary in future.
            </InfoMessage>
            {errorMsg ? (
              <div className="text-center text-danger">{errorMsg}</div>
            ) : (
              ""
            )}
            {emailStatus && (
              <EmailSent status={emailStatus.status}>
                {/* {handleRotation()} */}
                {emailStatus.message}
              </EmailSent>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShareQuoteModal;

const ShareOption = styled.div`
  border-radius: 10px;
  border: solid 1px #d5dce5;
  padding-left: 10px;
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
  input {
    border: none;
    margin-left: 15px;
    font-weight: 600;
    width: 85%;
    @media (max-width: 440px) {
      font-size: 12px !important;
    }
    :focus {
      outline: none;
    }
    ::placeholder {
      color: #b0b0b0;
    }
  }
  .share_btn {
    border-radius: 4px;
    padding: 15px 40px !important;
    background-color: ${props => props.PrimaryColor};
    border: solid 2px ${props => props.PrimaryColor};
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
    @media (max-width: 440px) {
      width: 35px;

      width: 35px;
    }
  }
  @media (max-width: 768px) {
    input {
      max-width: 150px;
    }
  }

  @media (max-width: 400px) {
    .icon_wrapper {
      width: 35px;
      height: 35px;
    }
    .share_btn {
      padding: 13px 15px !important;
      font-size: 10px;
    }
  }
`;

const InfoMessage = styled.div`
  background-color: ${props => props.PrimaryShade};
  font-weight: 600;
  color: #778291;
  font-size: 13px;
`;
