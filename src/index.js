import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppProviders from "./AppProviders";
import { GlobalStyles } from "./styles";
// import ErrorBoundary from "./components/Common/ErrorPage/ErrorPage";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <AppProviders>
    {/* <ErrorBoundary> */}
        <App />
      {/* </ErrorBoundary> */}
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root"),
);
