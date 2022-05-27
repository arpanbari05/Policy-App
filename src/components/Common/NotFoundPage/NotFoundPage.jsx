import React, { useState } from "react";
import styled from "styled-components";
// import Navbar from "../Navbar/Navbar";
import { reportErrors } from "./ServiceApi";
import { Page } from "../../index";
import { HiCheckCircle } from "react-icons/hi";

function NotFoundPage() {
  const [errorReported, setErrorReported] = useState(false);

  const reportError = e => {
    e.preventDefault();
    try {
      reportErrors({
        message: this?.state?.error?.message,
        trace: this?.state?.errorInfo.componentStack.split(`\n    `),
      });
      setErrorReported(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page>
      <ErrorPageOuter className="row d-flex align-items-center">
        <div className="left_container col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
          <div className="inner_circle d-flex flex-column align-items-center justify-content-center">
            <div className="a_404_text">404</div>
            <span className="text-uppercase">PAGE NOT FOUND</span>
          </div>
        </div>
        <div className="right_container col-md-6 col-sm-12">
          <h1 className="oops_title">Oops!</h1>
          <h5 className="text-uppercase my-5">Page Not Found On Server</h5>
          <p className="">
            The link you followed is either outdated, inaccurate or <br />
            the server has been instructed not to let you have it
          </p>
          <div className="mt-2">
            <Button
              onClick={() => window.location.assign("/")}
              className="btn "
            >
              <span> Go to Home page</span>
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="btn mx-2 bg_color_green"
            >
              <span>Reload</span>
            </Button>

            {!errorReported ? (
              <Button onClick={reportError} className="btn">
                <span>Report Error</span>
              </Button>
            ) : (
              <Button className="btn bg_color_grey">
                Error Reported <HiCheckCircle />
              </Button>
            )}
          </div>
        </div>
      </ErrorPageOuter>
    </Page>
  );
}

export default NotFoundPage;

const ErrorPageOuter = styled.div`
  width: 100%;
  height: 75vh;
  .bg_color_green {
    background: rgb(45 212 75) !important;
  }
  .bg_color_grey {
    background: #f7f7f7 !important;
    color: #cfcfcf;
  }

  .left_container {
    .inner_circle {
      .a_404_text {
        font-size: 85px;
        font-family: cursive;
        font-weight: 900;
      }
      width: 300px;
      height: 300px;
      border-radius: 100%;
      background: #f7f7f7;
      color: #cfcfcf;
    }
  }
  .right_container {
    .oops_title {
      font-size: 55px;
      font-family: cursive;
      color: rgb(10, 135, 255);
      font-weight: 900;
    }
    h5 {
      font-weight: 900;
    }
  }

  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;

const Button = styled.button`
  display: inline-block;
  background: rgb(10, 135, 255);
  color: #ffff;
  & span {
    color: #ffff;
  }
`;
