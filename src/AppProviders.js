import React from "react";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { useGetFrontendBootQuery } from "./api/api";
import { FullScreenLoader } from "./components";
import { LoadEnquiries } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { some } from "lodash";

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

  const isTestRoute = useRouteMatch({ path: "/test" });

  // const { isLoading, isUninitialized } = useGetFrontendBootQuery(undefined, {
  //   skip: !!isTestRoute,
  // });

  if (some([isTestRoute, isRootRoute, isBasicDetailsRoute])) return children;

  // if (isLoading || isUninitialized) return <FullScreenLoader />;

  return <LoadEnquiries {...props}>{children}</LoadEnquiries>;
}
