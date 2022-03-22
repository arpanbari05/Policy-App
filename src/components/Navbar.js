import { useState } from "react";
import Card from "./Card";
import "styled-components/macro";
import { Link, useLocation, useParams, useRouteMatch } from "react-router-dom";
import ThemeModal from "./ThemeModal";
import { useGetEnquiriesQuery } from "../api/api";
import { useFrontendBoot, useMembers, useTheme } from "../customHooks";
import { FaRegCopy } from "react-icons/fa";
import useComparePage from "../pages/ComparePage/useComparePage";
import { CircleLoader } from ".";
import ShareQuoteModal from "./ShareQuoteModal";
import { useShareFunctionality } from "../customHooks";
import { images } from "../assets/logos/logo";

function LogoLink() {
  const {
    query: { isLoading },
    ...frontendBoot
  } = useFrontendBoot();

  if (isLoading) return <CircleLoader animation="border" />;

  const { settings, tenant } = frontendBoot.data;

  return (
    <Link to="/">
      <img
        src={images[tenant.alias] || settings.logo}
        alt={`companylogo`}
        css={`
          cursor: pointer;
          max-width: ${tenant.alias === "Pinc" ? "90px" : "187px"};
          object-fit: contain;

          @media (max-width: 480px) {
            max-width: ${tenant.alias === "Pinc" ? "70px" : "110px"};
          }
        `}
      />
    </Link>
  );
}

const Navbar = ({ backButton: BackButton = <></> }) => {
  const location = useLocation();

  const isRootRoute = useRouteMatch({
    path: ["/", "/input/basic-details"],
    exact: true,
  });

  const { data } = useGetEnquiriesQuery(undefined, {
    skip: !!isRootRoute,
  });

  const [show, setShow] = useState(false);

  const { colors } = useTheme();

  const trace_id = data?.data?.trace_id;

  const { groupCode } = useParams();

  /* const { imageSend: proposalImageSend } = useShareFunctionality(
    "proposalPage",
    "proposalPage",
  );

  const { imageSend: proposalSummaryImageSend } = useShareFunctionality(
    "proposalSummaryPage",
    "proposalSummaryPage",
  ); */

  const { emailStatus, imageSend } = useComparePage();

  return (
    <div
      css={`
        @media (max-width: 768px) {
          display: none;
        }
      `}
    >
      <Card width={"100%"} height={"55px"} className="position-relative">
        <div className="container d-flex justify-content-between align-items-center h-100">
          <div
            css={`
              display: flex;
              align-items: center;
              height: 100%;
            `}
          >
            {/* to change back btn style use class ".back_btn_navbar" for similarity */}
            {/*BackButton*/}
            <LogoLink />
            {!location.pathname.startsWith("/input") && trace_id && (
              <div
                css={`
                  margin: 0 2em;
                `}
              >
                <Members />
              </div>
            )}
          </div>

          {location.pathname !== "/" && trace_id && (
            <div
              css={`
                display: flex;
              `}
            >
              {/*
              {location.pathname === "/proposal" && (
                <ShareQuoteModal
                  imageSend={proposalImageSend}
                  emailStatus={emailStatus}
                  stage="PROPOSAL"
                />
              )}
              {location.pathname === "/proposal_summary" && (
                <ShareQuoteModal
                  imageSend={proposalSummaryImageSend}
                  emailStatus={emailStatus}
                  stage="PROPOSAL_SUMMARY"
                />
              )} */}
              {location.pathname === `/compare/${groupCode}` && (
                <ShareQuoteModal
                  imageSend={imageSend}
                  emailStatus={emailStatus}
                  stage={"COMPARE"}
                />
              )}

              <div
                css={`
                  background-color: ${colors.secondary_shade};
                  padding: 0.79em 1em;
                  font-size: 0.79rem;
                `}
              >
                <TraceId />
              </div>
            </div>
          )}

          <span
            onClick={() => {
              process.env.REACT_APP_PHASE === "DEV" && setShow(true);
            }}
            css={`
              position: absolute;
              right: 14px;
              bottom: 2px;
              font-size: 12px;
              opacity: 0.1;
              cursor: pointer;
            `}
          >
            Theme
          </span>
        </div>
      </Card>
      <ThemeModal show={show} setShow={setShow} />
    </div>
  );
};

export function NavbarMobile({ backButton: BackButton = <></> }) {
  const location = useLocation();

  const isRootRoute = useRouteMatch({
    path: ["/", "/input/basic-details"],
    exact: true,
  });

  const { data } = useGetEnquiriesQuery(undefined, {
    skip: !!isRootRoute,
  });

  const pinCode = data?.data?.input?.pincode;

  const trace_id = data?.data?.trace_id;

  return (
    <div
      css={`
        font-size: 0.762rem;
        box-shadow: grey 0px 0px 10px;
      `}
    >
      <div
        className="d-flex align-items-center justify-content-between"
        css={`
          padding: 10px;
        `}
      >
        <div
          className="d-flex align-items-center"
          css={`
            gap: 0.6em;
          `}
        >
          {BackButton}
          <LogoLink />
        </div>

        {location.pathname !== "/" && trace_id && <TraceId />}
      </div>
      {!location.pathname.startsWith("/input") && trace_id && (
        <div
          className="d-flex align-items-center justify-content-between py-2"
          css={`
            font-size: 10px;
            border-top: 1px solid #aaa;
            border-bottom: 1px solid #aaa;
          `}
        >
          <Members />
          <Info label="Pincode" value={pinCode} />
        </div>
      )}
    </div>
  );
}

export default Navbar;

export const None = () => <></>;

export function Members() {
  const { groupCode } = useParams();

  const { getGroupMembers, getGroupLocation, isLoading, isUninitialized } =
    useMembers();

  if (!groupCode) return null;

  if (isLoading || isUninitialized) return <p>Loading...</p>;

  const members = getGroupMembers(groupCode);
  const groupLocation = getGroupLocation(groupCode);

  if (!members || !groupLocation) return null;

  return (
    <div
      className="d-flex"
      css={`
        font-size: 0.7rem !important;
        @media (max-width: 768px) {
          max-width: 83%;
          flex-wrap: wrap;
          row-gap: 7px;
        }
      `}
    >
      {members.map(member => (
        <Member member={member} key={member.code} />
      ))}
      <Info label="Pincode" value={groupLocation?.pincode} onlyDesktop />
    </div>
  );
}

function Member({ member, ...props }) {
  const memberType = member.display_name.replaceAll("_", " ");
  return (
    <Info label={memberType} value={member.age.short_display_name} {...props} />
  );
}

function Info({ label, value, onlyDesktop = false, ...props }) {
  const { colors } = useTheme();
  return (
    <div
      className="d-flex"
      css={`
        padding: 0 .79em;
        font-size: .7rem;
        gap: .67em;
        &:not(:last-child) {
          border-right: 1px solid ${colors.secondary_shade};
        }

        @media (max-width: 767px) {
          gap: 0;
          padding: 0 7px;
          font-size: 10.5px;
          gap: 3px;
          display: ${onlyDesktop ? "none" : "flex"} !important;
        }
        @media (max-width: 406px) {
          // font-size: 10px;
          gap: 2px;
          padding: 0 5px;
        }
      `}
      {...props}
    >
      <div
        css={`
          text-transform: capitalize;
          color: ${colors.primary_color};
        `}
      >
        {label}
      </div>
      <div>{value}</div>
    </div>
  );
}

export function TraceId() {
  const isBasicDetailsRoute = useRouteMatch({
    path: ["/input/basic-details", "/"],
    exact: true,
  });

  const { data, isLoading, isUninitialized } = useGetEnquiriesQuery(undefined, {
    skip: !!isBasicDetailsRoute,
  });

  const [show, setShow] = useState(false);

  const [copiedIndication, setCopiedIndication] = useState(false);

  if (isLoading) return <p>...</p>;

  if (!data || isUninitialized) return null;

  const { trace_id } = data.data;

  function copyTraceId() {
    navigator.clipboard.writeText(trace_id).then(() => {
      setCopiedIndication(true);
      setTimeout(() => {
        setCopiedIndication(false);
      }, 1000);
    });
  }

  if (copiedIndication) return <div>Copied to clipboard!</div>;

  return (
    <div
      css={`
        font-size: 0.7rem !important;
      `}
    >
      Trace Id: <span>{trace_id}</span>{" "}
      <button
        css={`
          background: none;
          border: none;
        `}
        onClick={copyTraceId}
      >
        <FaRegCopy />
      </button>
      <ThemeModal show={show} setShow={setShow} />
    </div>
  );
}
