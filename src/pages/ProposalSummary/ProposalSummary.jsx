import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import "./ProposalSummary.scss";
import ProposalCheckBox from "../../components/Common/ProposalSummary/summaryCheckBox";
import SummaryTab from "../ProposalPage/components/SummaryTab/SummaryTab";
import { starSchema } from "../ProposalPage/ProposalDetailsSchema";
import { getProposalFields } from "../ProposalPage/schema.slice";
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
import ReviewCart from "../ProductDetails/components/ReviewCart";
const ProposalSummary = ({ history }) => {
  let groupCode  = useSelector(({quotePage}) => quotePage.selectedGroup);
  const { currentSchema } = useSelector(state => state.schema);
  const { proposalData, policyStatus, policyLoading } = useSelector(
    state => state.proposalPage,
  );
  const { proposerDetails } = useSelector(state => state.greetingPage);
  const [show, setShow] = useState(false);
  const [termShow, setTermShow] = useState(false);
  const { frontendData } = useSelector(state => state.frontendBoot);

  const [allFields, setAllFields] = useState([]);
  const url = useUrlQuery();
  const enquiryId = url.get("enquiryId");
  const dispatch = useDispatch();

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
  const onClick = mobile => {
    if (
      frontendData?.data?.settings?.journey_type === "single" &&
      (checked || mobile)
    ) {
      setShow(prev => !prev);
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
    if (checked) {
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
  const cart = useSelector(state => state.cart);
  // if (!Object.keys(proposalData).length) {
  //   return <Redirect to="/proposal" />;
  // } else
  return (
    <>
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
            />{" "}
            <span className="Iaccept">I Accept the&nbsp;</span>
            <span class="TermsAndConditions" style={{cursor: 'pointer'}} onClick={() => setTermShow(true)}> Terms &amp; Conditions </span>
{termShow && <TermModal show={termShow} handleClose={()=>{setTermShow(false)}}/>}

          </div>
          {show && (
            <MultipleWrapper>
              <PayList>
                {policyStatus &&
                  policyStatus.map(item => (
                    <PayItem>
                      <ItemName>{item?.product?.name}</ItemName>
                      <PayButton
                        onClick={() => {
                          singlePay(item.proposal_id);
                        }}
                      >
                        <span>Pay Now </span>
                        <div>{item.total_premium}</div>
                      </PayButton>
                    </PayItem>
                  ))}
              </PayList>
            </MultipleWrapper>
          )}
          <div class="quotes_compare_buttons_div">
            <div
              class="row btn_p_summary_pay_now"
              onClick={() => checked && onClick()}
            // style={{ margin: "0 25px" }}
            >
              <div class="col-md-6"
  
              >
                <button disabled={!checked && true} class="btn btn_p_s_pay_now" style={{fontSize: "16px",width:"max-content",paddingTop: "8px"}}>
                  Pay Now {" "}
                </button>
              </div>
              <div class="col-md-6">
                <div
                  disabled={!checked && true}
                  css={`
                      color: #fff;
                      display:flex;
                      flex-direction: column;
                      align-items: center;
                      `}
                >
                  <span>Total Premium</span>
                  <p class="p_dark_f_a" style={{marginBottom:"unset"}}>
                    <span class="font_weight_normal text-white">
                      ₹ {cart?.totalPremium}
                    </span>
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileHeader>
        <MobileHeaderText

          onClick={() => {
            history.goBack();
          }}
        >
          <i class="fa fa-arrow-left" style={{marginRight:"10px",cursor:"pointer"}}></i> Review
        </MobileHeaderText>
      </MobileHeader>

      <div className="container-fluid mt-20 ">
        <div className="element-section "
          css={`
         margin: 30px;
         padding-bottom: 150px;

         @media (max-width: 769px) {
           margin:0px !important;
           margin-top: 10px !important;
         }
       `}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}
          css={`
            
            @media(max-width:769px){
              display:none !important;
            }
          `}
          >
            <div className="col-lg-2">
              {/* <p
                class="go_back_prposal_p summary_proposal_back"
                style={{ zIndex: 100 }}
                onClick={() => history.goBack()}
              >
                <i class="icon flaticon-back" style={{ width: "27px" }}></i> Go
                Back
              </p> */}
              <button
                className="btn"
                type="button"
                onClick={() => {
                  history.goBack();
                }}
                css={`
                width: max-content;
                margin-left: -9px;

                color: var(--abc-red);
                font-size: 17px;
                display: flex;
                align-items: center;
              `}
              >
                <div
                  className="d-flex justify-content-center align-items-center"
                  css={`
                  background: #f1f4f8;
                  width: 35px;
                  margin-right: 20px;
                  border-radius: 100%;
                  height: 35px;
                  color: #707b8b;
                `}
                >
                  <i className="fas fa-chevron-left"></i>
                </div>
                <span
                  css={`
                  color: #3b4c69;
                  font-weight: 600;
                `}
                >
                  Go Back
                </span>
              </button>


            </div>

            <div class="col-lg-10 element-tile-two">
              <p
                css={`
                  /* @media (min-width: 768px) and (max-width: 900px) {
                    font-size: 18px;
                    text-align: center;
                    position: absolute;
                    left: 22.5%;
                  } */
                  @media (min-width: 1024px) and (max-width: 1200px) {
                    font-size: 18px;
                    text-align: center;
                    position: absolute;
                    left: 28%;
                  }
                  @media(max-width: 1023px){
                    display:none;
                  }
                `}
              >
                {" "}
                Hi {proposerDetails?.name.split(" ")[0]}, please review your
                proposal details before you proceed
              </p>
            </div>
          </div>

          <br className="hide-on-mobile" />
          <Row 
          css={`
          @media (max-width: 1023px){
            flex-direction: column;
          }
          `}
          >
            <Col md={3}
             css={`
             padding:0px;
             @media (max-width: 1023px){
              width: 100%;
             }
             `}
            >
              <SummaryWrapper>
                <ProductSummary cart={cart} />
                {/* {
                groupCode?<ReviewCart groupCode={groupCode} unEditable={true} />:""
              }  */}
              </SummaryWrapper>
            </Col>
            <Col md={9}
             css={`
             @media (max-width: 1023px){
              width: 100%;
             }
             `}
            >
              <div className="row margin_top_tab_proposal">
                <div class="col-lg-12 col-md-12 no-padding-mobile">
                  <div className="signUp-page signUp-minimal pb-70">
                    <p
                      css={`
                    display: none;
                    @media (max-width: 1023px) {
                      display: flex;
                      justify-content: center;
                      margin-top: 20px;
                      font-size: 14px;
                      line-height: 1.2;
                      text-align: center;
                      padding: 0px 20px;
                    }
                  `}
                    >
                      Hi {proposerDetails?.name.split(" ")[0]}, please review your
                      proposal details before you proceed
                    </p>
                    <div className="-wrapper pad_proposal_s">
                      {allFields ? (
                        allFields.map((item, index) => {
                          return (
                            <SummaryTab
                              key={item}
                              title={item}
                              data={currentSchema[item]}
                              values={proposalData[item]}
                              index={index}
                            ></SummaryTab>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ProductSummaryTab cart={cart} />
              </div> */}
                </div>
                {/* <ProposalSummaryTab
                checked={checked}
                onChange={() => setChecked(!checked)}
                setTotalPremium={() => {}}
                onPayment={onClick}
              /> */}
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
  right: 60px;
  border-radius: 8px;
  bottom: 100%;
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
  background-color: #0a87ff;
  text-align: center;
  border-radius: 0 6px 6px 0px;
  & span {
    display: inline-block;
  }
`;
