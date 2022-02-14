import { Switch, Route, Redirect } from "react-router-dom";
import InputPage from "./pages/InputPage/InputPage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import QuotesPage from "./pages/quotePage/QuotesPage";
import PageNotFound from "./pages/PageNotFound";
import { lazy } from "react";
import { Suspense } from "react";
import { FullScreenLoader } from "./components";

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
