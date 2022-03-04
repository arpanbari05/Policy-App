import React from "react";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useGetFrontendBootQuery } from "./api/api";
import { ErrorFallback, FullScreenLoader } from "./components";
import { LoadEnquiries } from "./components";
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

  const { isLoading, isUninitialized, isError } = useGetFrontendBootQuery(
    undefined,
    {
      skip: !!isTestRoute,
    },
  );

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

  return <LoadEnquiries {...props}>{children}</LoadEnquiries>;
}
