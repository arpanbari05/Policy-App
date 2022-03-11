import { Switch, Route, Redirect, useParams } from "react-router-dom";
import InputPage from "./pages/InputPage/InputPage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import QuotesPage from "./pages/quotePage/";
import { lazy } from "react";
import { Suspense } from "react";
import { FullScreenLoader, LoadCart } from "./components";
import ComparePage from "./pages/ComparePage";
import ErrorPage from "./components/Common/ErrorPage/ErrorPage";
import { useFrontendBoot } from "../src/customHooks";
import { BaseComponent } from "./components/BaseComponent";
const ProposalPage = lazy(() => import("./pages/ProposalPage/ProposalPage"));
const ProposalSummary = lazy(() =>
  import("./pages/ProposalSummary/ProposalSummary"),
);
const ThankYouPage = lazy(() => import("./pages/ThankYouPage/ThankYouPage"));

function App() {
  const {
    data: { tenant },
  } = useFrontendBoot();
  return (
    <Switch>
      <Route
        path="/"
        component={() => <BaseComponent tenant={tenant} />}
        exact
      ></Route>
      <Route exact path="/input/:currentForm" component={InputPage} />
      <Route exact path="/quotes/:groupCode">
        <LoadCart>
          <QuotesPage />
        </LoadCart>
      </Route>
      <Route exact path="/productdetails/:groupCode">
        <LoadCart>
          <ProductDetails />
        </LoadCart>
      </Route>
      <Route exact path="/compare/:groupCode">
        <ComparePage />
      </Route>
      <Route exact path="/proposal">
        <LazyLoad>
          <LoadCart>
            <ProposalPage />
          </LoadCart>
        </LazyLoad>
      </Route>
      <Route exact path="/proposal_summary">
        <LazyLoad>
          <LoadCart>
            <ProposalSummary />
          </LoadCart>
        </LazyLoad>
      </Route>
      <Route exact path="/thankyou/">
        <LazyLoad>
          <ThankYouPage />
        </LazyLoad>
      </Route>
      <Route path="*" component={ErrorPage} />

      {/* <Route path="*" component={PageNotFound} /> */}
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
