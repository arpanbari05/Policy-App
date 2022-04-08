import React, { useState } from "react";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useGetFrontendBootQuery, useGetCartQuery } from "./api/api";
import { ErrorFallback, FullScreenLoader } from "./components";
import { useGetEnquiriesQuery } from "./api/api";
import { LoadEnquiries } from "./components";
import { Page } from "./components/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { some } from "lodash";
import "styled-components/macro";

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

  const isBasicDetailsRoute = useRouteMatch({
    path: "/input/basic-details",
    exact: true,
  });
  const isRenewalDetailsRoute = useRouteMatch({
    path: "/input/renewal-details",
    exact: true,
  });

  const isJOurneyTypeRoute = useRouteMatch({
    path: "/input/journey-type",
    exact: true,
  });
  const isTestRoute = useRouteMatch({ path: "/test" });

  const isQuoteRoute = useRouteMatch({ path: "/quotes" });
  const isProductDetailsRoute = useRouteMatch({ path: "/productdetails" });
  const isProposalRoute = useRouteMatch({ path: "/proposal" });
  const isProposalSummaryRoute = useRouteMatch({ path: "/proposal_summary" });
  const isThankyouRoute = useRouteMatch({ path: "/thankyou" });

  const { isLoading, isUninitialized, isError } = useGetFrontendBootQuery(
    undefined,
    {
      skip: !!isTestRoute,
    },
  );

  const {
    isLoading: isLoadingEnq,
    isFetching: isFetchingEnq,
    isUninitialized: isUninitializedEnq,
    isError: isErrorEnq,
    refetch,
  } = useGetEnquiriesQuery();

  const { isLoading: isLoadingCart, isUninitialized: isUninitializedCart } =
    useGetCartQuery(undefined, {
      skip: !(
        isQuoteRoute ||
        isProductDetailsRoute ||
        isProposalRoute ||
        isProposalSummaryRoute
      ),
    });

  if (isLoading || isUninitialized) return <FullScreenLoader />;

  if (isError)
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        css={`
          height: 100vh;
          place-items: center;
        `}
      >
        <p>Something went wrong!</p>

        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );

  if (
    some([
      isTestRoute,
      isRootRoute,
      isBasicDetailsRoute,
      isRenewalDetailsRoute,
      isJOurneyTypeRoute,
    ])
  )
    return children;

  if (isLoadingEnq || isUninitializedEnq || isFetchingEnq)
    return <FullScreenLoader />;

  if (isLoadingCart) return <FullScreenLoader />;

  if (isErrorEnq)
    return (
      <Page>
        <p>Something went wrong while fetching enquiry details!</p>
        <button onClick={refetch}>Retry</button>
      </Page>
    );

  return <LoadEnquiries {...props}>{children}</LoadEnquiries>;
}
