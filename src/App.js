import { useEffect, useState } from "react";
import { useLocation, Switch, Route } from "react-router-dom";
import { InputPage } from "./pages/InputPage/InputPage";
import ComparePage from "./pages/ComparePage/ComparePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import Navbar from "./components/Navbar";
import { fetchFrontendData } from "./FrontendBoot/reducer/frontendBoot.slice";
import { useDispatch, useSelector } from "react-redux";
import QuotePage from "./pages/quotePage/QuotePage";
import { setShouldFetchQuotes } from "./pages/quotePage/quote.slice";
import { setShoutGetCompare } from "./pages/ComparePage/compare.slice";

import { getProposerDetails } from "./pages/InputPage/greetingPage.slice";
import { getCart } from "./pages/Cart/cart.slice";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { proposerDetails } = useSelector((state) => state.greetingPage);
  const { frontendData } = useSelector((state) => state.frontendBoot);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchFrontendData()).then(() => {
      if (pathname === "/") setIsLoading(false);
      if (pathname.slice(0, 8) === "/compare") {
        dispatch(setShoutGetCompare(true));
      }
      if (pathname !== "/") {
        dispatch(setShouldFetchQuotes(true));
      }
      // dispatch(setShouldFetchQuotes(true));
      if (pathname !== "/" && Object.keys(proposerDetails || {}).length < 1) {
        Promise.allSettled([
          dispatch(getCart),
          dispatch(getProposerDetails()),
        ]).then(() => setIsLoading(false));
      }
    });
  }, []);

  if (isLoading)
    return (
      <>
        <Navbar />
        Loading...
      </>
    );

  return Object.keys(frontendData || {}).length > 0 ? (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={InputPage} />
        <Route exact path="/quotes/:groupCode" component={QuotePage} />
        <Route exact path="/compare/:groupCode" component={ComparePage} />
      </Switch>
    </>
  ) : (
    <>
      <Navbar />
      loading....
    </>
  );
}

export default App;
