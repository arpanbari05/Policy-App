import { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useFrontendBoot } from "../src/customHooks";
import { FullScreenLoader, LoadCart } from "./components";
import { BaseComponent } from "./components/BaseComponent";
import CheckPolicies from "./components/Common/CheckPolicies";
import NotFoundPage from "./components/Common/NotFoundPage/NotFoundPage";
import ChooseYourJourneyPage from "./pages/ChooseYourJourneyPage/ChooseYourJourneyPage";
import ComparePage from "./pages/ComparePage";
import InputPage from "./pages/InputPage/InputPage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import QuotesPage from "./pages/quotePage/";
import ShortlistedQuotes from "./pages/ShortlistedPage/shortlistedQuotes";
const ProposalPage = lazy(() => import("./pages/ProposalPage/ProposalPage"));
const ProposalSummary = lazy(() =>
  import("./pages/ProposalSummary/ProposalSummary"),
);

const ThankYouPage = lazy(() => import("./pages/ThankYouPage/ThankYouPage"));

function App() {
  const {
    data: { tenant },
  } = useFrontendBoot();

  console.log("nothing");

  return (
    <Suspense fallback={<FullScreenLoader />}>
      <CheckPolicies>
        <Switch>
          <Route
            path="/"
            component={() => <BaseComponent tenant={tenant} />}
            exact
          ></Route>
          <Route path={"/choose-your-journey"}>
            {tenant?.alias === "fyntune" ? (
              <ChooseYourJourneyPage />
            ) : (
              <Redirect to={"/"} />
            )}
          </Route>
          <Route exact path="/input/:currentForm" component={InputPage} />
          <Route exact path="/quotes/:groupCode">
            <LoadCart>
              <QuotesPage />
            </LoadCart>
          </Route>
          <Route exact path="/shortlisted/:groupCode">
            <ShortlistedQuotes />
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
      </CheckPolicies>
    </Suspense>
  );
}

export default App;
