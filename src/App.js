import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { InputPage } from "./pages/InputPage/InputPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import Navbar from "./components/Navbar";
import QuotePage from "./pages/quotePage/QuotePage";


function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={InputPage} />
      </Switch>
      <Switch>
        <Route exact path="/quote" component={QuotePage} />
      </Switch>
    </Router>
  );
}

export default App;
