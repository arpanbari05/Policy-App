import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import Navbar from "../Navbar/Navbar";
import { reportErrors } from "./ServiceApi";

function ErrorBoundary() {
  return (
    <div>ErrorPage</div>
  )
}

export default ErrorBoundary