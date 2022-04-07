import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppProviders from "./AppProviders";
import { GlobalStyles } from "./styles";
import CacheBuster from "react-cache-buster";
import { version } from "../package.json";
import ErrorBoundary from "./ErrorBoundary";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <ErrorBoundary>
      <AppProviders>
        <App />
      </AppProviders>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root"),
);
