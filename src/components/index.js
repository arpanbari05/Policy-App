import { Spinner } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import styled from "styled-components/macro";
import { useGetCartQuery, useGetEnquiriesQuery } from "../api/api";
import { useTheme } from "../customHooks";
import CardSkeletonLoader from "./Common/card-skeleton-loader/CardSkeletonLoader";
import FilterSkeletonLoader from "./Common/filter-skeleton-loader/FilterSkeletonLoader";
import Navbar from "./Navbar";

export function LoadEnquiries({ children }) {
  const { isLoading, isFetching, isUninitialized } = useGetEnquiriesQuery();
  if (isLoading || isFetching || isUninitialized) return <FullScreenLoader />;
  return children;
}

export function Page({ children, ...props }) {
  return (
    <div {...props}>
      <Navbar />
      <div>{children}</div>
    </div>
  );
}

export function FullScreenLoader() {
  return (
    <div className="pb-3" aria-label="loading">
      {/* <Navbar /> */}
      <div
        style={{
          width: "80%",
          margin: "20px auto",
        }}
      >
        <FilterSkeletonLoader />

        <div className="d-flex justify-content-between">
          <div
            style={{
              width: "60%",
              margin: "20px",
            }}
          >
            <CardSkeletonLoader noOfCards={3} />
          </div>
          <div
            style={{
              width: "32%",
              margin: "20px",
            }}
          >
            <CardSkeletonLoader noOfCards={1} />
          </div>
        </div>
        <div
          style={{
            width: "60%",
            margin: "20px",
          }}
        >
          <CardSkeletonLoader noOfCards={3} />
        </div>
      </div>
    </div>
  );
}

export function Button({
  children,
  loader = false,
  arrow = false,
  css,
  ...props
}) {
  const { colors } = useTheme();
  return (
    <button
      css={`
        background: ${colors.primary_color};
        border: none;
        color: #fff;
        border-radius: 2px;
        height: 3em;
        min-width: max-content;
        padding: 0 1em;
        cursor: pointer;
        font-weight: 900;
        ${css};
      `}
      disabled={loader}
      {...props}
    >
      {children}
      {loader ? (
        <CircleLoader animation="border" />
      ) : (
        arrow && (
          <FiArrowRight
            css={`
              font-size: 1.27em;
              margin-left: 0.27em;
            `}
          />
        )
      )}
    </button>
  );
}

export const CircleLoader = styled(Spinner)`
  height: 1.37em;
  width: 1.37em;
  font-size: 0.67em;
  margin-left: 0.67em;
`;

export const MemberText = styled.span`
  text-transform: capitalize;
`;

export function MembersList({ members = [], ...props }) {
  const displayMembers = members.map(member => member.display_name).join(", ");
  return <MemberText {...props}>{displayMembers}</MemberText>;
}

export function LoadCart({ children }) {
  const { isLoading, isUninitialized } = useGetCartQuery();

  if (isLoading || isUninitialized) return <FullScreenLoader />;
  return children;
}

export function Counter({
  min = 1,
  max = 4,
  count = min,
  onIncrement,
  onDecrement,
  ...props
}) {
  const handleDecrement = () => {
    const newCount = count - 1;
    if (newCount >= min) onIncrement && onDecrement(newCount);
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    if (newCount <= max) onDecrement && onIncrement(newCount);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between"
      css={`
        color: lightgrey;
        font-size: 1.2rem;
        gap: 0.6em;
        & button {
          padding: 0;
          background: none;
          border: none;
          color: inherit;
          line-height: 1;
        }
      `}
      {...props}
    >
      <button type="button" aria-label="increment" onClick={handleDecrement}>
        <IoRemoveCircle />
      </button>
      <span
        aria-label="count"
        css={`
          color: #6b7789;
          font-size: 0.89rem;
        `}
      >
        {count}
      </span>
      <button type="button" aria-label="decrement" onClick={handleIncrement}>
        <IoAddCircle />
      </button>
    </div>
  );
}

export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Page>
      <div role={"alert"}>
        <p>Something went wrong</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Reload</button>
      </div>
    </Page>
  );
}

export function GoBackButton({ children, ...props }) {
  return (
    <button
      className="btn"
      type="button"
      css={`
        width: max-content;
        padding: 0 !important;
        margin-right: 10px;
        margin-bottom: 10px;
        color: var(--abc-red);
        font-size: 17px;
        display: flex;
        align-items: center;
      `}
      {...props}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        css={`
          background: #f1f4f8;
          width: 45px;
          margin-right: 20px;
          border-radius: 100%;
          height: 45px;
          color: #707b8b;
        `}
      >
        <i className="fas fa-chevron-left"></i>
      </div>
      <span
        css={`
          color: #3b4c69;
          font-weight: 600;
        `}
      >
        {children}
      </span>
    </button>
  );
}

export function CircleCloseButton({
  placeOnCorner = false,
  css = ``,
  className = ``,
  ...props
}) {
  return (
    <button
      className={`d-flex align-items-center justify-content-center shadow rounded-circle ${className} ${
        placeOnCorner ? "position-absolute" : ""
      }`}
      css={`
        height: 1.67em;
        width: 1.67em;
        background-color: #fff;
        z-index: 120;
        ${placeOnCorner
          ? `top: 0; right: 0; transform: translate(30%, -30%);`
          : ""}
        ${css};
      `}
      {...props}
    >
      <FaTimes />
    </button>
  );
}
