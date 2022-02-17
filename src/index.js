import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppProviders from "./AppProviders";
import { GlobalStyles } from "./styles";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root"),
);
