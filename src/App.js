import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { InputPage } from "./pages/InputPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={InputPage} />
      </Switch>
    </Router>
  );
}

export default App;
