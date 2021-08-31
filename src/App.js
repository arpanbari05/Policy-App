import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { InputPage } from "./pages/InputPage/InputPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
        <Navbar />
      <Switch>
        <Route exact path="/" component={InputPage} />
      </Switch>
    </Router>
  );
}

export default App;
