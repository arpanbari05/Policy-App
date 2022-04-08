import { Component } from "react";
import "styled-components/macro";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false, errorMessage: "", error: {} };
  }

  componentDidCatch(error) {
    this.setState({
      hasError: true,
      errorMessage: error?.message,
      error: error,
    });
  }

  render() {
    if (this?.state?.hasError)
      return <ErrorComponent errorMessage={this.state.errorMessage} />;
    return this?.props?.children;
  }
}

export default ErrorBoundary;

const ErrorComponent = ({ errorMessage }) => {
  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100%;
        font-weight: bold;
      `}
    >
      <p
        css={`
          font-size: 32px;
          font-weight: bold;
          background: -webkit-linear-gradient(
            left,
            rgb(10, 135, 255),
            rgb(45 212 75)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        `}
      >
        UNRECOVERABLE ERROR OCCURRED
      </p>
      <p
        css={`
          text-align: center;
        `}
      >
        See logs for more information.
        <br /> or <br /> Contact dev team for support.
      </p>
      <code
        css={`
          padding: 10px;
          box-sizing: border-box;
          background: #fffafa;
          border: 1px solid #d63384;
          border-radius: 10px;
        `}
      >
        {errorMessage}
      </code>
    </div>
  );
};
