import { useState } from "react";
import { fyntune } from "../assets/images";
import Card from "./Card";
import "styled-components/macro";
import { Link, useLocation, useParams, useRouteMatch } from "react-router-dom";
import ThemeModal from "./ThemeModal";
import { useGetEnquiriesQuery } from "../api/api";
import { useMembers, useTheme } from "../customHooks";
import { FaRegCopy } from "react-icons/fa";

const Navbar = () => {
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

  return (
    <div
      css={`
        @media (max-width: 768px) {
          display: none;
        }
      `}
    >
      <Card width={"100%"} height={"60px"}>
        <div className="container d-flex justify-content-between align-items-center h-100">
          <div
            css={`
              display: flex;
              align-items: center;
              height: 100%;
              /* padding: 0px 100px; */
            `}
          >
            <Link to="/">
              <img
                src={fyntune}
                alt={`companylogo`}
                css={`
                  cursor: pointer;
                  height: 1.92em;
                `}
              />
            </Link>
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
                background-color: ${colors.secondary_shade};
                padding: 0.79em 1em;
                font-size: 0.79rem;
              `}
            >
              <TraceId />
            </div>
          )}
          {location.pathname === "/" && (
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
              `}
            >
              Theme
            </span>
          )}
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

  const [show, setShow] = useState(false);

  const { colors } = useTheme();

  const trace_id = data?.data?.trace_id;

  return (
    <div
      css={`
        font-size: 0.762rem;
      `}
    >
      <div className="py-3 px-2 d-flex align-items-center justify-content-between">
        <div
          className="d-flex align-items-center"
          css={`
            gap: 0.6em;
          `}
        >
          {BackButton}
          <Link to={"/input/basic-details"}>
            <img
              src={fyntune}
              alt="fyntune"
              css={`
                width: 7.93em;
              `}
            />
          </Link>
        </div>

        {location.pathname !== "/" && trace_id && <TraceId />}
      </div>
      {!location.pathname.startsWith("/input") && trace_id && (
        <div
          className="d-flex align-items-center justify-content-between py-2"
          css={`
            border-top: 1px solid #aaa;
            border-bottom: 1px solid #aaa;
          `}
        >
          <Members />
          <Info label="Pincode" value="999999" />
        </div>
      )}
    </div>
  );
}

export default Navbar;

export function Members() {
  const { groupCode } = useParams();

  const { getGroupMembers, isLoading, isUninitialized } = useMembers();

  if (!groupCode) return null;

  if (isLoading || isUninitialized) return <p>Loading...</p>;

  const members = getGroupMembers(groupCode);

  if (!members) return null;

  return (
    <div
      className="d-flex"
      css={`
        font-size: 0.79rem;
      `}
    >
      {members.map(member => (
        <Member member={member} key={member.code} />
      ))}
      {/* <Info label="Pincode" value={pincode} /> */}
    </div>
  );
}

function Member({ member, ...props }) {
  const memberType = member.display_name.replaceAll("_", " ");
  return (
    <Info label={memberType} value={member.age.short_display_name} {...props} />
  );
}

function Info({ label, value, ...props }) {
  const { colors } = useTheme();
  return (
    <div
      className="d-flex"
      css={`
        padding: 0 0.79em;
        gap: 0.67em;
        &:not(:last-child) {
          border-right: 1px solid ${colors.secondary_shade};
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
    <div>
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
