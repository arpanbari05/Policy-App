import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppProviders from "./AppProviders";
import { GlobalStyles } from "./styles";
import ErrorBoundary from "./components/Common/ErrorPage/errorPage500";
import CacheBuster from "react-cache-buster";
import { version } from "../package.json";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <AppProviders>
      <ErrorBoundary>
        {process.env.NODE_ENV === "production" ? (
          <CacheBuster
            currentVersion={version}
            isEnabled={process.env.NODE_ENV === "production"}
            isVerboseMode={false}
          >
            <App />
          </CacheBuster>
        ) : (
          <App />
        )}
      </ErrorBoundary>
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root"),
);
