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
import { useCompanies, useTheme } from "../customHooks/index";
import ShareButton from "../components/Common/Button/ShareButton";
import html2canvas from "html2canvas";
import { Button } from "../components/index";
import { figureToWords } from "../utils/helper";
import { setQuotesToCanvas } from "../pages/quotePage/quote.slice";
import Sharequotespopup from "../pages/quotePage/components/ShareQuotesPopUp";
import { images } from "../assets/logos/logo";
import { mobile } from "../utils/mediaQueries";
import HttpClient from "../api/httpClient";

const shareViaEmailApi = data =>
  HttpClient("renewbuy/communications", {
    method: "POST",
    data,
  });

const printImageById = async id => {
  const input = document.getElementById(id);

  const canvas = await html2canvas(input, {
    scrollX: 0,
    scrollY: -window.scrollY,
  });
  const imgData = canvas.toDataURL("image/png");
  return imgData;
};

const ShareCTA = ({ onClick, loader }) => {
  return (
    <Button
      loader={loader}
      onClick={onClick}
      css={`
        border-radius: 5px;
        height: 55px;
        min-width: 105px;
        max-width: 105px;
        ${mobile} {
          min-width: 50px;
          max-width: 50px;
        }
      `}
    >
      <span
        css={`
          font-size: 14px;
          ${mobile} {
            display: none;
          }
        `}
      >
        Share
      </span>
      <span
        css={`
          color: #fff;
          display: none;
          ${mobile} {
            display: block;
          }
        `}
      >
        <i className="fas fa-share"></i>{" "}
      </span>
    </Button>
  );
};

const ShareQuoteModal = ({
  showModal,
  imageSend: imageToSend,
  emailStatus,
  stage = "",
  hideBtn,
  label,
  shareQuotes,
  insurersFor = [],
}) => {
  const [show, setshow] = useState(showModal);

  const [errorMsg, setErrorMsg] = useState("");

  const [isSending, setIsSending] = useState(false);

  const [step, setStep] = useState(shareQuotes ? 1 : 2);

  const [imageSend, setImageSend] = useState();

  const [insurers, setInsurers] = useState();

  const {
    colors: { primary_color: PrimaryColor, secondary_shade: SecondaryShade },
  } = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    const getImage = async () => {
      const id = stage === "COMPARE" && "printCompare";
      const image = id && (await printImageById(id));
      console.log(image);
      setImageSend(image);
    };
    getImage();
  }, []);

  useEffect(() => {
    dispatch(setlEmaiStatus(""));
    setErrorMsg("");
    //  setyShowMsgs(false)
  }, [show]);

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
      {!hideBtn && (
        <ShareButton
          shareQuotes={shareQuotes}
          onClick={handleShow}
          label={label}
        />
      )}
      {show && (
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
              {step === 1
                ? "Choose the quotes to share"
                : "Hi, please choose the way you wish to share the quotes."}
            </Modal.Title>
            <i
              onClick={handleClose}
              style={{ cursor: "pointer" }}
              className="fas fa-times"
            ></i>
          </Modal.Header>
          <Modal.Body>
            {shareQuotes && (
              <Flex color={SecondaryShade} gap={"5rem"}>
                <StepWrapper
                  onClick={() => setStep(1)}
                  active={step === 1}
                  color={PrimaryColor}
                >
                  {/* <Step active={step === 1} color={PrimaryColor}>
                    1
                  </Step> */}
                  <span>1. Select plans</span>
                </StepWrapper>

                <StepWrapper active={step === 2} color={PrimaryColor}>
                  {/* <Step active={step === 2} color={PrimaryColor}>
                    2
                  </Step> */}
                  <span>2. Share via</span>
                </StepWrapper>
              </Flex>
            )}
            <ShareStep1
              setImageSend={setImageSend}
              setStep={setStep}
              hide={step === 2}
              setInsurers={setInsurers}
            />
            <ShareStep2
              hide={step === 1}
              imageSend={imageSend}
              emailStatus={emailStatus}
              setEmailStatus={setlEmaiStatus}
              stage={stage}
              setIsSending={setIsSending}
              setErrorMsg={setErrorMsg}
              isSending={isSending}
              errorMsg={errorMsg}
              insurers={insurers?.length ? insurers : insurersFor}
            />
          </Modal.Body>
        </Modal>
      )}
      <CanvasQuotes />
      <Sharequotespopup onClick={handleShow} show={!show} />
    </>
  );
};

function Quote({
  quotes,
  onHandleAdd,
  onHandleRemove,
  selectedQuotes,
  setCanvasQuotes,
}) {
  const {
    colors: { primary_color: PrimaryColor },
  } = useTheme();

  const sumInsureds = quotes
    .map(quote => parseInt(quote.sum_insured))
    .sort((a, b) => a - b);

  const [selectedCover, setSelectedCover] = useState(sumInsureds[0]);
  const [checked, setChecked] = useState(false);

  const quote = quotes.find(
    quote => parseInt(quote.sum_insured) === parseInt(selectedCover),
  );

  useEffect(() => {
    if (!checked) {
      onHandleRemove(quotes);
      setCanvasQuotes(prev =>
        prev.filter(quote => quote?.product?.id !== quotes[0]?.product?.id),
      );
    } else {
      onHandleAdd(quotes);
      setCanvasQuotes(prev => [...prev, quote]);
    }
  }, []);

  useEffect(() => {
    const isInQuotes = selectedQuotes?.find(sQuotes => {
      return sQuotes[0]?.product?.id === quotes[0]?.product?.id;
    });
    setChecked(isInQuotes ? true : false);
  }, [selectedQuotes]);

  const { getCompany } = useCompanies();

  const logoSrc = getCompany(quote?.company_alias)?.logo;

  useEffect(() => {
    setCanvasQuotes(prev => {
      // if already present do push
      if (!prev.find(q => q?.product?.id === quote?.product?.id)) {
        return [...prev, quote];
      } else {
        return [
          ...prev.filter(q => q?.product?.id !== quote?.product?.id),
          quote,
        ];
      }
    });
  }, [quote]);

  const onChangeHandler = e => {
    const { checked } = e.target;
    if (!checked) {
      onHandleRemove(quotes);
      setCanvasQuotes(prev =>
        prev.filter(quote => quote?.product?.id !== quotes[0]?.product?.id),
      );
    } else {
      onHandleAdd(quotes);
      setCanvasQuotes(prev => [...prev, quote]);
    }
  };

  return (
    <ShareQuoteItem gap={"5px"}>
      <Plan>
        <img className="insurer" src={logoSrc} alt="quote" />
        <div className="plan">{quote?.product?.name}</div>
      </Plan>
      <Premium color={PrimaryColor}>
        ₹ {parseInt(quote.total_premium).toLocaleString("en-IN")}
      </Premium>
      <div className="cover">
        <select
          value={selectedCover}
          onChange={e => setSelectedCover(e.target.value)}
        >
          {sumInsureds.map(sum_insured => (
            <option value={sum_insured}>₹ {figureToWords(sum_insured)}</option>
          ))}
        </select>
      </div>
      <Checkbox>
        <input checked={checked} type="checkbox" onChange={onChangeHandler} />
      </Checkbox>
    </ShareQuoteItem>
  );
}

const CanvasQuotes = () => {
  const { quotesToCanvas } = useSelector(state => state.quotePage);

  const { colors } = useTheme();

  return (
    <Canvas>
      <div id="share-quotes" className="canvas">
        <ShareQuotesHeader color={colors.primary_color} cols="3fr 1fr 1fr 1fr">
          <ShareQuotesHeaderItem>Insurer</ShareQuotesHeaderItem>
          <ShareQuotesHeaderItem>Premium</ShareQuotesHeaderItem>
          <ShareQuotesHeaderItem>Cover</ShareQuotesHeaderItem>
          <ShareQuotesHeaderItem>Proceed</ShareQuotesHeaderItem>
        </ShareQuotesHeader>
        {quotesToCanvas.map(quote => (
          <CanvasQuoteTemplate colors={colors} quote={quote} />
        ))}
      </div>
    </Canvas>
  );
};

const CanvasQuoteTemplate = ({ quote, colors }) => {
  const {
    product: { name },
    total_premium,
    sum_insured,
    company_alias,
  } = quote;

  const logoSrc = images[company_alias];

  return (
    <ShareQuoteItemCanvas
      color={colors.primary_color}
      shade={colors.primary_shade}
    >
      <Plan>
        <img className="insurer" src={logoSrc} alt="quote" />
        <div className="plan">{name}</div>
      </Plan>
      <Premium color={colors.primary_color}>
        ₹ {parseInt(total_premium).toLocaleString("en-IN")}
      </Premium>
      <Premium>{figureToWords(sum_insured)}</Premium>
      <Proceed color={colors.primary_color}>Proceed</Proceed>
    </ShareQuoteItemCanvas>
  );
};

function ShareStep1({ setStep = () => {}, hide, setImageSend, setInsurers }) {
  const dispatch = useDispatch();

  const { quotesToShare } = useSelector(state => state.quotePage);
  const [selectedQuote, setselectedQuotes] = useState([]);
  const [allChecked, setAllChecked] = useState(true);
  const [loader, setLoader] = useState(false);
  const [canvasQuotes, setCanvasQuotes] = useState([]);

  useEffect(() => {
    setselectedQuotes(quotesToShare);
  }, []);

  useEffect(() => {
    dispatch(setQuotesToCanvas(canvasQuotes.filter(quote => quote)));
  }, [canvasQuotes]);

  useEffect(() => {
    const checked = selectedQuote?.length === quotesToShare?.length;
    setAllChecked(checked);
    setInsurers([
      ...new Set([...selectedQuote.map(quote => quote[0]?.company_alias)]),
    ]);
  }, [selectedQuote]);

  const handleRemoveQuote = quotes => {
    const filteredquotes = selectedQuote.filter(
      quote => quote[0]?.product?.id !== quotes[0]?.product?.id,
    );
    setselectedQuotes(filteredquotes);
  };

  const handleAddQuote = quotes => {
    setselectedQuotes(prev => [...prev, quotes]);
  };

  const handleReplaceQuotes = quotes => {
    setselectedQuotes(quotes);
  };

  const onChangeHandler = e => {
    const { checked } = e.target;
    if (!checked) {
      handleReplaceQuotes([]);
      setCanvasQuotes([]);
    } else {
      handleReplaceQuotes(quotesToShare);
      setCanvasQuotes(quotesToShare.map(quote => quote[0]));
    }
  };

  const onNextHandler = () => {
    setLoader(true);
    const input = document.getElementById("share-quotes");

    html2canvas(input, {
      scrollX: 0,
      scrollY: -window.scrollY,
      allowTaint: true,
      useCORS: true,
      scale: 0.9,
    }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      console.log(imgData);
      setImageSend(imgData);
      setLoader(false);
      setStep(2);
    });
  };

  return (
    <div
      css={`
        display: ${hide ? "none" : "block"};
      `}
    >
      <ShareQuotesWrapper>
        <ShareQuotesHeader>
          <ShareQuotesHeaderItem>Insurer</ShareQuotesHeaderItem>
          <ShareQuotesHeaderItem>Premium</ShareQuotesHeaderItem>
          <ShareQuotesHeaderItem>Cover</ShareQuotesHeaderItem>
          <ShareQuotesHeaderItem center>
            <span>All</span>
            <input
              checked={allChecked}
              type={"checkbox"}
              onChange={onChangeHandler}
            />
          </ShareQuotesHeaderItem>
        </ShareQuotesHeader>
        <ShareQuotes>
          {quotesToShare.map(quotes => (
            <Quote
              quotes={quotes}
              onHandleAdd={handleAddQuote}
              onHandleRemove={handleRemoveQuote}
              selectedQuotes={selectedQuote}
              setCanvasQuotes={setCanvasQuotes}
            />
          ))}
        </ShareQuotes>
      </ShareQuotesWrapper>
      <ShareFooterBtn>
        <Button
          loader={loader}
          css={`
            width: 100px;
          `}
          onClick={onNextHandler}
          disabled={!selectedQuote.length}
        >
          Next
        </Button>
      </ShareFooterBtn>
    </div>
  );
}

function ShareStep2({
  imageSend,
  stage,
  setIsSending,
  setErrorMsg,
  isSending,
  errorMsg,
  hide,
  insurers,
}) {
  const details4autopopulate = useSelector(
    ({ greetingPage }) => greetingPage.proposerDetails,
  );

  const {
    colors: { primary_color: PrimaryColor, primary_shade: PrimaryShade },
  } = useTheme();

  const [email, setEmail] = useState(
    details4autopopulate?.email ? details4autopopulate.email : "",
  );

  const [wtsappNo, setWtsappNo] = useState(
    details4autopopulate?.mobile ? details4autopopulate.mobile : "",
  );

  const [smsNo, setSmsNo] = useState(
    details4autopopulate?.mobile ? details4autopopulate.mobile : "",
  );

  const [emailStatus, setEmailStatus] = useState({ status: 0, message: null });

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

  const handleEmailCheck = e => {
    if (e.target.value.length <= 50) {
      setEmail(e.target.value);
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
      return imageSend(email, stage);
    }
  };

  const handleRotation = () => {
    setIsSending(false);
  };

  const handleShare = async (e, data) => {
    e.preventDefault();
    console.log(imageSend);
    const validator =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    if (data.mode[0] === "EMAIL" && data.email === "") {
      return setErrorMsg("Enter email to send.");
    } else if (data.mode[0] === "EMAIL" && !validator.test(data.email)) {
      return setErrorMsg("Enter valid email.");
    } else setErrorMsg("");

    if (!errorMsg) {
      setIsSending(data.mode[0]);
      const response = await shareViaEmailApi(data);
      let successMsg;
      if (data.mode[0] === "EMAIL") successMsg = "Email sent successfully";
      if (data.mode[0] === "WHATSAPP")
        successMsg = "Whatsapp message sent successfully";
      if (data.mode[0] === "SMS") successMsg = "SMS sent successfully";
      setEmailStatus({
        status: response.statusCode,
        message:
          `${response.statusCode}`.startsWith("2") && successMsg
            ? successMsg
            : "Not sent!",
      });
      setIsSending(false);
    }
  };

  return (
    <div
      css={`
        display: ${hide ? "none" : "block"};
        .icon_wrapper {
          background-color: ${PrimaryShade};
          color: ${PrimaryColor};
        }
      `}
    >
      <ShareOption
        className="d-flex align-items-center justify-content-between  mb-3"
        PrimaryColor={PrimaryColor}
      >
        <div className="d-flex align-items-center position-relative w-100">
          <div className="icon_wrapper">
            <EmailIcon width="21" />
          </div>
          <input
            type="email"
            onChange={handleEmailCheck}
            placeholder="Email"
            value={email}
            css={``}
          />
        </div>
        <ShareCTA
          // onClick={e => handleSendViaEmail(e)}
          onClick={e => {
            handleShare(e, {
              mode: ["EMAIL"],
              stage,
              email,
              whatsapp: "",
              sms: "",
              image_to_send: imageSend ? imageSend : undefined,
              insurers,
            });
          }}
          // loader={isSending && !emailStatus?.message}
        />
      </ShareOption>

      <ShareOption
        className="d-flex mb-3 align-items-center justify-content-between"
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
            <ShareCTA />
          </a>
        ) : (
          <ShareCTA />
        )}
      </ShareOption>

      <ShareOption
        className="d-flex mb-3 align-items-center justify-content-between"
        PrimaryColor={PrimaryColor}
      >
        <div className="d-flex align-items-center">
          <div className="icon_wrapper">
            <SmsIcon width="21" />
          </div>
          <input
            type="number"
            placeholder="Mobile no."
            value={smsNo}
            onChange={e => handleNumberCheck(e, setSmsNo)}
          />
        </div>

        <ShareCTA
          onClick={e => {
            setEmailStatus({ status: 0, message: null });
            Number(smsNo.length) === 10 &&
              handleShare(e, {
                mode: ["SMS"],
                stage,
                email: "",
                whatsapp: "",
                sms: smsNo,
                insurers,
              });
          }}
        />
      </ShareOption>

      <InfoMessage className="p-3 text-center" PrimaryShade={PrimaryShade}>
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
  );
}

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

const ShareQuotesWrapper = styled.div`
  width: 100%;
  border-radius: 7px;
  border: 1px solid #dcdcdc;
  overflow: hidden;
  display: ${props => (props.hide ? "none" : "block")};
`;

const ShareQuotes = styled.div`
  max-height: 300px;
  overflow: scroll;
`;

const Canvas = styled.div`
  width: 600px;
  position: absolute;
  left: -99999px;
  z-index: 9999999;
`;

const Proceed = styled.div`
  background: ${({ color }) => color};
  color: #fff;
  padding: 6px 5px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 12px;
  text-align: center !important;
`;

const ShareQuotesHeader = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: ${props => props.cols || "3fr 1fr 1fr 1fr"};
  background: ${props => props.color || "#eee"};
  background: ;
  padding: 8px;
  color: ${({ color }) => (color ? "#fff" : "#000")};

  & > * {
    text-align: left;
  }
`;

const ShareQuotesHeaderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.center ? "center" : "flex-start")};
  gap: 7px;
  width: 100%;
  font-weight: bold;
  font-size: 14px;
`;

const ShareQuoteItem = styled.div`
  display: grid;
  grid-template-columns: ${props => props.cols || "3fr 1fr 1fr 1fr"};
  gap: ${props => props.gap || "0"};
  padding: 8px;
  border-bottom: 1px solid #dcdcdc;
  align-items: center;

  & > * {
    text-align: left;
  }

  & .plan {
    font-size: 12px;
  }

  & .cover {
    font-size: 14px;
    color: ${props => props.color};
    font-weight: bold;
  }

  & .insurer {
    height: 30px;
    max-width: 60px;
    margin-right: 5px;
  }
`;

const ShareQuoteItemCanvas = styled(ShareQuoteItem)`
  grid-template-columns: 3fr 1fr 1fr 1fr;
  gap: 10px;
  border: 1px solid ${({ color }) => color};
  background: ${({ shade }) => shade};
  align-items: center;
  margin: 2px 0;

  & .insurer {
    border: 1px solid ${({ color }) => color};
    padding: 2px;
    border-radius: 5px;
    background: #fff;
  }
`;

const Plan = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
`;

const Premium = styled.div`
  color: ${props => props.color};
  font-weight: bold;
  font-size: 14px;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShareFooterBtn = styled.div`
  padding-top: 15px;
  // padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StepWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 10px 0;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  color: ${props => (props.active ? props.color : "#777")};
  ${props =>
    props.active &&
    `
    &::before {
      content: "";
      height: 4px;
      width: 100%;
      background-color: ${props.color};
      position: absolute;
      bottom: 0;
      left: 0;
      border-radius: 20px 20px 0 0;
    }
  `}
`;

const Step = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid;
  border-color: ${props => (props.active ? props.color : "#dcdcdc")};
  background: ${props => (props.active ? props.color : "transparent")};
  color: ${props => (props.active ? "#fff" : "black")};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Flex = styled.div`
  display: flex;
  align-items center;
  justify-content: center;
  gap: ${props => props.gap || "10px"};
  margin-bottom: 15px;
  width: calc(100% + 2rem);
  margin-left: -1rem;
  margin-top: -1rem;
  background: ${props => props.color || "#eee"};
  border-bottom: 1px solid #ddd;
`;
