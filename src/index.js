/* eslint-disable no-console */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppProviders from "./AppProviders";
import { GlobalStyles } from "./styles";
import ErrorBoundary from "./ErrorBoundary";
import { Toaster } from "react-hot-toast";

window.isTransactionClicked = false;

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <ErrorBoundary>
      <AppProviders>
        <App />
      </AppProviders>
      <Toaster position="bottom-right" />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root"),
);
