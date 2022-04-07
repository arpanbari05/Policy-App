import { Switch, Route } from "react-router-dom";
import InputPage from "./pages/InputPage/InputPage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import QuotesPage from "./pages/quotePage/";
import { lazy } from "react";
import { Suspense } from "react";
import { FullScreenLoader, LoadCart } from "./components";
import ComparePage from "./pages/ComparePage";
import NotFoundPage from "./components/Common/NotFoundPage/NotFoundPage";
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
    <Suspense fallback={<FullScreenLoader />}>
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
          <LoadCart>
            <ProposalPage />
          </LoadCart>
        </Route>
        <Route exact path="/proposal_summary">
          <LoadCart>
            <ProposalSummary />
          </LoadCart>
        </Route>
        <Route exact path="/thankyou/">
          <ThankYouPage />
        </Route>
        <Route path="*" component={NotFoundPage} />
        {process.env.NODE_ENV === "development" && (
          <Route path={"/test"} exact>
            Hi
          </Route>
        )}
      </Switch>
    </Suspense>
  );
}

export default App;
