import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import Navbar from "../Navbar/Navbar";
import { reportErrors } from "./ServiceApi";

function ErrorBoundary() {
  return (
    <ErrorPage className="d-flex align-items-center">
      <div className="left_container col-md-6">
<div className="inner_circle d-flex align-items-center justify-content-center">
    <div className="404_text">404</div>
</div>
      </div>
      <div className="right_container col-md-6">
        <h1 className="oops_title">Oops!</h1>
        <h5>Page Not Found On Server</h5>
        <p>The link you followed is either outdated, inaccurate or <br/>
        the server has been instructed not to let you have it</p>
        <Button onClick={() => window.location.assign("/")}>
             <span> Go to Home page</span>
             </Button>
      </div>
    </ErrorPage>
  )
}

export default ErrorBoundary

const ErrorPage = styled.div`
width:100%;
height:100vh;
.left_container{
  
  .inner_circle{
    width: 250px;
    height: 250px;
    border-radius: 100%;
    background: #9c9c9c;
    font-size: 85px;
    color: white;
  }
}
`;

const Button = styled.button`
  display: inline-block;
  & span {
    color: #0d6efd;

    border-bottom: 1px dashed#0d6efd;
  }
`;

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";
// // import Navbar from "../Navbar/Navbar";
// import { reportErrors } from "./ServiceApi";

// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { error: null, errorInfo: null };
//   }

//   componentDidCatch(error, errorInfo) {
//     // Catch errors in any components below and re-render with error message
//     this.setState({
//       error: error,
//       errorInfo: errorInfo,
//       errorReported: false,
//     });

//     // You can also log error messages to an error reporting service here
//     console.log(error, errorInfo);
//     console.log("1heheh", this.props.frontendError, this.props.enquiryError);
//   }

//   copyToClipboard = e => {
//     var textField = document.createElement("textarea");
//     textField.innerText = this?.state?.error;
//     document.body.appendChild(textField);
//     textField.select();
//     document.execCommand("copy");
//     textField.remove();
//   };

//   ReportError = e => {
//     e.preventDefault();
//     try {
//       reportErrors({
//         message: this?.state?.error?.message,
//         trace: this?.state?.errorInfo.componentStack.split(`\n    `),
//       });
//       this.setState({ errorReported: true });
//     } catch {}
//   };

//   render() {
//     console.log("show error line", this?.state?.error);
//     console.log("s", this?.state?.errorInfo?.componentStack);
   
//       return  this.state.errorInfo ||
//       this.props.frontendError ||
//       this.props.enquiryError?(
//         <>
//           {/* <Navbar displayNavbar={true} /> */}
//           <InnerWrapper>
//             <p>Something went wrong</p>
//             <p>
//               Sorry for inconvenience, check console for more information about
//               the error.
//             </p>
//             {/* <Message>{this.state.error.message}</Message> */}
//             <Button onClick={() => window.location.assign("/")}>
//               <span> Go to Home page</span>
//             </Button>
//             <Button onClick={() => window.location.reload()}>
//               <span>Reload</span>
//             </Button>{" "}
//             {/* <Button onClick={this.copyToClipboard}>
//               <span>Copy Stack Trace</span>
//             </Button> */}
//             {!this.state.errorReported ? (
//               <Button2 onClick={this.ReportError}>
//                 <span>Report Error</span>
//               </Button2>
//             ) : (
//               <Success>Error Reported</Success>
//             )}
//           </InnerWrapper>{" "}
//         </>
//       ):this.props.children;
//     // Normally, just render children
    
//   }
// }
// const mapStateToProps = state => ({
//   frontendError: state.frontendBoot.error,
//   enquiryError: state.greetingPage.enquiryHasFailed,
// });
// export default connect(mapStateToProps)(ErrorBoundary);
// const Message = styled.p`
//   color: #777;
// `;
// const InnerWrapper = styled.div`
//   text-align: center;
//   width: 100vw;
//   margin: 200px auto;
//   & button:not(:last-child) {
//     margin-right: 14px;
//   }
// `;
// const Success = styled.span`
//   color: blue;
//   border-bottom: 1px dashed blue;
// `;
// const Button2 = styled.button`
//   background: #0d6efd;
//   color: #fff;
//   margin: 10px auto;
//   padding: 6px 12px;
// `;
// const Button = styled.button`
//   display: inline-block;
//   & span {
//     color: #0d6efd;

//     border-bottom: 1px dashed#0d6efd;
//   }
// `;
