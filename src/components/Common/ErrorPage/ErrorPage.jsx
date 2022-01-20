import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar";
import { reportErrors } from "./ServiceApi";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
      errorReported: false,
    });

    // You can also log error messages to an error reporting service here
    console.log(error, errorInfo);
    console.log("1heheh", this.props.frontendError, this.props.enquiryError);
  }

  copyToClipboard = e => {
    var textField = document.createElement("textarea");
    textField.innerText = this?.state?.error;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  ReportError = e => {
    e.preventDefault();
    try {
      reportErrors({
        message: this?.state?.error?.message,
        trace: this?.state?.errorInfo.componentStack.split(`\n    `),
      });
      this.setState({ errorReported: true });
    } catch {}
  };

  render() {
    console.log("show error line", this?.state?.error);
    console.log("s", this?.state?.errorInfo?.componentStack);
    if (
      this.state.errorInfo ||
      this.props.frontendError ||
      this.props.enquiryError
    ) {
      // Error path
      return (
        <>
          <Navbar displayNavbar={true} />
          <InnerWrapper>
            <p>Something went wrong</p>
            <p>
              Sorry for inconvenience, check console for more information about
              the error.
            </p>
            {/* <Message>{this.state.error.message}</Message> */}
            <Button onClick={() => window.location.assign("/")}>
              <span> Go to Home page</span>
            </Button>
            <Button onClick={() => window.location.reload()}>
              <span>Reload</span>
            </Button>{" "}
            {/* <Button onClick={this.copyToClipboard}>
              <span>Copy Stack Trace</span>
            </Button> */}
            {!this.state.errorReported ? (
              <Button2 onClick={this.ReportError}>
                <span>Report Error</span>
              </Button2>
            ) : (
              <Success>Error Reported</Success>
            )}
          </InnerWrapper>{" "}
        </>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
const mapStateToProps = state => ({
  frontendError: state.frontendBoot.error,
  enquiryError: state.greetingPage.enquiryHasFailed,
});
export default connect(mapStateToProps)(ErrorBoundary);
const Message = styled.p`
  color: #777;
`;
const InnerWrapper = styled.div`
  text-align: center;
  width: 100vw;
  margin: 200px auto;
  & button:not(:last-child) {
    margin-right: 14px;
  }
`;
const Success = styled.span`
  color: blue;
  border-bottom: 1px dashed blue;
`;
const Button2 = styled.button`
  background: #0d6efd;
  color: #fff;
  margin: 10px auto;
  padding: 6px 12px;
`;
const Button = styled.button`
  display: inline-block;
  & span {
    color: #0d6efd;

    border-bottom: 1px dashed#0d6efd;
  }
`;
