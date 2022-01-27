import { Switch, Route, Redirect } from "react-router-dom";
import InputPage from "./pages/InputPage/InputPage";
import ThankYouPage from "./pages/ThankYouPage/ThankYouPage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProposalPage from "./pages/ProposalPage/ProposalPage";
import ProposalSummary from "./pages/ProposalSummary/ProposalSummary";
import ComparePage from "./pages/ComparePage/ComparePage";
import QuotesPage from "./pages/quotePage/QuotesPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/input/basic-details" />
      </Route>
      <Route exact path="/input/:currentForm" component={InputPage} />
      <Route exact path="/quotes/:groupCode" component={QuotesPage} />
      <Route exact path="/compare/:groupCode" component={ComparePage} />
      <Route exact path="/proposal" component={ProposalPage} />
      <Route exact path="/proposal_summary" component={ProposalSummary} />
      <Route exact path="/thankyou/" component={ThankYouPage} />
      <Route
        exact
        path="/productdetails/:groupCode"
        component={ProductDetails}
      />
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
