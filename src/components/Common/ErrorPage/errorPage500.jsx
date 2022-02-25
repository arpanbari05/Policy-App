import React, { Component, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import Navbar from "../Navbar/Navbar";
import { reportErrors } from "./ServiceApi";
import { Page } from "../../index";
import { useGetFrontendBootQuery } from "../../../api/api"
import { HiCheckCircle } from "react-icons/hi";

function ErrorBoundary({children}) {
  const [errorReported,setErrorReported] = useState(false);
  const { isError } = useGetFrontendBootQuery();
  console.log('bksdbs',useGetFrontendBootQuery())
   const reportError = e => {
    e.preventDefault();
    try {
      reportErrors({
        message: this?.state?.error?.message,
        trace: this?.state?.errorInfo.componentStack.split(`\n    `),
      });
      setErrorReported(true);
    } catch {}
  };

  return isError?(
    <Page>
      <ErrorPage className="row d-flex align-items-center">
        <div className="left_container col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
          <div className="inner_circle d-flex flex-column align-items-center justify-content-center">
            <div className="a_404_text">500</div>
            <span className="text-uppercase">INTERNAL SERVER ERROR</span>
          </div>
        </div>
        <div className="right_container col-md-6 col-sm-12">
          <h1 className="oops_title">Oops!</h1>
          <h5 className="text-uppercase my-5">INTERNAL SERVER ERROR</h5>
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
              <Button className="btn bg_color_grey">Error Reported <HiCheckCircle/></Button>
            )}
          </div>
        </div>
      </ErrorPage>
    </Page>
  ):(<>{children}</>)
}

export default ErrorBoundary;

const ErrorPage = styled.div`
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

  @media screen and (max-width:768px){
    text-align:center;
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

const Success = styled.span`
  color: blue;
  border-bottom: 1px dashed blue;
`;
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



// import React, { Component } from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";
// // import Navbar from "../Navbar/Navbar";
// import { reportErrors } from "./ServiceApi";
// import { Page } from "../../index";

// import { HiCheckCircle } from "react-icons/hi";

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
    


//       return  this.state.errorInfo ||
//       this.props.frontendError ||
//       this.props.enquiryError?(
//         <>
//          <Page>
//       <ErrorPage className="row d-flex align-items-center">
//         <div className="left_container col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
//           <div className="inner_circle d-flex flex-column align-items-center justify-content-center">
//             <div className="a_404_text">500</div>
//             <span className="text-uppercase">INTERNAL SERVER ERROR</span>
//           </div>
//         </div>
//         <div className="right_container col-md-6 col-sm-12">
//           <h1 className="oops_title">Oops!</h1>
//           <h5 className="text-uppercase my-5">SERVER ERROR</h5>
//           <p className="">
//             The link you followed is either outdated, inaccurate or <br />
//             the server has been instructed not to let you have it
//           </p>
//           <div className="mt-2">
//             <Button
//               onClick={() => window.location.assign("/")}
//               className="btn "
//             >
//               <span> Go to Home page</span>
//             </Button>
//             <Button
//               onClick={() => window.location.reload()}
//               className="btn mx-2 bg_color_green"
//             >
//               <span>Reload</span>
//             </Button>

//             {!this.state.errorReported ? (
//               <Button onClick={this.ReportError} className="btn">
//                 <span>Report Error</span>
//               </Button>
//             ) : (
//               <Button className="btn bg_color_grey">Error Reported <HiCheckCircle/></Button>
//             )}
//           </div>
//         </div>
//       </ErrorPage>
//     </Page>
        
          
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

// const WithError = () => {

// return (

// )
// }; 

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
// const ErrorPage = styled.div`
//   width: 100%;
//   height: 75vh;
//   .bg_color_green {
//     background: rgb(45 212 75) !important;
//   }
//   .bg_color_grey {
//     background: #f7f7f7 !important;
//     color: #cfcfcf;
//   }
  
//   .left_container {
//     .inner_circle {
//       .a_404_text {
//         font-size: 85px;
//         font-family: cursive;
//         font-weight: 900;
//       }
//       width: 250px;
//       height: 250px;
//       border-radius: 100%;
//       background: #f7f7f7;
//       color: #cfcfcf;
//     }
//   }
//   .right_container {
//     .oops_title {
//       font-size: 55px;
//       font-family: cursive;
//       color: rgb(10, 135, 255);
//       font-weight: 900;
//     }
//     h5 {
//       font-weight: 900;
//     }
//   }

//   @media screen and (max-width:768px){
//     text-align:center;
//   }
// `;

// const Button = styled.button`
//   display: inline-block;
//   background: rgb(10, 135, 255);
//   color: #ffff;
//   & span {
//     color: #ffff;
//   }
// `;
