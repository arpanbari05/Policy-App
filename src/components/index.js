import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { FaArrowCircleLeft, FaChevronLeft, FaTimes } from "react-icons/fa";
import {
  IoAddCircle,
  IoCheckmarkCircleSharp,
  IoRemoveCircle,
} from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { useGetCartQuery, useGetEnquiriesQuery } from "../api/api";
import {
  useQuote,
  useTheme,
  useToggle,
  useUrlEnquiry,
  useCart,
} from "../customHooks";
import {
  amount,
  calculateTotalPremium,
  getDisplayPremium,
} from "../utils/helper";
import CartSummaryModal from "./CartSummaryModal";
import CardSkeletonLoader from "./Common/card-skeleton-loader/CardSkeletonLoader";
import FilterSkeletonLoader from "./Common/filter-skeleton-loader/FilterSkeletonLoader";
import * as mq from "../utils/mediaQueries";
import { GiCircle } from "react-icons/gi";
import { images } from "../assets/logos/logo";
import { defaultPrimaryColor } from "../config";

export function ScreenTopLoader({ progress, show }) {
  const { colors } = useTheme();

  if (!show) return null;

  return (
    <div
      className="position-fixed"
      css={`
        top: 0;
        height: 0.2em;
        background-color: ${colors.primary_color};
        width: ${progress}%;
        transition: 0.3s ease-in;
        z-index: 99;
      `}
    />
  );
}

export function LoadEnquiries({ children }) {
  const { isLoading, isFetching, isUninitialized, isError, refetch } =
    useGetEnquiriesQuery();

  if (isError)
    return (
      <Page>
        <p>Something went wrong while fetching enquiry details!</p>
        <button onClick={refetch}>Retry</button>
      </Page>
    );

  if (isLoading || isFetching || isUninitialized) return <FullScreenLoader />;

  return children;
}

export function Page({
  children,
  loader,
  noNavbarForMobile = false,
  backButton: BackButton = <></>,
  id = "",
  ...props
}) {
  return (
    <div id={id} {...props}>
      {loader ? loader : null}
      <Import
        mobile={() =>
          import("./Navbar").then(res => ({
            default: noNavbarForMobile ? res.None : res.NavbarMobile,
          }))
        }
        desktop={() => import("./Navbar")}
      >
        {NavBar => <NavBar backButton={BackButton} />}
      </Import>
      <div>{children}</div>
    </div>
  );
}

export function FullScreenLoaderSkeleton() {
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
export function FullScreenLoader() {
  const defaultColors = {
    renew_buy: "#ff6600",
    fts: "#0a87ff",
    pinc: "#e1056d",
  };
  const tenantAlias = process.env.REACT_APP_TENANT;
  const tenantColor = defaultColors[tenantAlias];
  const tenantLogo = images[tenantAlias];
  return (
    <div className="pb-3" aria-label="loading">
      <div
        css={`
          width: 15rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 35vh auto;
          align-items: center;
          justify-content: center;
        `}
      >
        <img
          css={`
            width: 100%;
          `}
          src={tenantLogo}
          alt={"company-logo"}
        />

        <div
          css={`
            height: 4px;
            background-color: #eee;
            width: 100%;
            margin-top: 10px;
            border-radius: 100px;
            position: relative;

            // Fix the loading bar overflow
            overflow-x: hidden;

            &::after {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 50%;
              background-color: ${tenantColor || defaultColors.fts};
              // Animation
              animation: loading 3s infinite;
            }
          `}
        />
      </div>
    </div>

    // <div className="pb-3" aria-label="loading">
    //   {/* <Navbar /> */}
    //   <div
    //     style={{
    //       width: "80%",
    //       margin: "20px auto",
    //     }}
    //   >
    //     <FilterSkeletonLoader />

    //     <div className="d-flex justify-content-between">
    //       <div
    //         style={{
    //           width: "60%",
    //           margin: "20px",
    //         }}
    //       >
    //         <CardSkeletonLoader noOfCards={3} />
    //       </div>
    //       <div
    //         style={{
    //           width: "32%",
    //           margin: "20px",
    //         }}
    //       >
    //         <CardSkeletonLoader noOfCards={1} />
    //       </div>
    //     </div>
    //     <div
    //       style={{
    //         width: "60%",
    //         margin: "20px",
    //       }}
    //     >
    //       <CardSkeletonLoader noOfCards={3} />
    //     </div>
    //   </div>
    // </div>
  );
}

export function Button({
  children,
  loader = false,
  disabled = false,
  arrow = false,
  css,
  onClick,
  loaderPrimaryColor = false,
  ...props
}) {
  const { colors } = useTheme();
  const handleClick = evt => {
    if (loader || disabled) return;
    onClick && onClick(evt);
  };
  return (
    <button
      css={`
        background: ${colors.primary_color};
        border: none;
        color: #fff;
        border-radius: 2px;
        height: 2.8em;
        min-width: max-content;
        padding: 0 1em;
        cursor: pointer;
        font-weight: 900;

        &:hover {
          background-image: linear-gradient(
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.1)
          );
        }
        &:disabled {
          cursor: default;
          // background-color: ${loaderPrimaryColor && loader
            ? colors.primary_color
            : colors.secondary_shade};
          // color: ${loaderPrimaryColor && loader ? "#fff" : "#666"};
        }

        ${css};
      `}
      disabled={loader || disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
      {loader && <CircleLoader animation="border" />}
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
  onChange,
  member,
  ...props
}) {
  const handleDecrement = () => {
    const newCount = count - 1;
    if (newCount >= min) {
      onIncrement && onDecrement();
    } else {
      onChange({
        ...member,
        isSelected: false,
        age: false,
      });
    }
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    if (newCount <= max) onDecrement && onIncrement(newCount);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-around"
      css={`
        color: lightgrey;
        font-size: 1.2rem;
        gap: 0.3125em;
        transform: translateX(-50%);

        @media (max-width: 480px) {
          transform: translateX(0);
        }
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
        <FaChevronLeft />
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

export function CloseButton({ onClick, css = "", className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`position-absolute ${className}`}
      css={`
        top: 1em;
        right: 1em;
        line-height: 1;
        ${css};
      `}
      {...props}
    >
      <FaTimes />
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
        ${mq.mobile} {
          font-size: 0.79rem;
        }
        ${css};
      `}
      {...props}
    >
      <FaTimes />
    </button>
  );
}

export function useGotoProductDetailsPage() {
  const history = useHistory();
  const { data } = useGetCartQuery();
  const { enquiryId } = useUrlEnquiry();

  function gotoProductPage() {
    const groupCodes = data.data.map(cartEntry => cartEntry.group.id);

    const firstGroupWithQuote = Math.min(...groupCodes);

    const currentGroup =
      localStorage.getItem("groups") &&
      JSON.parse(localStorage.getItem("groups")).find(group => group.id);

    history.push({
      pathname: `/productdetails/${firstGroupWithQuote}`,
      search: `enquiryId=${enquiryId}&pincode=${currentGroup.pincode}&city=${currentGroup.city}`,
    });
  }

  return { gotoProductPage };
}

export function PremiumButton({ quote, displayTenure = true, ...props }) {
  const history = useHistory();

  const cartSummaryModal = useToggle(false);

  const {
    buyQuote,
    queryState: { isLoading },
  } = useQuote();

  const handleBuyClick = () => {
    const { mandatory_riders } = quote;
    const riders = quote.riders || [];

    buyQuote(quote, [...mandatory_riders, ...riders])
      .then(cartSummaryModal.on)
      .catch(() => alert("Something went wrong while buying the quote!"));
  };

  const { enquiryId } = useUrlEnquiry();
  const { cartEntries } = useCart();

  const currentGroup =
    localStorage.getItem("groups") &&
    JSON.parse(localStorage.getItem("groups")).find(group => group.id);

  function gotoProductPage() {
    const groupCodes = cartEntries.map(cartEntry => cartEntry.group.id);
    // const groupCodes = Object.keys(policyTypes).map(key => parseInt(key));
    const firstGroupWithQuote = Math.min(...groupCodes);

    history.push({
      pathname: `/productdetails/${firstGroupWithQuote}`,
      search: `enquiryId=${enquiryId}&pincode=${currentGroup.pincode}&city=${currentGroup.city}`,
    });
  }

  const handleContinueClick = () => {
    gotoProductPage();
  };

  const netPremium = calculateTotalPremium({
    total_premium: quote.total_premium,
    health_riders: quote.riders ? quote.riders : quote.mandatory_riders, // quote?.riders doesn't contains mandatory rider
  });

  return (
    <div className="w-100">
      <Button
        className="w-100 rounded"
        onClick={handleBuyClick}
        loader={isLoading}
        css={`
          font-size: 0.89rem;
        `}
        {...props}
      >
        {displayTenure
          ? getDisplayPremium({
              total_premium: netPremium,
              tenure: quote.tenure,
            })
          : amount(netPremium)}
      </Button>
      {cartSummaryModal.isOn && (
        <CartSummaryModal
          onContine={handleContinueClick}
          onClose={cartSummaryModal.off}
        />
      )}
    </div>
  );
}

const isMobile = window.matchMedia("(max-width: 768px)").matches;

export function Import({ mobile, desktop, children }) {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    const importCallback = isMobile ? mobile : desktop;

    if (importCallback) {
      importCallback().then(componentDetails => {
        setComponent(componentDetails);
      });
    }
  }, [desktop, mobile]);

  return children(Component ? Component.default : () => null);
}

export function BackButtonMobile({ path, css = "", ...props }) {
  const { colors } = useTheme();
  return (
    <Link
      {...props}
      css={`
        color: ${colors.primary_color};
        font-size: 1.29em;
        ${css};
      `}
      to={path}
    >
      <FaArrowCircleLeft />
    </Link>
  );
}

export function OptionSelect({
  selectable,
  label,
  checked,
  onChange,
  dropdown = <></>,
  children,
  ...props
}) {
  const { colors } = useTheme();

  return (
    <div
      className="d-flex align-items-center justify-content-between rounded-2"
      css={`
        padding: 2px 10px;
        border: solid 1px #b0bed0;
        flex: 1 1 21em;
        gap: 0.7em;
      `}
      {...props}
    >
      <label
        className="d-flex align-items-center flex-grow-1 align-self-stretch"
        role="button"
        css={`
          font-size: 15px;
          line-height: 1;
          font-weight: 900;
        `}
      >
        {selectable ? (
          <input
            type="checkbox"
            className="visually-hidden"
            checked={checked}
            onChange={onChange}
          />
        ) : null}
        {selectable ? (
          <div
            css={`
              font-size: 1.67rem;
              line-height: 0;
              margin-right: 0.3em;
            `}
          >
            {checked ? (
              <IoCheckmarkCircleSharp
                css={`
                  color: ${colors.primary_color};
                `}
              />
            ) : (
              <GiCircle
                css={`
                  color: #ccc;
                `}
              />
            )}
          </div>
        ) : null}
        {label}
      </label>
      {children}
      <div>{dropdown}</div>
    </div>
  );
}
