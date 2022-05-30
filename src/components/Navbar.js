import { useEffect, useRef, useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { FaRegCopy } from "react-icons/fa";
import { useLocation, useParams, useRouteMatch } from "react-router-dom";
import "styled-components/macro";
import { CircleLoader } from ".";
import { useGetEnquiriesQuery } from "../api/api";
import { images } from "../assets/logos/logo";
import { useFrontendBoot, useMembers, useTheme } from "../customHooks";
import { useUrlQueries } from "../customHooks/useUrlQuery";
import PincPosLogout from "../pos/Pinc/PincPosLogout";
import KeyVerificationModal from "../pos/RenewBuy/KeyVerificationModal";
import { allowOnWebsites } from "../utils/helper";
import Card from "./Card";
import ThemeModal from "./ThemeModal";

function LogoLink() {
  const {
    query: { isLoading },
    ...frontendBoot
  } = useFrontendBoot();

  const isBasicDetailsRoute = useRouteMatch({
    path: "/input/basic-details",
    exact: true,
  });

  const {
    settings,
    tenant,
    settings: { shop_more_link },
  } = frontendBoot?.data;

  let goto = window.location.origin;

  if (tenant?.alias === "sriyah" && isBasicDetailsRoute) {
    goto = shop_more_link;
  }

  if (tenant?.alias === "pinc") {
    goto = tenant.broker_dashboard_url;
  }

  if (isLoading) return <CircleLoader animation="border" />;

  return (
    <a href={goto}>
      <img
        src={images[tenant.alias] || settings.logo}
        alt={`companylogo`}
        css={`
          cursor: pointer;
          max-width: ${tenant.alias.toLowerCase() === "pinc" ||
          tenant.alias.toLowerCase() === "sriyah"
            ? "90px"
            : "187px"};
          object-fit: contain;

          @media (max-width: 480px) {
            max-width: ${tenant.alias.toLowerCase() === "pinc"
              ? "70px"
              : "110px"};
          }
        `}
      />
    </a>
  );
}

const Navbar = ({ noShadow = false }) => {
  const location = useLocation();
  const searchQueries = useUrlQueries();

  const { data } = useGetEnquiriesQuery(undefined, {
    skip: !searchQueries.enquiryId,
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
      {allowOnWebsites(["renewBuyAll"]) && <KeyVerificationModal />}
      <Card
        width={"100%"}
        height={"55px"}
        boxShadow={
          noShadow
            ? "none"
            : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        }
        className="position-relative"
      >
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

          {location.pathname !== "/" && trace_id ? (
            <div
              css={`
                display: flex;
                align-items: center;
              `}
            >
              <div
                css={`
                  background-color: ${colors.secondary_shade};
                  padding: 0.79em 1em;
                  font-size: 0.79rem;
                `}
              >
                <TraceId />
              </div>
              <PincPosLogout />
            </div>
          ) : (
            <PincPosLogout />
          )}

          {allowOnWebsites(["allUat"]) && (
            <span
              onClick={() => {
                setShow(true);
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
          )}
        </div>
      </Card>
      <ThemeModal show={show} setShow={setShow} />
    </div>
  );
};

export function NavbarMobile({ backButton: BackButton = <></> }) {
  const location = useLocation();
  const searchQueries = useUrlQueries();
  const { groupCode } = useParams();
  const urlQueryStrings = new URLSearchParams(window.location.search);
  const city = urlQueryStrings.get("city");
  const pincode = urlQueryStrings.get("pincode");

  const { data } = useGetEnquiriesQuery(undefined, {
    skip: !searchQueries.enquiryId,
  });

  const { getGroupLocation, getFirstGroupLocation } = useMembers();

  const groupLocation = getGroupLocation(groupCode);

  // Group location for all members group
  const firstGroupLocation = getFirstGroupLocation();

  const groupCity = groupLocation?.city || city || firstGroupLocation?.city;
  const groupPincode =
    groupLocation?.pincode || pincode || firstGroupLocation?.pincode;

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

        <section
          css={`
            display: flex;
            align-items: center;
          `}
        >
          {location.pathname !== "/" && trace_id && <TraceId />}
          <PincPosLogout />
        </section>
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
          {groupCity && groupPincode && (
            <Info label={groupCity} value={groupPincode} />
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;

export const None = () => <></>;

export function Members() {
  const { groupCode } = useParams();

  const scrollRef = useRef(null);

  const [scrollX, setscrollX] = useState(0); // For detecting start scroll postion
  const [scrolEnd, setscrolEnd] = useState(false); // For detecting end of scrolling

  const urlQueryStrings = new URLSearchParams(window.location.search);
  const city = urlQueryStrings.get("city");
  const pincode = urlQueryStrings.get("pincode");

  const { colors } = useTheme();

  const {
    getGroupMembers,
    getGroupLocation,
    getFirstGroupLocation,
    isLoading,
    isUninitialized,
  } = useMembers();

  const scrollCheck = () => {
    setscrollX(scrollRef.current.scrollLeft);
    if (
      Math.floor(
        scrollRef.current.scrollWidth - scrollRef.current.scrollLeft,
      ) <= scrollRef.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  useEffect(() => {
    //Check width of the scollings
    if (
      scrollRef.current &&
      scrollRef?.current?.scrollWidth === scrollRef?.current?.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }

    return () => {};
  }, [scrollRef?.current?.scrollWidth, scrollRef?.current?.offsetWidth]);

  if (!groupCode) return null;

  if (isLoading || isUninitialized) return <p>Loading...</p>;

  const members = getGroupMembers(groupCode);
  const groupLocation = getGroupLocation(groupCode);

  // Group location for all members group
  const firstGroupLocation = getFirstGroupLocation();

  const scroll = scrollOffset => {
    scrollRef.current.scrollLeft += scrollOffset;
    setscrollX(prev => prev + scrollOffset);

    //For checking if the scroll has ended
    if (
      Math.floor(
        scrollRef.current.scrollWidth - scrollRef.current.scrollLeft,
      ) <= scrollRef.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  if (!members || !groupLocation) return null;

  const groupCity = groupLocation?.city || city || firstGroupLocation?.city;
  const groupPincode =
    groupLocation?.pincode || pincode || firstGroupLocation?.pincode;
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
      <div
        css={`
          position: relative;
          @media (min-width: 1024px) {
            max-width: 36vw;
          }
        `}
      >
        {scrollX !== 0 && members?.length >= 6 && (
          <button
            css={`
              display: none;
              position: absolute;
              top: -1px;
              left: -15px;
              height: 100%;
              width: 10px;
              background: #ffffff;
              @media (min-width: 768px) {
                display: inline-block;
              }
            `}
            onClick={() => scroll(-90)}
          >
            <BiChevronLeft size={20} color={colors.primary_color} />
          </button>
        )}
        <div
          css={`
            position: relative;
            max-width: 100%;
            display: flex;
            overflow: ${members?.length >= 6 ? "auto" : "hidden"};
            scroll-behaviour: smooth;
            &::-webkit-scrollbar {
              display: none;
            }

            @media (max-width: 768px) {
              flex-wrap: wrap;
            }
          `}
          ref={scrollRef}
          onScroll={scrollCheck}
        >
          {members.map(member => (
            <Member member={member} key={member.code} />
          ))}
        </div>
        {!scrolEnd && members?.length >= 6 && (
          <button
            css={`
              display: none;
              position: absolute;
              top: -1px;
              right: 0;
              height: 100%;
              width: 20px;
              background: #ffffff;
              @media (min-width: 768px) {
                display: inline-block;
              }
            `}
            onClick={() => scroll(90)}
          >
            <BiChevronRight size={20} color={colors.primary_color} />
          </button>
        )}
      </div>
      {groupCity && groupPincode && (
        <Info label={groupCity} value={groupPincode} onlyDesktop>
          <span
            css={`
              color: ${colors.primary_color};
              cursor: pointer;
              margin-top: -2px;
              &:hover {
                color: #000;
              }
            `}
          >
            {/* <RiPencilFill size={14} onClick={() => setShowPincode(true)} /> */}
          </span>
        </Info>
      )}
    </div>
  );
}

function Member({ member, ...props }) {
  const memberType = member?.display_name.toString()?.split("_").join(" ");

  return (
    <Info
      label={memberType}
      value={member?.age?.short_display_name}
      {...props}
    />
  );
}

function Info({ label, value, onlyDesktop = false, children, ...props }) {
  const { colors } = useTheme();
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      css={`
        padding: 0 0.79em;
        font-size: 11px;
        // gap: 0.67em;
        min-width: max-content;
        &:not(:last-child) {
          border-right: 1px solid ${colors.secondary_shade};
        }

        @media (max-width: 767px) {
          padding: 0 7px;
          font-size: 10.5px;
          // gap: 3px;
          display: ${onlyDesktop ? "none" : "flex"} !important;
        }
        @media (max-width: 406px) {
          // font-size: 10px;
          // gap: 2px;
          padding: 0 5px;
        }
      `}
      {...props}
    >
      <div
        css={`
          text-transform: capitalize;
          color: ${colors.primary_color};
          margin-right: 0.67em;

          @media (max-width: 768px) {
            margin-right: 2px;
          }
        `}
      >
        {label}
      </div>
      {value && <div>{value}</div>}
      {children}
    </div>
  );
}

function fallbackCopyTextToClipboard(text, fallback) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
    fallback();
  }

  document.body.removeChild(textArea);
}

export function TraceId() {
  const searchQueries = useUrlQueries();

  const { data, isLoading, isUninitialized } = useGetEnquiriesQuery(undefined, {
    skip: !searchQueries.enquiryId,
  });

  const [show, setShow] = useState(false);

  const [copiedIndication, setCopiedIndication] = useState(false);

  if (isLoading) return <p>...</p>;

  if (!data || isUninitialized) return null;

  const { trace_id } = data.data;

  function copyTraceId() {
    // if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(trace_id, () => {
      navigator.clipboard.writeText(trace_id).then(() => {
        setCopiedIndication(true);
        setTimeout(() => {
          setCopiedIndication(false);
        }, 1000);
      });
    });
    setCopiedIndication(true);
    setTimeout(() => {
      setCopiedIndication(false);
    }, 1000);
    // } else {
    //   navigator.clipboard.writeText(trace_id).then(() => {
    //     setCopiedIndication(true);
    //     setTimeout(() => {
    //       setCopiedIndication(false);
    //     }, 1000);
    //   });
    // }
  }

  if (copiedIndication)
    return (
      <div
        css={`
          font-size: 11px;
        `}
      >
        Copied to clipboard!
      </div>
    );

  return (
    <div
      css={`
        font-size: 11px !important;
      `}
    >
      Trace Id: <span>{trace_id}</span>{" "}
      <button
        css={`
          background: none;
          border: none;
          color: inherit !important;
        `}
        onClick={copyTraceId}
      >
        <FaRegCopy />
      </button>
      <ThemeModal show={show} setShow={setShow} />
    </div>
  );
}
