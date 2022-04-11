import { Component } from "react";
import "styled-components/macro";
import { mobile } from "./utils/mediaQueries";

const tenantColors = {
  fyntune: {
    primary_color: "rgb(10, 135, 255)",
    secondary_color: "rgb(45 212 75)",
  },
  renew_buy: {
    primary_color: "rgb(255, 102, 0)",
    secondary_color: "rgb(25, 102, 255)",
  },
  pinc: {
    primary_color: "rgb(225, 5, 109)",
    secondary_color: "rgb(39, 188, 169)",
  },
};
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

export const ErrorComponent = ({ errorMessage }) => {
  const tenantAlias = process.env.REACT_APP_TENANT;

  const primary_color = tenantColors[tenantAlias]?.primary_color;

  const secondary_color = tenantColors[tenantAlias]?.secondary_color;

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
            ${primary_color},
            ${secondary_color}
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;

          ${mobile} {
            font-size: 20px;
            text-align: center;
          }
        `}
      >
        UNRECOVERABLE ERROR OCCURRED
      </p>
      <p
        css={`
          text-align: center;
          ${mobile} {
            font-size: 12px;
          }
        `}
      >
        See logs for more information.
        <br /> or <br /> Contact dev team for support. <br /> or
      </p>

      <div
        css={`
          display: flex;
          align-items: center;
          margin-bottom: 16px;

          & button {
            display: inline-block;
            padding: 10px;
            box-sizing: border-box;
            border-radius: 10px;
            min-width: 150px;
            margin: 0px 10px;
            color: #ffff;
            & span {
              color: #ffff;
            }
            ${mobile} {
              font-size: 10px;
              min-width: 80px;
              padding: 7px;
              border-radius: 5px;
            }
          }
        `}
      >
        <button
          css={`
            background: ${primary_color};
          `}
          onClick={() => {
            window.location.reload();
          }}
        >
          Try Reload
        </button>
        <button
          css={`
            background: ${secondary_color};
          `}
          onClick={() => {
            window.location.assign("/");
          }}
        >
          Home Page
        </button>
        <button
          css={`
            background: ${primary_color};
          `}
          onClick={() => {
            window.open(window.location.href);
          }}
        >
          New Tab
        </button>
      </div>

      {tenantAlias === "fyntune" && (
        <code
          css={`
            padding: 10px;
            box-sizing: border-box;
            background: #fffafa;
            border: 1px solid #d63384;
            border-radius: 10px;
            ${mobile} {
              font-size: 10px;
              padding: 7px;
            }
          `}
        >
          {errorMessage}
        </code>
      )}
    </div>
  );
};
