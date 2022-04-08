import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ProposalSummary.scss";
import ProposalCheckBox from "../../components/Common/ProposalSummary/summaryCheckBox";
import SummaryTab from "../ProposalPage/components/SummaryTab/SummaryTab";
import { starSchema } from "../ProposalPage/ProposalDetailsSchema";
import { getProposalFields } from "../ProposalPage/schema.slice";
import { MdOutlineArrowBackIos } from "react-icons/md";
import ProposalSummaryTab from "./../../components/Common/ProposalSummary/ProposalSummary";
import {
  MobileHeader,
  MobileHeaderText,
} from "./../ProposalPage/ProposalPage.style";
import "styled-components/macro";

import {
  fetchPdf,
  getProposalData,
  postPayment,
} from "../ProposalPage/ProposalSections/ProposalSections.slice";
import SecureLS from "secure-ls";
import ProductSummary from "../ProposalPage/ProposalSections/components/ProductSummary";
import styled from "styled-components";
import ProductSummaryMobile from "../ProposalPage/ProposalSections/components/ProductSummaryMobile";
import ProductSummaryTab from "../ProposalPage/ProposalSections/components/ProductSummaryTab";
import useUrlQuery from "../../customHooks/useUrlQuery";
import { Col, Row } from "react-bootstrap";
import TermModal from "./TermsModal";
import { RevisedPremiumPopup } from "../ProductDetails/components/ReviewCart";
import { getAboutCompany } from "../SeeDetails/serviceApi";
import { getTermConditions } from "../ProposalPage/serviceApi";
import {
  useFrontendBoot,
  useTheme,
  useUrlEnquiry,
  useCart,
  useMembers,
  useUSGILifeStyleDiscount,
} from "../../customHooks";
import { Page } from "../../components";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  useGetEnquiriesQuery,
  useGetProductBrochureQuery,
  useGetProposalDataQuery,
} from "../../api/api";
import ShareQuoteModal from "../../components/ShareQuoteModal";
import GoBackButton from "../../components/GoBackButton";
import { mobile } from "../../utils/mediaQueries";
import { amount, isSSOJourney } from "../../utils/helper";
import Card from "../../components/Card";

const ProposalSummary = () => {
  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  const { getGroupMembers } = useMembers();

  const { colors } = useTheme();

  const PrimaryColor = colors.primary_color;

  const PrimaryShade = colors.primary_shade;

  const { data: proposalData = {} } = useGetProposalDataQuery();

  const backButtonForNav = (
    <Link
      className="back_btn_navbar"
      style={{ color: PrimaryColor }}
      to={getUrlWithEnquirySearch(`/proposal`)}
    >
      <MdOutlineArrowBackIos />
    </Link>
  );

  let { cartEntries } = useCart();

  const { currentSchema } = useSelector(state => state.schema);

  const { policyStatus } = useSelector(state => state.proposalPage);

  const [show, setShow] = useState(false);

  const [termShow, setTermShow] = useState(false);

  const frontendBoot = useFrontendBoot();

  const frontendData = { data: frontendBoot.data };

  const totalPremium = useUSGILifeStyleDiscount();

  const tCSectionData = isSSOJourney()
    ? frontendData?.data?.settings?.summary_banner_pos
    : frontendData?.data?.settings?.summary_banner;

  const [allFields, setAllFields] = useState([]);

  const [term, setTerm] = useState({});

  const url = useUrlQuery();

  const enquiryId = url.get("enquiryId");

  const dispatch = useDispatch();

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

  const cart = cartEntries;

  const prod_id = Object.keys(cart)[0];

  useEffect(() => {
    if (cart[prod_id]?.product?.company?.id) {
      getTermConditionData(cart[prod_id].product.company.id, setTerm);
    }
  }, []);

  return (
    <>
      <Page
        noNavbarForMobile={true}
        id={"proposalSummaryPage"}
        backButton={backButtonForNav}
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

            <div class="quotes_compare_buttons_div">
              <div
                className="row btn_p_summary_pay_now d-flex align-items-center"
                onClick={() => checked && onClick()}
                css={`
                  background: ${PrimaryColor} !important;
                `}
              >
                <div class="col-md-4 position-relative">
                  {show && (
                    <MultipleWrapper>
                      <PayList>
                        {policyStatus &&
                          policyStatus.map(item => (
                            <PayItem>
                              <ItemName>{item?.product?.name}</ItemName>
                              <PayButton
                                PrimaryColor={PrimaryColor}
                                style={{
                                  cursor: "pointer",
                                  backgroundColor:
                                    item.payment_status === "success"
                                      ? "#ffbf66"
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
                                  ₹{" "}
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
                <div class="col-md-8">
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
                    <p class="p_dark_f_a" style={{ marginBottom: "unset" }}>
                      <span class="font_weight_normal text-white">
                        {amount(totalPremium)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MobileHeader
          css={`
            background: ${PrimaryColor};
          `}
        >
          <Link to={getUrlWithEnquirySearch("/proposal")}>
            <MobileHeaderText>
              <i
                class="fa fa-arrow-circle-left"
                style={{ marginRight: "10px", cursor: "pointer" }}
              ></i>{" "}
              Review
            </MobileHeaderText>
          </Link>
        </MobileHeader>

        <div className="container-fluid mt-20 ">
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
                    backPath={getUrlWithEnquirySearch("/proposal")}
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
                <div className="row margin_top_tab_proposal">
                  <div class="col-lg-12 col-md-12 no-padding-mobile">
                    <div className="signUp-page signUp-minimal pb-70">
                      <div className="-wrapper pad_proposal_s mt-2">
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
        margin-bottom: 20px;
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
      <ContentSection>
        {checkBoxContentArray?.map((item, index) => (
          <div>
            <p key={index}>
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
                        currentState?.filter(singleItem => singleItem !== item),
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

  const brochure_url = (productBrochureQuery.data || [])[0]?.brochure_url;

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
        href={brochure_url}
        target="_blank"
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
