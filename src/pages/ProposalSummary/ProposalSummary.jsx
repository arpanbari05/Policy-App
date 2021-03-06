import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDownload2Line } from "react-icons/ri";
import "./ProposalSummary.scss";
import ProposalCheckBox from "../../components/Common/ProposalSummary/summaryCheckBox";
import SummaryTab from "../ProposalPage/components/SummaryTab/SummaryTab";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import oneInsurepdf from "../../assets/logos/oneinsure_pdf.png";
import renewBuyPDF from "../../assets/logos/renewbuy_pdf.png";
import pincPDF from "../../assets/logos/pinc_pdf.png";
import sriyahPDF from "../../assets/logos/sriyah_pdf.png";
import fyntunePDF from "../../assets/logos/fyntune_pdf.png";
import { getProposalFields } from "../ProposalPage/schema.slice";
import {
  fetchPdf,
  getProposalData,
} from "../ProposalPage/ProposalSections/ProposalSections.slice";
import SecureLS from "secure-ls";
import ProductSummary from "../ProposalPage/ProposalSections/components/ProductSummary";
import styled from "styled-components";
import ProductSummaryMobile from "../ProposalPage/ProposalSections/components/ProductSummaryMobile";
import useUrlQuery from "../../customHooks/useUrlQuery";
import { Col, Row } from "react-bootstrap";
import TermModal from "./TermsModal";
import { getTermConditions } from "../ProposalPage/serviceApi";
import {
  useFrontendBoot,
  useTheme,
  useUrlEnquiry,
  useCart,
  useMembers,
  useUSGIDiscounts,
} from "../../customHooks";
import { Page, BackButtonMobile } from "../../components";
import {
  useGetProductBrochureQuery,
  useGetProposalDataQuery,
} from "../../api/api";
import ShareQuoteModal from "../../components/ShareQuoteModal";
import GoBackButton from "../../components/GoBackButton";
import { mobile } from "../../utils/mediaQueries";
import { amount, getPolicyPremium, isSSOJourney } from "../../utils/helper";
import Card from "../../components/Card";
import httpClient from "../../api/httpClient";
import "styled-components/macro";

const ProposalSummary = () => {
  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const [loader, setLoader] = useState(false);

  const { getGroupMembers } = useMembers();

  const pdfLogoSelector = {
    fyntune: fyntunePDF,
    oneinsure: oneInsurepdf,
    renew_buy: renewBuyPDF,
    pinc: pincPDF,
    sriyah: sriyahPDF,
  };

  const { colors } = useTheme();

  const PrimaryColor = colors.primary_color;

  const PrimaryShade = colors.primary_shade;

  const { data: proposalData = {} } = useGetProposalDataQuery();

  let { cartEntries, isVersionRuleEngine } = useCart();

  const { currentSchema } = useSelector(state => state.schema);

  const { policyStatus, canSendSummaryPdf } = useSelector(
    state => state.proposalPage,
  );

  const [show, setShow] = useState(false);

  const [termShow, setTermShow] = useState(false);

  const frontendBoot = useFrontendBoot();

  const frontendData = { data: frontendBoot.data };

  const tenantAlias = frontendBoot?.data?.tenant?.alias;

  const cart = cartEntries;

  const totalPremium = useUSGIDiscounts();

  const totalPremiumPolicies = getPolicyPremium(policyStatus);

  // TO SEND PDF SUMMARY TO BACKEND
  const [pdfDoc, setPdfDoc] = useState(null);
  useEffect(() => {
    if (proposalData?.data && Object.keys(cart).length && canSendSummaryPdf) {
      const divToPrint = document.querySelector(
        window.outerWidth > 1022
          ? "#printSummaryPage"
          : "#printSummaryPageMobile",
      );

      html2canvas(divToPrint, {
        scale: 2,
      }).then(canvas => {
        const imgData = canvas.toDataURL("image/jpeg", 0.3);

        const imgWidth = 190;

        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const doc = new jsPDF("pt", "mm", [imgWidth, imgHeight + 50]);

        doc.text(10, 10, "Proposal Summary");

        pdfLogoSelector[tenantAlias] &&
          doc.addImage(pdfLogoSelector[tenantAlias], "PNG", 150, 2, 30, 15);

        doc.addImage(
          imgData,
          "JPEG",
          10,
          20,
          imgWidth,
          imgHeight,
          undefined,
          "FAST",
        );

        setPdfDoc(doc);

        setLoader(false);
      });
    }
  }, [proposalData, cart, canSendSummaryPdf]);

  useEffect(() => {
    if (pdfDoc) {
      let pdfDocInBytes = btoa(pdfDoc.output());

      httpClient("proposals/pdf", {
        method: "POST",
        data: { summary_pdf: pdfDocInBytes },
      });
    }
  }, [pdfDoc]);

  const tCSectionData = isSSOJourney()
    ? frontendData?.data?.settings?.summary_banner_pos
    : frontendData?.data?.settings?.summary_banner;

  const [allFields, setAllFields] = useState([]);

  const url = useUrlQuery();

  const enquiryId = url.get("enquiryId");

  const dispatch = useDispatch();

  const sum_insured = cartEntries?.map(cart => ({
    [cart?.product?.name]: cart?.sum_insured,
  }));

  const getTermConditionData = async (company_id, callback = () => {}) => {
    try {
      const { data } = await getTermConditions(company_id);

      callback(data.company_terms_and_conditions);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  useEffect(() => {
    if (!Object.keys(currentSchema).length) {
      dispatch(getProposalFields());
    }
    dispatch(getProposalData());
    dispatch(fetchPdf({ noRepeat: true }));
  }, []);

  useEffect(() => {
    setAllFields(Object.keys(currentSchema));
  }, [currentSchema]);

  const ls = new SecureLS();

  const [checked, setChecked] = useState(false);

  const [allTcChecked, setAllTcChecked] = useState(true);

  const onClick = mobile => {
    if (
      frontendData?.data?.settings?.journey_type === "single" &&
      (checked || mobile)
    ) {
      if (policyStatus?.length > 1) {
        setShow(prev => !prev);
      } else {
        singlePay(policyStatus[0]?.proposal_id);
      }
    } else if (checked || mobile) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = process.env.REACT_APP_API_BASE_URL + "payments";
      form.style.display = "none";
      const input = document.createElement("input");
      input.name = "enquiry_id";
      input.value = enquiryId || ls.get("enquiryId");
      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    }
  };

  const singlePay = id => {
    if (checked && allTcChecked) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = process.env.REACT_APP_API_BASE_URL + "payments";
      form.style.display = "none";
      const input = document.createElement("input");
      input.name = "proposal_id";
      input.value = id;
      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    }
  };

  const imageSendQuote = () => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      pdfDoc.save("Proposal_Summary.pdf");
    }, 1000);
  };

  const prod_id = Object.keys(cart)[0];

  useEffect(() => {
    if (cart[prod_id]?.product?.company?.id) {
      getTermConditionData(cart[prod_id].product.company.id, () => {});
    }
  }, []);

  return (
    <>
      <Page
        id={"proposalSummaryPage"}
        backButton={
          <BackButtonMobile path={getUrlWithEnquirySearch(`/proposal`)} />
        }
      >
        <div
          className="container-fluid terms__wrapper"
          css={`
            @media (min-width: 768px) and (max-width: 1200px) {
              display: none !important;
            }
          `}
        >
          <div className="termsInner__wrapper">
            <div className="quotes_compare_div summary_footer_width">
              <ProposalCheckBox
                title={"checked"}
                type={"checkbox"}
                value={checked}
                extraPadding
                onChange={() => setChecked(!checked)}
              />
              <span className="Iaccept">
                {"I have read & accepted the Insurance Company's"}&nbsp;
              </span>
              <span
                className="TermsAndConditions"
                css={`
                  color: ${PrimaryColor};
                `}
                style={{ cursor: "pointer" }}
                onClick={() => setTermShow(true)}
              >
                {" "}
                {"Terms & Conditions"}{" "}
              </span>
              {termShow && (
                <TermModal
                  show={termShow}
                  handleClose={() => {
                    setTermShow(false);
                  }}
                />
              )}
            </div>

            <div className="quotes_compare_buttons_div">
              <div
                className="row btn_p_summary_pay_now d-flex align-items-center"
                onClick={() => checked && onClick()}
                css={`
                  background: ${PrimaryColor} !important;
                `}
              >
                <div className="col-md-4 position-relative">
                  {show && (
                    <MultipleWrapper>
                      <PayList>
                        {policyStatus &&
                          policyStatus.map(item => (
                            <PayItem key={item?.product?.name}>
                              <ItemName>{item?.product?.name}</ItemName>
                              <PayButton
                                PrimaryColor={PrimaryColor}
                                style={{
                                  cursor: "pointer",
                                  backgroundColor:
                                    item.payment_status === "success"
                                      ? PrimaryShade
                                      : PrimaryColor,
                                }}
                                onClick={() => {
                                  item.payment_status !== "success" &&
                                    singlePay(item.proposal_id);
                                }}
                              >
                                <span>
                                  {" "}
                                  {item.payment_status === "success"
                                    ? "Paid!"
                                    : "Pay Now"}
                                </span>

                                <div>
                                  ???{" "}
                                  {parseInt(item?.total_premium).toLocaleString(
                                    "en-In",
                                  )}
                                </div>
                              </PayButton>
                            </PayItem>
                          ))}
                      </PayList>
                    </MultipleWrapper>
                  )}
                  <button
                    css={`
                      background: ${PrimaryColor} !important;
                    `}
                    disabled={!(checked && allTcChecked)}
                    className="btn btn_p_s_pay_now"
                    style={{
                      fontSize: "16px",
                      width: "max-content",
                      paddingTop: "8px",
                    }}
                  >
                    Pay Now{" "}
                  </button>
                </div>
                <div className="col-md-8">
                  <div
                    disabled={!(checked && allTcChecked)}
                    css={`
                      color: #fff;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                    `}
                  >
                    <span>Total Premium</span>
                    <p className="p_dark_f_a" style={{ marginBottom: "unset" }}>
                      <span className="font_weight_normal text-white">
                        {amount(totalPremiumPolicies)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-20 ">
          <ShareQuoteModal
            insurersFor={cart.map(cart => cart?.product?.company?.alias)}
            stage="PROPOSAL_SUMMARY"
            purpose="proposalSummary"
            sum_insured={sum_insured}
            float
            floatCss={"bottom: 160px;"}
          />
          <div
            className="element-section "
            css={`
              margin: 0px 30px;
              padding-bottom: 150px;

              @media (max-width: 768px) {
                margin: 0px !important;
                margin-top: 10px !important;
              }
            `}
          >
            <br className="hide-on-mobile" />

            <Row
              id="printSummaryPage"
              css={`
                @media (max-width: 1023px) {
                  flex-direction: column;
                }
              `}
            >
              <div
                className="container-fluid"
                css={`
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  ${mobile} {
                    display: none;
                  }
                `}
              >
                {
                  <GoBackButton
                    data-html2canvas-ignore
                    backPath={getUrlWithEnquirySearch("/proposal")}
                    shouldFollowPath
                  />
                }
                <div></div>
                <div
                  css={`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  `}
                >
                  <ShareQuoteModal
                    insurersFor={cart.map(
                      cart => cart?.product?.company?.alias,
                    )}
                    stage="PROPOSAL_SUMMARY"
                    purpose="proposalSummary"
                    sum_insured={sum_insured}
                  />
                </div>
              </div>
              <Col
                md={3}
                css={`
                  padding: 0px;
                  @media (max-width: 1023px) {
                    width: 100%;
                  }
                `}
              >
                <SummaryWrapper>
                  <ProductSummary totalPremium={totalPremium} cart={cart} />
                </SummaryWrapper>
              </Col>
              <Col
                md={9}
                css={`
                  @media (max-width: 1023px) {
                    width: 100%;
                  }
                `}
              >
                {/*download pdf button*/}

                {pdfDoc ? (
                  <>
                    <button
                      data-html2canvas-ignore="true"
                      css={`
                        position: fixed;
                        bottom: 100px;
                        right: 7vw;
                        box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
                        z-index: 9999;
                        background-color: ${PrimaryColor};
                        color: white;
                        width: 50px;
                        height: 50px;
                        border-radius: 100%;
                        // display: nonex;
                        @media (max-width: 1023px) {
                          display: block;
                        }
                      `}
                      className="btn share_Quote_btn"
                      onClick={() => imageSendQuote("#printSummaryPageMobile")}
                    >
                      {!loader ? (
                        <RiDownload2Line size={25} />
                      ) : (
                        <i className="fa fa-circle-notch rotate" />
                      )}
                    </button>
                  </>
                ) : (
                  <></>
                )}

                <div className="row margin_top_tab_proposal">
                  <div className="col-lg-12 col-md-12 no-padding-mobile">
                    <div className="signUp-page signUp-minimal pb-70">
                      <div
                        className="-wrapper pad_proposal_s mt-2"
                        id="printSummaryPageMobile"
                      >
                        {proposalData.data && allFields ? (
                          allFields.map((item, index) => {
                            return (
                              <SummaryTab
                                PrimaryColor={PrimaryColor}
                                PrimaryShade={PrimaryShade}
                                key={index}
                                title={item}
                                getGroupMembers={getGroupMembers}
                                data={currentSchema[item]}
                                values={proposalData.data[item]}
                                index={index}
                                isVersionRuleEngine={isVersionRuleEngine}
                              ></SummaryTab>
                            );
                          })
                        ) : (
                          <></>
                        )}
                        {tCSectionData && proposalData.data && allFields && (
                          <TermsAndConditionsSection
                            setAllTcChecked={setAllTcChecked}
                            tCSectionData={tCSectionData}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <div
              css={`
                @media (max-width: 1199px) {
                  display: inline-block;
                }
                @media (min-width: 1200px) {
                  display: none;
                }
              `}
            >
              <ProductSummaryMobile cart={cart} payNow={onClick} />
            </div>
          </div>
        </div>
      </Page>
    </>
  );
};

export default ProposalSummary;

const SummaryWrapper = styled.div`
  width: 100%;
`;
const MultipleWrapper = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  background-color: #fff;
  left: -19px;
  border-radius: 8px;
  bottom: 150%;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 6px 12px #d4d8e4b5 !important;
`;

const PayList = styled.ul`
  padding: 10px;
`;
const PayItem = styled.li`
  margin-bottom: 12px;
  display: flex;
`;
const ItemName = styled.div`
  font-size: 20px;
  background-color: #f6f7f9;
  padding: 12px;
  border-radius: 8px;
  display: inline-block;
  width: 60%;
`;
const PayButton = styled.div`
  width: 40%;
  color: #fff;
  display: inline-block;
  padding: 6px;
  background-color: ${props => props.PrimaryColor};
  text-align: center;
  border-radius: 0 6px 6px 0px;
  & span {
    display: inline-block;
  }
`;

const TermsAndConditionsSection = ({ setAllTcChecked, tCSectionData }) => {
  const frontendBoot = useFrontendBoot();

  const tenantAlias = frontendBoot?.data?.tenant?.alias;

  const { colors } = useTheme();

  const PrimaryColor = colors.primary_color;

  const PrimaryShade = colors.primary_shade;

  const { cartEntries } = useCart();

  const checkBoxContentArray = JSON.parse(tCSectionData?.checkbox);

  const [checkBoxTracker, setCheckBoxTracker] = useState([]);

  useEffect(() => {
    checkBoxContentArray?.length === checkBoxTracker?.length
      ? setAllTcChecked(true)
      : setAllTcChecked(false);
  }, [checkBoxTracker?.length, checkBoxContentArray?.length]); //? sets setAllTcChecked(false) on initial render of component

  return (
    <Card
      styledCss={`
        margin-bottom: 100px;
        @media (max-width: 768px) {
          margin-bottom: 10px;
          padding: 5px 2px;
        }
      `}
    >
      <MainTitle
        PrimaryColor={PrimaryColor}
        PrimaryShade={`linear-gradient(90deg, ${PrimaryShade} 0%,rgb(255 255 255) 100%)`}
        bg
      >
        {"Terms and Conditions"}
      </MainTitle>
      {tenantAlias !== "spa" && (
        <ContentSection>
          {checkBoxContentArray?.map((item, index) => (
            <div key={index}>
              <p>
                <span
                  css={`
                    position: relative;
                    top: -5px;
                    ${mobile} {
                      position: static;
                    }
                  `}
                >
                  <ProposalCheckBox
                    title={item}
                    type={"checkbox"}
                    value={checkBoxTracker?.includes(item)}
                    onChange={e => {
                      e.target.checked &&
                        setCheckBoxTracker(currentState => [
                          ...currentState,
                          item,
                        ]);

                      !e.target.checked &&
                        setCheckBoxTracker(currentState =>
                          currentState?.filter(
                            singleItem => singleItem !== item,
                          ),
                        );
                    }}
                  />
                </span>

                <span
                  css={`
                    ${mobile} {
                      font-size: 12px !important;
                    }
                    & a {
                      color: ${PrimaryColor};
                    }
                  `}
                  dangerouslySetInnerHTML={{ __html: item }}
                ></span>
              </p>
            </div>
          ))}
          {cartEntries.map((singleItem, index) => (
            <PolicyWordingsRenderer key={index} singleItem={singleItem} />
          ))}
        </ContentSection>
      )}
      {tenantAlias === "spa" && tCSectionData?.radio && (
        <ContentSection
          css={`
            & p {
              font-size: 1rem !important;
              ${mobile} {
                font-size: 12px !important;
              }
            }
            & label {
              margin: 10px 20px !important;
              display: block !important;
              font-weight: 600;
              ${mobile} {
                font-size: 14px !important;
              }
            }
          `}
          dangerouslySetInnerHTML={{ __html: tCSectionData?.radio }}
        ></ContentSection>
      )}
    </Card>
  );
};

const MainTitle = styled.h2`
  margin-left: 3px;
  margin-bottom: ${props => (props.bg ? "15px" : "10")};
  margin-top: ${props => (props.bg ? "15px" : "10")};
  font-weight: 900;
  background: ${props => props.bg && props.PrimaryShade};
  color: ${props => props.bg && props.PrimaryColor};
  font-size: 21px;
  padding: 10px;
  @media screen and (max-width: 768px) {
    margin-top: 0px;
  }
`;

const PolicyWordingsRenderer = ({ singleItem }) => {
  const { colors } = useTheme();

  const PrimaryColor = colors.primary_color;

  const productBrochureQuery = useGetProductBrochureQuery(
    singleItem?.product?.id,
  );

  const policy_wording_url = (productBrochureQuery.data || [])[0]
    ?.policy_wording_url;

  return (
    <p
      css={`
        padding-left: 35px;
        ${mobile} {
          font-size: 12px !important;
        }
      `}
    >
      {"- "}
      <a
        css={`
          color: ${PrimaryColor} !important;
        `}
        href={policy_wording_url}
        target="_blank"
        rel="noreferrer"
      >
        Policy wordings
      </a>
      {` of ${singleItem?.product?.name}. `}
    </p>
  );
};

const ContentSection = styled.div`
  box-sizing: border-box;
  padding: 10px 20px;
`;
