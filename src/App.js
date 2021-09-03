import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { InputPage } from "./pages/InputPage/InputPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import Navbar from "./components/Navbar";
import { fetchFrontendData } from "./FrontendBoot/reducer/frontendBoot.slice";
import { useDispatch } from "react-redux";
import QuotePage from "./pages/quotePage/QuotePage";
import { setShouldFetchQuotes } from "./pages/quotePage/quote.slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFrontendData());

    dispatch(setShouldFetchQuotes(true));
  }, []);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={InputPage} />
        <Route exact path="/quotes" component={QuotePage} />
      </Switch>
    </Router>
  );
}

export default App;
