import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CoverMobile from "./CoverMobile";
import InsurerMobile from "./InsurerMobile";
import PremiumMobile from "./PremiumMobile";
import PlanMobile from "./PlanMobile";
import MultiyearMobile from "./MultiyearMobile";
import {
  fetchQuotes,
  insurerFilter,
  premiumFilterCards,
  replaceFilterQuotes,
  replaceQuotes,
  setFilters,
} from "../../quote.slice";
import PopularFilterMobile from "./PopularFilterMobile";
import PreExistingMobile from "./PreExistingMobile";
import NoClaimMobile from "./NoClaimMobile";
const assignIndextoCode = moreFilter => {
  let x = {};
  moreFilter.forEach((item, index) => {
    x = { ...x, [item.code]: index };
  });
  return x;
};
const QuoteFilterMobile = ({
  setFilterMobile,
  companies,
  coverFilter,
  premiumFilter,
  planType,
  moreFilter,
}) => {
  const {
    covers,
    plantypes,
    defaultfilters: { cover: sum_insured, tenure, plan_type },
  } = useSelector(({ frontendBoot }) => frontendBoot.frontendData.data);
  const data = useSelector(
    ({ frontendBoot }) => frontendBoot.frontendData.data,
  );

  const { memberGroups, proposerDetails } = useSelector(
    state => state.greetingPage,
  );
  const sortedCompanies = companies.sort(
    (a, b) => data?.companies[b].csr - data?.companies[a].csr,
  );
  const dispatch = useDispatch();
  const codeIndexMapMoreFilter = assignIndextoCode(moreFilter);
  const {
    insurers,
    premium,
    cover,
    ownCover,
    planType: planTypeFilter,
    multiYear,
    moreFilters,
    basePlanType,
  } = useSelector(state => state.quotePage.filters);
  const { selectedGroup } = useSelector(state => state.quotePage);

  const handleMobileFilterUpdate = e => {
    e.preventDefault();
    dispatch(
      setFilters({
        multiYear: selectedYear,
        premium: selectedPremium,
        insurers: selectedInsurer,
        ownCover: customCover,
        cover: customCover ? "" : selectedCover,
        planType: selectedFloater,
        moreFilters: {
          popularFilter,
          preExisting,
          renewalBonus,
          others,
        },
      }),
    );
  };
  useEffect(() => {
    const thisSelectedCover = covers.filter(
      thisCover => thisCover.display_name === cover,
    );
     
    dispatch(replaceQuotes([]));
    dispatch(replaceFilterQuotes([]));
    console.log("fetctquotes quotefiltermobile")
    dispatch(
      fetchQuotes(companies, {
        plan_type: plantypes.find(filter => filter.display_name === planType)
          ?.code,
        tenure: parseInt(multiYear),
        sum_insured: ownCover
          ? `${ownCover}-${ownCover}`
          : thisSelectedCover[0].code,
        member: selectedGroup,
      }),
    );
  }, [multiYear, planType, cover, ownCover]);
  useEffect(() => {
    if (insurers) dispatch(insurerFilter(insurers));
  }, [insurers]);
  useEffect(() => {
    if (premium) dispatch(premiumFilterCards(premium));
  }, [premium]);
  const { member } = useSelector(
    ({ greetingPage }) => greetingPage.proposerDetails,
  );
  const [customCover, setCustomCover] = useState(ownCover);
  const [selectedInsurer, setSelectedInsurer] = useState(insurers);
  const [selectedPremium, setSelectedPremium] = useState(premium);
  const [selectedCover, setSelectedCover] = useState(ownCover || cover);
  const [selectedFloater, setSelectedFloater] = useState(planTypeFilter);
  const [selectedYear, setSelectedYear] = useState(multiYear);
  const [popularFilter, setPopularFilter] = useState(
    moreFilters.popularFilter || [],
  );
  const [preExisting, setPreExisting] = useState(moreFilters.preExisting || "");
  const [renewalBonus, setRenewalBonus] = useState(
    moreFilters.renewalBonus || "",
  );

  const [others, setOthers] = useState(moreFilters.others || []);

  const defaultfilters = {
    insurers: [],
    premium: "",
    cover: "3 to 5 Lacs",
    ownCover: "",
    planType:
      memberGroups[selectedGroup].length === 1
        ? "Individual"
        : proposerDetails.plan_type
        ? proposerDetails.plan_type === "M"
          ? "Multi Individual"
          : "Family Floater"
        : "Family Floater",
    multiYear: "1 Year",
    basePlanType: "Base health",
    moreFilters: {},
  };

  const handleClearFilters = () => {
   
    dispatch(setFilters(defaultfilters));
    // dispatch(
    //   fetchQuotes(companies?.companies, {
    //     sum_insured: cover,
    //     tenure,
    //     member: selectedGroup,
    //     plan_type:
    //       memberGroups[selectedGroup].length === 1
    //         ? "I"
    //         : proposerDetails.plan_type
    //         ? proposerDetails.plan_type === "M"
    //           ? "M"
    //           : "F"
    //         : "F",
    //   }),
    // );
    setFilterMobile(false);
  };
  console.log("cover..",selectedCover)
  return (
    <>
      <div className="mobile-filter-wrapper">
        <div className="shrt-menu shrt-menu-one light-bg text-dark">
          <div
            className="quotes_compare_container"
            style={{  height: "58px" }}
          >
            <div
              className="quotes_compare_container_wrapper"
              style={{
                maxWidth: "90%",
                justifyContent: "space-between",
                position: "relative",
                bottom: "12px",
              }}
            >
              <div>
                <a onClick={handleClearFilters}>
                  <p
                    className="total_premium_p_s_filter"
                    style={{
                      borderBottom: "1px dashed #667a65",
                      paddingBottom: "6px",
                    }}
                  >
                    Clear Filters
                  </p>
                </a>
              </div>
              <button
                className="btn-mobile-show-plan"
                onClick={e => {
                  // alert("clicked");
                  setFilterMobile(false);
                  handleMobileFilterUpdate(e);
                }}
              >
                Show plans
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center main-header shrt_without_h_w height_bg_red_r">
            <Col md={6}>
              <div onClick={() => setFilterMobile(false)}>
                <p className="text-white select_plan_options_p" style={{marginTop:"20px"}}>
                <i class="fa fa-arrow-left" aria-hidden="true"></i> Filters
                </p>
              </div>
            </Col>
          </div>
        </div>
        <div className="tabordion">
          <section id="section1">
            <input
              type="radio"
              name="sections"
              id="option1"
              defaultChecked={true}
            />
            <label htmlFor="option1">Insurers</label>
            <InsurerMobile
              sortedCompanies={sortedCompanies}
              data={data}
              selected={selectedInsurer}
              setSelected={setSelectedInsurer}
            />
          </section>
          <section id="section2">
            <input type="radio" name="sections" id="option2" />
            <label htmlFor="option2">Popular Filters</label>
            <PopularFilterMobile
              moreFilter={moreFilter}
              codeIndexMapMoreFilter={codeIndexMapMoreFilter}
              selected={popularFilter}
              setSelected={setPopularFilter}
            />
          </section>
          <section id="section3">
            <input type="radio" name="sections" id="option3" />
            <label htmlFor="option3">Cover</label>
            <CoverMobile
              coverFilter={coverFilter}
              selected={selectedCover}
              setSelected={setSelectedCover}
              ownCover={customCover}
              resetPremium={() => {
                setSelectedPremium("");
              }}
              setOwnCover={setCustomCover}
            />
          </section>
          <section id="section4">
            <input type="radio" name="sections" id="option4" />
            <label htmlFor="option4">Premium</label>
            <PremiumMobile
              premiumFilter={premiumFilter}
              selected={selectedPremium}
              setSelected={setSelectedPremium}
            ></PremiumMobile>
          </section>
          <section
            id="section5"           
          >
            <input type="radio" name="sections" id="option5" />
            <label htmlFor="option5">Plan Type</label>
            <PlanMobile
              planType={planType}
              member={member}
              selected={selectedFloater}
              setSelected={setSelectedFloater}
            ></PlanMobile>
          </section>
          <section id="section6">
            <input type="radio" name="sections" id="option6" />
            <label htmlFor="option6">Multiyear Options</label>
            <MultiyearMobile
              selected={selectedYear}
              member={member}
              setSelected={setSelectedYear}
            ></MultiyearMobile>
          </section>
          <section id="section7">
            <input type="radio" name="sections" id="option7" />
            <label htmlFor="option7">Pre-existing ailments</label>
            <PreExistingMobile
              selected={preExisting}
              setSelected={setPreExisting}
              moreFilter={moreFilter}
              codeIndexMapMoreFilter={codeIndexMapMoreFilter}
            />
          </section>
          <section id="section8">
            <input type="radio" name="sections" id="option8" />
            <label htmlFor="option8">No Claim Bonus</label>
            <NoClaimMobile
              selected={renewalBonus}
              setSelected={setRenewalBonus}
              moreFilter={moreFilter}
              codeIndexMapMoreFilter={codeIndexMapMoreFilter}
            />
          </section>
          <section id="section9">
            <input type="radio" name="sections" id="option9" />
            <label htmlFor="option9">Others</label>
            <article>
              <Row className=" mt--38">
                {moreFilter[codeIndexMapMoreFilter["others"]]?.options.map(
                  (item, index) => (
                    <Col md={12} className="padding-none">
                      <div className="inputGroup">
                        <input
                          id={"radio" + index + item.display_name}
                          name="radio-more-other"
                          type="checkbox"
                        />
                        <label
                          htmlFor={"radio" + index + item.display_name}
                          className="padding_ic_insure more-padding mobile-filter-label"
                        >
                          {item.display_name}
                        </label>
                      </div>
                    </Col>
                  ),
                )}
              </Row>
            </article>
          </section>
        </div>
      </div>
    </>
  );
};

export default QuoteFilterMobile;
