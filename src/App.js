import { Switch, Route, Redirect } from "react-router-dom";
import InputPage from "./pages/InputPage/InputPage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import QuotesPage from "./pages/quotePage/QuotesPage";
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
            company_alias: "max_bupa",
            deductible: 1000000,
            features: [],
            mandatory_riders: [],
            premium: 627,
            product: {
              id: 52,
              name: "Health Recharge",
              company: {
                alias: "max_bupa",
                csr: [87.08],
                id: 5,
                name: "Niva Bupa Health Insurance",
              },
              insurance_type: {
                alias: "top_up",
                id: 2,
                name: "Top Up Insurance",
              },
            },
            sum_insured: 4000000,
            tax_amount: 113,
            tenure: 1,
            total_premium: 740,
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
  );
}

export default App;

function LazyLoad({ children }) {
  return <Suspense fallback={<FullScreenLoader />}>{children}</Suspense>;
}
