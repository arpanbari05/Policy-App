import "bootstrap/dist/css/bootstrap.min.css";
import { some } from "lodash";
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, useRouteMatch } from "react-router-dom";
import "styled-components/macro";
import {
  useGetCartQuery,
  useGetEnquiriesQuery,
  useGetFrontendBootQuery,
  useGetPoliciesQuery,
  useGetShortlistedQuotesQuery,
} from "./api/api";
import "./app.css";
import { store } from "./app/store";
import { FullScreenLoader, LoadEnquiries } from "./components";
import InternalServerErrorPage from "./components/ServerErrorPages/InternalServerErrorPage";
import MaintenancePage from "./components/ServerErrorPages/MaintenancePage";
import { useUrlQueries } from "./customHooks/useUrlQuery";
import { replaceShortlistedQuote } from "./pages/quotePage/quote.slice";
import { allowOnSpecificPages } from "./utils/helper";

function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLoaders>{children}</AppLoaders>
      </BrowserRouter>
    </Provider>
  );
}

export default AppProviders;

function AppLoaders({ children, ...props }) {
  const isRootRoute = useRouteMatch({ path: "/", exact: true });
  const searchQueries = useUrlQueries();

  const dispatch = useDispatch();

  const isBasicDetailsRoute = useRouteMatch({
    path: "/input/basic-details",
    exact: true,
  });
  const isPortabilityRoute = useRouteMatch({
    path: "/input/portability",
    exact: true,
  });
  const isRenewalDetailsRoute = useRouteMatch({
    path: "/input/renewal-details",
    exact: true,
  });

  const isChooseYourJourneyPage = useRouteMatch({
    path: "/choose-your-journey",
    exact: true,
  });
  const isTestRoute = useRouteMatch({ path: "/test" });

  const isQuoteRoute = useRouteMatch({ path: "/quotes" });
  const isProductDetailsRoute = useRouteMatch({ path: "/productdetails" });
  const isProposalRoute = useRouteMatch({ path: "/proposal" });
  const isProposalSummaryRoute = useRouteMatch({ path: "/proposal_summary" });

  const {
    isLoading,
    isUninitialized,
    error: serverError,
  } = useGetFrontendBootQuery(undefined, {
    skip: !!isTestRoute,
  });

  const {
    isLoading: isLoadingEnq,
    isFetching: isFetchingEnq,
    isUninitialized: isUninitializedEnq,
    isError: isErrorEnq,
  } = useGetEnquiriesQuery(undefined, { skip: !searchQueries.enquiryId });

  const { isLoading: isLoadingCart } = useGetCartQuery(undefined, {
    skip: !(
      isQuoteRoute ||
      isProductDetailsRoute ||
      isProposalRoute ||
      isProposalSummaryRoute
    ),
  });

  const { isLoading: isLoadingPolicy } = useGetPoliciesQuery(undefined, {
    skip:
      !searchQueries.enquiryId ||
      allowOnSpecificPages([
        "/basic-details",
        "/thankyou",
        "/portability",
        "/renewal-details",
      ]),
  });

  const { data, isFetching: isFetchingShortlisted } =
    useGetShortlistedQuotesQuery(undefined, {
      skip:
        !searchQueries.enquiryId ||
        !allowOnSpecificPages(["/quotes", "/shortlisted"]),
    });

  useEffect(() => {
    if (data) {
      dispatch(replaceShortlistedQuote(data?.data?.shortlisted_quotes || []));
    }
  }, [data]);

  if (isLoading || isUninitialized) return <FullScreenLoader />;

  if (serverError?.status === 503) return <MaintenancePage />;
  if (serverError?.status === 500 || serverError)
    return <InternalServerErrorPage />;

  if (
    some([
      isTestRoute,
      isRootRoute,
      isBasicDetailsRoute,
      isRenewalDetailsRoute,
      isChooseYourJourneyPage,
      isPortabilityRoute,
    ])
  )
    return children;

  if (isLoadingEnq || isUninitializedEnq || isFetchingEnq)
    return <FullScreenLoader />;

  if (isLoadingCart) return <FullScreenLoader />;

  if (isLoadingPolicy) return <FullScreenLoader />;

  if (isFetchingShortlisted) return <FullScreenLoader />;

  if (isErrorEnq) {
    sessionStorage.setItem("invalidEnquiry", 1);
    window.location.href = `${window.location.origin}/input/basic-details`;
  }

  return <LoadEnquiries {...props}>{children}</LoadEnquiries>;
}
