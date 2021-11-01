import React, { useEffect, useState } from "react";
import { Col, Modal } from "react-bootstrap";
import styled from "styled-components";
import "./Scss/SeeDetails.scss";
import SeeDetailsTab2 from "./components/Tabs/SeeDetailsTab2";
import SeeDetailsTab from "./components/Tabs/SeeDetailsTab";
import PlanDetails from "./DataSet/PlanDetails";
import ClaimProcess from "./DataSet/ClaimProcess";
import CashlessHospital from "./DataSet/CashlessHospital/CashlessHospital";
import AddOnCoverages from "./DataSet/AddOnCoverages/AddOnCoverages";
import AboutCompany from "./DataSet/AboutCompany";
import { useDispatch, useSelector } from "react-redux";
import SeeDetailsFooter from "./components/SeeDetailsFooter/SeeDetailsFooter";

// import { getAbhiRidersApi, getRidersApi } from "../../QuotesPage/ServiceApi/serviceApi";
import { useRouteMatch, useParams } from "react-router-dom";
import {
  getAboutCompany,
  getClaimProcess,
  getFeatures,
  getHospitals,
  getProductBrochureAPI,
} from "./serviceApi";
import "styled-components/macro";
import Header from "./MobileComponents/Header";
import SeeDetailsTopMobile from "./MobileComponents/SeeDetailsTopMobile";
import SeedetailFooterMobile from "./MobileComponents/SeedetailFooterMobile";
import "./Seedetails.css";

import { requestDetails, requestDetailsSuccess } from "./seeDetails.slice";
import SeeDeatailsTabMobile from "./MobileComponents/SeeDeatailsTabMobile";
import PlanDetailsMobile from "./MobileComponents/PlanDetailsMobile";
import AddOnCoverageMobile from "./MobileComponents/AddOnCoverageMobile/AddOnCoverageMobile";
import CashlessHospitalMobile from "./MobileComponents/Cashless Hospitals/CashlessHospitalMobile";
import ClaimprocessMobile from "./MobileComponents/ClaimProcessMobile/ClaimprocessMobile";
import AboutCompanyMobile from "./MobileComponents/AboutCompanyMobile/AboutCompanyMobile";
import { getAbhiRidersApi, getRidersApi } from "../quotePage/serviceApi";
import { addSelectedRiders } from "../quotePage/quote.slice";
import { AiOutlineClose } from "react-icons/ai";

export const getRiders = async (
  { productId, sum_insured, tenure, group },

  callback = () => {}
) => {
  console.log(productId, "agsdasgd2");
  try {
    const response = await getRidersApi({
      productId,
      sum_insured,
      tenure,
      group,
    });
    if (response.message) {
      callback(null, response.message);
      return;
    }
    callback(response.data);
  } catch (error) {
    alert(error);
    console.error(error);
  }
};

export const getAbhiRiders = async (
  { productId, sum_insured, tenure, group, string },
  callback = () => {}
) => {
  try {
    const response = await getAbhiRidersApi({
      productId,
      sum_insured,
      tenure,
      group,
      string,
    });
    if (response.message) {
      callback(null, response.message);
      return;
    }
    callback(response.data);
  } catch (error) {
    alert(error);
    console.error(error);
  }
};

const getHospitalsData = async ({ company_alias }, callback = () => {}) => {
  const { data } = await getHospitals(company_alias);
  let hospitals = data?.data || [];
  let searchByName = {};
  let searchByPincode = {};
  const displayHospitals = hospitals.slice(0, 6);
  hospitals.forEach((item) => {
    searchByName = {
      ...searchByName,
      ...{
        [item.name]: [
          ...(searchByName[item.name] ? searchByName[item.name] : []),
          item,
        ],
      },
    };
    searchByPincode = {
      ...searchByPincode,
      ...{
        [item.pincode]: [
          ...(searchByPincode[item.pincode]
            ? searchByPincode[item.pincode]
            : []),
          item,
        ],
      },
    };
  });
  const rows = displayHospitals.reduce(function (rows, key, index) {
    return (
      (index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows
    );
  }, []);

  callback({
    displayHospitals: rows,
    searchByName,
    searchByPincode,
    hospitals,
  });
};

const getProductBrochure = async ({ productId }, callback = () => {}) => {
  const { data } = await getProductBrochureAPI({ productId });
  callback(data);
};

const SeeDetails = ({
  handleClose,
  show,
  quote,
  sum_insured,
  tenure,
  product,
}) => {
  console.log("ahaheh3h2h32", quote);

  const [addedRiders, setAddedRiders] = useState([]);
  const dispatch = useDispatch();
  const { groupCode } = useParams();
  const [activeFieldset, setActiveFieldset] = useState(1);

  /*========================================================= */

  // const sumInsuredIndex = quote.sum_insured.indexOf(sum_insured);

  // const { isLoading, addAddOn, addRider, totalPremium } = useProduct({
  //   premium: quote.premium[sumInsuredIndex],
  //   sumInsured: sum_insured,
  //   tax_amount: quote.tax_amount[sumInsuredIndex],
  //   tenure: quote.tenure[sumInsuredIndex],
  //   total_premium: quote.total_premium[sumInsuredIndex],
  //   product: {
  //     ...quote.product,
  //     company: {
  //       alias: quote.company_alias,
  //     },
  //   },
  // });

  const {
    id: company_id,
    short_name: company_name,
    logo,
    csr: claim_settlement_ratio,
  } = useSelector(
    (state) =>
      state.frontendBoot.frontendData.data.companies[quote.company_alias]
  );

  const { selectedPlan } = useSelector((state) => state.quotePage);

  const { selectedRiders } = useSelector((state) => state.quotePage);

  const getPlanDetails = async (
    { productId, sum_insured },
    callback = () => {}
  ) => {
    const { data } = await getFeatures(productId);
    let featureList = [];
    let innerData = {};
    data?.forEach((item, index) => {
      featureList.push({
        id: index + 1,
        title: item.name,
        description: item.description,
      });
      item?.sum_insureds[sum_insured]?.features?.forEach((innerItem) => {
        innerData[item.name] = [
          ...(innerData[item.name] ? innerData[item.name] : []),
          {
            header: innerItem.title,
            short_description: innerItem.short_description,
            description: innerItem.description,
            value: innerItem.feature_value,
            icon: innerItem.other_icon,
            is_visible: innerItem.is_visible,
          },
        ];
      });
    });
    callback({ featureList, innerData });
  };

  const getClaimProcessData = async (company_id, callback = () => {}) => {
    try {
      const { data } = await getClaimProcess(company_id);

      callback(data);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  const getAboutCompanyData = async (company_id, callback = () => {}) => {
    try {
      const { data } = await getAboutCompany(company_id);

      callback(data);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  /*========================================================= */
  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade, SecondaryShade } = theme;
  const [riders, setRiders] = useState([]);
  const [planDetails, setPlanDetails] = useState({});
  const [hospitals, setHospitals] = useState({});
  const [claimProccess, setClaimProccess] = useState({});
  const [aboutCompany, setAboutCompany] = useState({});
  const [brochureUrl, setBrochureUrl] = useState("");
  const [policyWordingUrl, setPolicyWordingUrl] = useState("");
  const [hey, sethey] = useState("");
  console.log(show, "sgdagsd");
  useEffect(() => {
    const getdetails = async () => {
      if (show === 4) {
        dispatch(requestDetails());
        await getPlanDetails(
          { productId: quote.product.id, sum_insured: sum_insured },
          setPlanDetails
        );
        setActiveFieldset(3);
      }
    };
    getdetails();
  }, []);

  useEffect(() => {
    const getdetails = async () => {
      if (activeFieldset === 1 && !Object.keys(planDetails).length) {
        dispatch(requestDetails());
        await getPlanDetails(
          { productId: quote.product.id, sum_insured: sum_insured },
          setPlanDetails
        );
        await getProductBrochure({ productId: quote.product.id }, (data) => {
          if (data) {
            if (data[0]) {
              sethey(data[0]);
              setBrochureUrl(data[0].brochure_url);
              setPolicyWordingUrl(data[0].policy_wording_url);
            }
          }
        });

        dispatch(requestDetailsSuccess());
      }
      if (activeFieldset === 2) {
        dispatch(requestDetails());
        console.log("hehehehhe", quote.product.id);
        await getRiders(
          {
            productId: quote.product.id,
            sum_insured,
            tenure,
            group: groupCode,
          },
          (riders) => {
            console.log(riders, "sadg32");
            const fltriders = riders.data
              .filter((rider) => rider.total_premium !== 0 || rider.options)
              .map((rider) => ({ ...rider, rider_id: rider.id }));
            setRiders(fltriders);
          }
        );
        dispatch(requestDetailsSuccess());
      }
      if (activeFieldset === 3 && Object.keys(planDetails).length) {
        dispatch(requestDetails());
        await getHospitalsData(
          { company_alias: quote.company_alias },
          setHospitals
        );
        dispatch(requestDetailsSuccess());
      }

      if (activeFieldset === 4 && company_id) {
        dispatch(requestDetails());
        await getClaimProcessData(company_id, setClaimProccess);
        dispatch(requestDetailsSuccess());
      }
      if (activeFieldset === 5 && company_id) {
        dispatch(requestDetails());
        await getAboutCompanyData(company_id, setAboutCompany);
        dispatch(requestDetailsSuccess());
      }
    };
    getdetails();
  }, [activeFieldset]);
  console.log(planDetails, "sadg321");
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Modal
        className="see-details"
        backdropClassName="ModalBackdrop"
        show={show}
      >
        {console.log(show, "newnenwenw")}
        <Modal.Body
          className="background_transparent p-lg showOnDesktop"
          style={{
            marginBottom: "100px",
            // background:
            //   "rgba(0, 0, 0, 0) linear-gradient(156deg, rgb(250, 250, 252) 0%, rgb(250, 250, 252) 60%, rgb(255, 235, 235) 106%) repeat scroll 0% 0%",
            backgroundColor: "var(--background-gray)",
          }}
          css={`
            @media (max-width: 767px) {
              display: none;
            }
          `}
        >
          <div>
            <CloseButton
              type="button"
              className="btn btn-white recom_close_css"
              onClick={handleClose}
            >
              <i class="fas fa-times"></i>
            </CloseButton>
          </div>
          <Col lg={12} className="m-auto">
            <SeeDetailsTab
              activeFieldset={activeFieldset}
              setActiveFieldset={setActiveFieldset}
              logo={logo}
            />
            {/* <SeeDetailsTab2
              activeFieldset={activeFieldset}
              setActiveFieldset={setActiveFieldset}
              logo={logo}
            /> */}

            <div className="tab-container z-container DangerStyles">
              <PlanDetails
                ActiveMainTab={activeFieldset === 1 ? true : false}
                planDetails={planDetails}
                brochureUrl={brochureUrl}
                policyWordingUrl={policyWordingUrl}
              />
              {activeFieldset === 2 && (
                <AddOnCoverages
                  ActiveMainTab={activeFieldset === 2 ? true : false}
                  quote={quote}
                  sum_insured={sum_insured}
                  tenure={tenure}
                  product={product}
                  riders={riders}
                  setRiders={setRiders}
                  setAddedRiders={setAddedRiders}
                />
              )}
              <CashlessHospital
                ActiveMainTab={activeFieldset === 3 ? true : false}
                hospitals={hospitals}
                company={quote.company_alias}
              />
              <ClaimProcess
                ActiveMainTab={activeFieldset === 4 ? true : false}
                claimProccess={claimProccess}
                claimform={hey}
              />
              <AboutCompany
                ActiveMainTab={activeFieldset === 5 ? true : false}
                aboutCompany={aboutCompany}
                company_name={company_name}
              />
            </div>
          </Col>
        </Modal.Body>

        {/* tablet view */}
        <Modal.Body
          className="background_transparent p-lg hideOnDesktop"
          style={{
            backgroundColor: "#f3f4f9",
            minHeight: "100vh",
            padding: "0px",
          }}
          css={`
            @media (max-width: 767px) {
              display: none;
            }
          `}
        >
          <div>
            <SeeDetailsTopMobile
              style={{ top: "0px" }}
              logo={logo}
              companyName={company_name}
              claim_settlement_ratio={claim_settlement_ratio}
              quote={quote}
              sum_insured={sum_insured}
              sumInsured={selectedPlan?.sum_insured}
            />

            <div
              css={`
            position: absolute;
    right: 33px;
    cursor: pointer;
    font-size: 18px;
    padding: 3px 8px;
    z-index: 9999;
    top: 35px;
}
        `}
            >
              <i
                onClick={handleClose}
                style={{ cursor: "pointer" }}
                class="fas fa-times"
              ></i>
            </div>
            <SeeDetailsTab
              activeFieldset={activeFieldset}
              setActiveFieldset={setActiveFieldset}
              logo={logo}
            />
          </div>
          <div className="tab-container z-container">
            <PlanDetailsMobile
              ActiveMainTab={activeFieldset === 1 ? true : false}
              planDetails={planDetails}
              brochureUrl={brochureUrl}
              policyWordingUrl={policyWordingUrl}
            />
            <AddOnCoverageMobile
              ActiveMainTab={activeFieldset === 2 ? true : false}
              quote={quote}
              sum_insured={sum_insured}
              tenure={tenure}
              product={product}
              riders={riders}
              setAddedRiders={setAddedRiders}
            />
            <CashlessHospitalMobile
              ActiveMainTab={activeFieldset === 3 ? true : false}
              hospitals={hospitals}
            />
            <ClaimprocessMobile
              ActiveMainTab={activeFieldset === 4 ? true : false}
              claimProccess={claimProccess}
              claimform={hey}
            />
            <AboutCompanyMobile
              ActiveMainTab={activeFieldset === 5 ? true : false}
              aboutCompany={aboutCompany}
              company_name={company_name}
            />
          </div>
          <Modal.Footer
            style={{
              position: "sticky",
              bottom: "0px",
              backgroundColor: "#fff",
            }}
          >
            <SeedetailFooterMobile
              quote={quote}
              sum_insured={sum_insured}
              logo={logo}
              companyName={company_name}
              sumInsured={selectedPlan?.sum_insured}
              premium={selectedPlan?.total_premium}
              productName={selectedPlan?.product?.name}
              selectedRiders={addedRiders}
              selectedPlan={selectedPlan}
              handleProceedClick={() => {
                dispatch(addSelectedRiders(addedRiders));
              }}
            />
          </Modal.Footer>
        </Modal.Body>

        {/* mobile view */}
        <ModalBodyMobile
          className="showOnMobile"
          style={{ backgroundColor: "#f3f4f9", minHeight: "100vh" }}
        >
          {/* <Header /> */}
          <StyledHeader PrimaryColor={PrimaryColor}>
            <a>
              <i
                class="fas fa-arrow-circle-left"
                onClick={handleClose}
                aria-hidden="true"
              ></i>

              <span> See Details</span>
            </a>
          </StyledHeader>

          <SeeDetailsTopMobile
            logo={logo}
            companyName={company_name}
            claim_settlement_ratio={claim_settlement_ratio}
            quote={quote}
            sum_insured={sum_insured}
            sumInsured={selectedPlan?.sum_insured}
          />
          <SeeDeatailsTabMobile
            activeFieldset={activeFieldset}
            setActiveFieldset={setActiveFieldset}
          />
          <div
            className="tab-container z-container"
            style={{ paddingBottom: "100px" }}
          >
            <PlanDetailsMobile
              ActiveMainTab={activeFieldset === 1 ? true : false}
              planDetails={planDetails}
              brochureUrl={brochureUrl}
              policyWordingUrl={policyWordingUrl}
            />
            <AddOnCoverageMobile
              ActiveMainTab={activeFieldset === 2 ? true : false}
              quote={quote}
              sum_insured={sum_insured}
              tenure={tenure}
              product={product}
              riders={riders}
              setAddedRiders={setAddedRiders}
            />
            <CashlessHospitalMobile
              ActiveMainTab={activeFieldset === 3 ? true : false}
              hospitals={hospitals}
            />
            <ClaimprocessMobile
              ActiveMainTab={activeFieldset === 4 ? true : false}
              claimProccess={claimProccess}
              claimform={hey}
            />
            <AboutCompanyMobile
              ActiveMainTab={activeFieldset === 5 ? true : false}
              aboutCompany={aboutCompany}
              company_name={company_name}
            />
          </div>
          <Modal.Footer
            style={{
              position: "fixed",
              width: "100%",
              bottom: "0px",
              padding: "10px !important",
              boxShadow: "0px -1px 5px #c2cbde",
              backgroundColor: "#fff",
            }}
          >
            <SeedetailFooterMobile
              quote={quote}
              sum_insured={sum_insured}
              logo={logo}
              companyName={company_name}
              sumInsured={selectedPlan?.sum_insured}
              premium={selectedPlan?.total_premium}
              productName={selectedPlan?.product?.name}
              selectedRiders={addedRiders}
              selectedPlan={selectedPlan}
              handleProceedClick={() => {
                dispatch(addSelectedRiders(addedRiders));
              
              }}
            handleCloseSeeDetail={handleClose}
            />
          </Modal.Footer>
        </ModalBodyMobile>
      </Modal>

      <SeeDetailsFooter
        handleClose={handleClose}
        quote={quote}
        sum_insured={sum_insured}
        logo={logo}
        claim_settlement_ratio={claim_settlement_ratio}
        companyName={company_name}
        sumInsured={selectedPlan?.sum_insured}
        premium={selectedPlan?.total_premium}
        productName={selectedPlan?.product?.name}
        selectedRiders={addedRiders}
        selectedPlan={selectedPlan}
        handleProceedClick={() => {
          dispatch(addSelectedRiders(addedRiders));
        }}
      />
    </div>
  );
};

export default SeeDetails;

const CloseButton = styled.button`
  position: absolute;
  border-radius: 50%;
  z-index: 9999;
  right: 36px;
  top: 15px;
`;

const ModalBodyMobile = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: block;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  color: #fff;

  position: sticky;
  z-index: 9999;
  top: 0px;
  height: 57px;
  & a {
    margin-left: 10px;
    color: #fff;
  }

  background: ${props=>props.PrimaryColor};
  align-items: center;
  justify-content: space-between;
`;
