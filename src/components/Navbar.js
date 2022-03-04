import { useState, useEffect } from "react";
import Card from "./Card";
import "styled-components/macro";
import {
  Link,
  useLocation,
  useParams,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import ThemeModal from "./ThemeModal";
import { useGetEnquiriesQuery } from "../api/api";
import {
  useFrontendBoot,
  useMembers,
  useTheme,
  useUrlEnquiry,
} from "../customHooks";
import { FaRegCopy } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  setPolicyTypes,
  setPolicyType,
  setIsOnProductDetails,
} from "../pages/quotePage/quote.slice";
import useComparePage from "../pages/ComparePage/useComparePage";
import ShareButton from "./Common/Button/ShareButton";
import { FaChevronLeft } from "react-icons/fa";
import { CircleLoader } from ".";
import ShareQuoteModal from "./ShareQuoteModal";

const GO_BACK_LOCATIONS = [
  "/proposal",
  "/proposal_summary",
  "/quotes",
  "/productdetails",
];

function LogoLink() {
  const {
    query: { isLoading },
    ...frontendBoot
  } = useFrontendBoot();

  if (isLoading) return <CircleLoader animation="border" />;

  const { settings } = frontendBoot.data;

  return (
    <Link to="/">
      <img
        src={settings.logo}
        alt={`companylogo`}
        css={`
          cursor: pointer;
          width: 130px;
          object-fit: contain;
        `}
      />
    </Link>
  );
}

const Navbar = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  const history = useHistory();

  const { getUrlWithEnquirySearch } = useUrlEnquiry();
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

  const { getPreviousGroup, getLastGroup } = useMembers();

  // const lastGroup = getLastGroup();

  const prevoiusGroup = getPreviousGroup(parseInt(groupCode));

  console.log("sfjksvb", prevoiusGroup)

  const { emailStatus, imageSend } = useComparePage();

  return (
    <div
      css={`
        @media (max-width: 768px) {
          display: none;
        }
      `}
    >
      <Card width={"100%"} height={"53px"} clasName="position-relative">
        {/* {location.pathname === "/proposal_summary" && (
          <Link
            className="d-flex justify-content-center align-items-center"
            css={`
              background: #f1f4f8;
              width: 35px;
              margin-right: 20px;
              border-radius: 100%;
              height: 35px;
              top: 50%;
              left: 20px;
              transform: translateY(-50%);
              position: absolute;
              color: #707b8b;
            `}
            to={getUrlWithEnquirySearch("/proposal")}
            //  onClick={() => {
            //       history.push({ pathname: getUrlWithEnquirySearch("/proposal") });
            //     }}
          >
            <FaChevronLeft />
          </Link>
        )} */}

        <div className="container d-flex justify-content-between align-items-center h-100">
          <div
            css={`
              display: flex;
              align-items: center;
              height: 100%;
              /* padding: 0px 100px; */
            `}
          >
            {GO_BACK_LOCATIONS.filter(loc =>
              location.pathname.startsWith(loc),
            ) &&
              location.pathname !== "/input/basic-details" && (
                <div
                  className="d-flex justify-content-center align-items-center"
                  css={`
                    // background: ${colors.primary_color};
                    width: 35px;
                    margin-right: 5px;
                    border-radius: 100%;
                    height: 35px;
                    color: ${colors.primary_color};
                    cursor: pointer;
                    &:hover {
                      background: ${colors.primary_color}10;
                    }
                  `}
                  onClick={() => {
                    switch (location.pathname) {
                      case `/productdetails/${groupCode}`:
                        const getLink = () => {
                          if (!prevoiusGroup) {
                            return getUrlWithEnquirySearch(
                              `/quotes/${groupCode}`,
                            );
                          }
                          return getUrlWithEnquirySearch(
                            `/productdetails/${prevoiusGroup.id}`,
                          );
                        };
                        history.replace(getLink());
                        setIsOnProductDetails(true);
                        break;

                      case "/proposal":
                        // history.goBack();
                        history.replace(
                          getUrlWithEnquirySearch(
                            `/productdetails/${prevoiusGroup.id}`,
                          ),
                        );
                        break;

                      case "/proposal_summary":
                        history.push(getUrlWithEnquirySearch("/proposal"));
                        break;

                      case `/quotes/${groupCode}`:
                        history.replace(
                          getUrlWithEnquirySearch(`/input/medicalHistory`),
                        );
                        return;

                      default:
                        history.goBack();
                        return;
                    }
                  }}
                >
                  <FaChevronLeft />
                </div>
              )}
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
              {location.pathname === "/proposal" && (
                <ShareQuoteModal stage="PROPOSAL" />
              )}
              {location.pathname === "/proposal_summary" && (
                <ShareQuoteModal stage="PROPOSAL_SUMMARY" />
              )}
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

            @media (max-width: 500px) {
              font-size: 9px !important;
            }
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

  console.log(groupLocation);

  if (!members || !groupLocation) return null;

  return (
    <div
      className="d-flex"
      css={`
        font-size: 12px !important;

        @media (max-width: 500px) {
          font-size: 9px !important;
        }
      `}
    >
      {members.map(member => (
        <Member member={member} key={member.code} />
      ))}
      <Info label="Pincode" value={groupLocation?.pincode} />
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

        @media (max-width: 410px) {
          gap: 0.3em;
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
        font-size: 12px;
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
