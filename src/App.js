import { Switch, Route, Redirect, Link } from "react-router-dom";
import InputPage from "./pages/InputPage/InputPage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import QuotesPage from "./pages/quotePage/";
import PageNotFound from "./pages/PageNotFound";
import { lazy } from "react";
import { Suspense } from "react";
import { FullScreenLoader } from "./components";
import ProductDetailsModal from "./components/ProductDetails/ProductDetailsModal";

const ComparePage = lazy(() =>
  import(
    /* webpackChunkName: compare-page */
    /* webpackPrefetch: true */
    "./pages/ComparePage/ComparePage"
  ),
);
const ProposalPage = lazy(() => import("./pages/ProposalPage/ProposalPage"));
const ProposalSummary = lazy(() =>
  import("./pages/ProposalSummary/ProposalSummary"),
);
const ThankYouPage = lazy(() => import("./pages/ThankYouPage/ThankYouPage"));

function App() {
  return (
    <>
      {/*<Link to={"/test"}>To test mode</Link>*/}
      
      <Switch>
        <Route path="/" exact>
          <Redirect from="/" to="/input/basic-details" />
        </Route>
        <Route exact path="/input/:currentForm" component={InputPage} />
        <Route exact path="/quotes/:groupCode" component={QuotesPage} />
        <Route
          exact
          path="/productdetails/:groupCode"
          component={ProductDetails}
        />
        <Route exact path="/compare/:groupCode">
          <LazyLoad>
            <ComparePage />
          </LazyLoad>
        </Route>
        <Route exact path="/proposal">
          <LazyLoad>
            <ProposalPage />
          </LazyLoad>
        </Route>
        <Route exact path="/proposal_summary">
          <LazyLoad>
            <ProposalSummary />
          </LazyLoad>
        </Route>
        <Route exact path="/thankyou/">
          <LazyLoad>
            <ThankYouPage />
          </LazyLoad>
        </Route>

        {/* <Route path={"/test"} exact>
          <ProductDetailsModal
            quote={{
              product: {
                id: 23,
                name: "Care Enhance 1",
                company: {
                  id: 1,
                  name: "Care Health Insurance",
                  alias: "care_health",
                  csr: [92.4],
                },
                insurance_type: {
                  id: 2,
                  name: "Top Up Insurance",
                  alias: "top_up",
                },
              },
              sum_insured: 200000,
              deductible: 200000,
              premium: 1481,
              total_premium: 1747,
              tenure: "1",
              tax_amount: 266,
              features: [
                {
                  name: "Room Rent",
                  code: "room_rent_charges",
                  icon: "https://health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/room%20rent.png",
                  is_featured_on_card: 1,
                  value: null,
                  short_description: null,
                  description: null,
                },
                {
                  name: "No Claim Bonus",
                  code: "no_claim_bonus",
                  icon: "https://health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/Renewal.png",
                  is_featured_on_card: 1,
                  value: null,
                  short_description: null,
                  description: null,
                },
                {
                  name: "Pre Existing Disease",
                  code: "pre_existing_disease_cover",
                  icon: "https://health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/waiting%20period.png",
                  is_featured_on_card: 1,
                  value: null,
                  short_description: null,
                  description: null,
                },
                {
                  name: "Plan Highlights",
                  code: "plan_highlights",
                  icon: "",
                  is_featured_on_card: 0,
                  value:
                    "•Sum Insured upto ₹ 55 Lakhs\n• In patient care\n• Tax Benefit\n• Cashless Treatment",
                  short_description: "",
                  description: "",
                },
                {
                  name: "Pre and Post Hospitalization",
                  code: "pre_and_post_hospitalization",
                  icon: "",
                  is_featured_on_card: 0,
                  value: "30 Days and 60 Days ",
                  short_description:
                    "Pre-hospitalization expenses means medical expenses incurred during pre-defined number of days before the Hospitalization and Post-hospitaliation expenses means medical expenses incurred for covered Hospitalisation, related and post discharge of the Insured Person.",
                  description: "",
                },
                {
                  name: "Room Rent Charges",
                  code: "room_rent",
                  icon: "",
                  is_featured_on_card: 0,
                  value: "Single Private A/C Room",
                  short_description:
                    "Room Rent means the amount charged by a Hospital towards Room and Boarding expenses and shall include the associated medical expenses",
                  description: "",
                },
                {
                  name: "No Claim Bonus",
                  code: "no_claim_bonus_2",
                  icon: "",
                  is_featured_on_card: 0,
                  value: "Not Covered",
                  short_description:
                    "No Claim Bonus means any increase or addition in the Sum Insured granted by the Insurer without any associated increase in premium in a claim free year.",
                  description: "",
                },
                {
                  name: "Other Benefits",
                  code: "other_benefits",
                  icon: "",
                  is_featured_on_card: 0,
                  value:
                    "1. Annual health check up is covered for all members\n2. Organ donor benefit covered upto Sum Insured\n3. Day care Treatment covered upto Sum Insured\n",
                  short_description:
                    "Following additional benefits are covered in this policy.",
                  description: "",
                },
                {
                  name: "Copayment",
                  code: "co_pay",
                  icon: "",
                  is_featured_on_card: 0,
                  value: "20% of claim amount for 61 Years and above ",
                  short_description:
                    "Co-payment means a cost sharing requirement that the Policy holder will bear a specified percentage of the admissible claim amount.",
                  description: "",
                },
                {
                  name: "Pre-Policy Medical Check Up",
                  code: "Pre_policy_check_up",
                  icon: "",
                  is_featured_on_card: 0,
                  value: "Required for 51 Years and above ",
                  short_description:
                    "The pre-policy medical checkup refers to the medical examination that is required before issuing the policy. ",
                  description: "",
                },
                {
                  name: "Specific Disease Waiting Period",
                  code: "specific_disease_waiting_period_2",
                  icon: "",
                  is_featured_on_card: 0,
                  value: "2 Years",
                  short_description:
                    "Required time span for which you have to wait before making a claim for specific diseases.",
                  description: "",
                },
                {
                  name: "Pre Existing Disease Waiting Period",
                  code: "ped_waiting_period",
                  icon: "",
                  is_featured_on_card: 0,
                  value: "4 Years",
                  short_description:
                    "Pre-Existing disease means any condition, ailment, injury or disease that is diagnosed or for which medical advice or treatment was recommended by, or received from, a physician prior to the effective date of the policy or its reinstatement.",
                  description: "",
                },
                {
                  name: "Major Exclusions",
                  code: "major_exclusions",
                  icon: "",
                  is_featured_on_card: 0,
                  value:
                    "• Non-allopathic treatment\n• Expenses attribute to self-destruction or self-inflicted Injury,attempted suicide or suicide while sane or insane\n•External congenital disease\n•Sterility and Infertility",
                  short_description:
                    "Medical Condition or a healthcare expense that is not covered under the policy.",
                  description: "",
                },
                {
                  name: "Co-Payment",
                  code: "Co_Payment",
                  icon: "https://health-admin-bucket.s3.ap-south-1.amazonaws.com/Feature_icons/1643706061-Co-payment.png",
                  is_featured_on_card: 1,
                  value: null,
                  short_description: null,
                  description: null,
                },
              ],
              company_alias: "care_health",
              mandatory_riders: [],
            }}
            onClose={() => {
              alert("I m in test mode buddy.");
            }}
          />
        </Route> */}
        <Route path="*" component={PageNotFound} />
        {process.env.NODE_ENV === "development" && (
          <Route path={"/test"} exact>
            Hi
          </Route>
        )}
      </Switch>
    </>
  );
}

export default App;

function LazyLoad({ children }) {
  return <Suspense fallback={<FullScreenLoader />}>{children}</Suspense>;
}
