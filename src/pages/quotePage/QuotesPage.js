import { Container } from "react-bootstrap";
import { Page } from "../../components";
import useFilters from "./components/filters/useFilters";
import useUpdateFilters from "./components/filters/useUpdateFilters";
import LowerModifier from "./components/LowerModifier";
import Quotes from "./components/Quotes";
import UpperModifier from "./components/UpperModifier";
import { useMembers, useTheme, useGetQuotes } from "../../customHooks";
import { useHistory, useParams } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import ScrollToTopBtn from "../../components/Common/ScrollToTop/ScrollToTopBtn";
import { FaSync } from "react-icons/fa";
import { useEffect, useState } from "react";
import SortBy from "./components/filters/SortBy";
import assistant from "../../assets/images/call-center-service.png";
import { QuotesLoader } from "./components";
import TalkToUsModal from "../../components/TalkToUs";
import {
  useFrontendBoot,
  useSortBy,
  useShortlistedPlans,
} from "../../customHooks/index";
import {
  ClickSound,
  mergeQuotes,
  figureToWords,
  numberToDigitWord,
  amount,
} from "../../utils/helper";
import "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import { replaceShareQuotes } from "./quote.slice";
import {
  HeadingTertiary,
  PrimaryFont,
  PrimaryFontBold,
  TertiaryFontBold,
  XSmallFont,
} from "../../styles/typography";
import { IoIosArrowForward } from "react-icons/io";
import { images as logos } from "../../assets/logos/logo";
import { api } from "../../api/api";

function QuotesPage() {
  const { colors } = useTheme();

  const { checkGroupExist } = useMembers();

  const { default: defaultSortBy } = useSortBy();

  const [isGroupExist, setGroupExist] = useState(true);

  const { tenantAlias } = useFrontendBoot();

  const { groupCode } = useParams();

  useEffect(() => {
    const isGroupExist = checkGroupExist(groupCode);
    setGroupExist(isGroupExist);
  }, [groupCode]);

  const [selectedSortBy, setSelectedSoryBy] = useState(defaultSortBy);

  if (!isGroupExist) return <PageNotFound />;

  return (
    <Page id={"printQuotePage"} loader={<QuotesLoader />}>
      <ScrollToTopBtn />
      <UpperModifier />
      <LowerModifier
        sortBy={
          <SortBy
            selectedSortBy={selectedSortBy}
            onChange={setSelectedSoryBy}
          />
        }
      />
      <Container className="mt-2" fluid="lg">
        <div
          className="d-flex align-items-center justify-content-between"
          css={`
            gap: 0.6rem;
          `}
        >
          <div
            className="d-flex align-items-center"
            css={`
              flex: 3;
            `}
          >
            <ShowingPlanType />
            <div className="m-auto">
              <ClearFilters />
            </div>
          </div>
          {/* <p
            className="m-0 d-none d-xl-block"
            css={`
              font-size: 0.89rem;
              color: ${colors.font.four};
              text-align: left;
              flex: 1;
            `}
          >
            All Premium Plans are GST Inclusive
          </p> */}
          <PrimaryFont
            css={`
              flex: 1;
              text-align: left;
            `}
            color={colors.font.four}
          >
            All Premium Plans are GST Inclusive
          </PrimaryFont>
        </div>
        <div
          className="mt-2 d-flex"
          css={`
            gap: 0.6rem;
          `}
        >
          <div
            css={`
              flex: 3;
            `}
          >
            <Quotes sortBy={selectedSortBy.code} />
          </div>
          <div
            className="d-none d-xl-block"
            css={`
              flex: 1;
            `}
          >
            <div
              className="d-flex"
              css={`
                flex-direction: column;
                gap: 10px;
              `}
            >
              <ShortListedQuote />
              {tenantAlias !== "robinhood" && <AssistanceCard />}
            </div>
          </div>
        </div>
      </Container>
    </Page>
  );
}

export default QuotesPage;

function ShortListedQuote() {
  const { colors } = useTheme();

  const urlQueryStrings = new URLSearchParams(window.location.search);

  const { groupCode } = useParams();

  const dispatch = useDispatch();

  const history = useHistory();

  const enquiryId = urlQueryStrings.get("enquiryId");

  const { getPlanByGroup } = useShortlistedPlans();

  const shortlistedQuotes = getPlanByGroup(groupCode);

  const lastQuote = shortlistedQuotes[shortlistedQuotes.length - 1];

  const companyLogo = logos[lastQuote?.company_alias];

  return (
    <div
      css={`
        // box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        padding: 10px;
        padding-top: 0;
        border: 1px solid #dcdcdc;
      `}
    >
      <div
        css={`
          display: flex;
          align-items: center;
          border-bottom: 1px solid #dcdcdc;
          padding: 10px 0;
          gap: 10px;
        `}
      >
        <PrimaryFontBold>Shortlisted plan(s)</PrimaryFontBold>
        <span
          css={`
            width: 15px;
            height: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: ${colors.primary_color};
            color: #fff;
            font-size: 11px;
            font-weight: bold;
            border-radius: 50%;
          `}
        >
          {shortlistedQuotes.length}
        </span>
      </div>
      {shortlistedQuotes.length > 0 ? (
        <>
          <div
            css={`
              display: flex;
              gap: 20px;
              padding: 10px;
            `}
          >
            <img
              css={`
                max-height: 45px;
                max-width: 90px;
                object-fit: contain;
              `}
              src={companyLogo}
              alt="company_logo"
            />
            <div>
              <TertiaryFontBold
                css={`
                  width: 100%;
                  margin-bottom: 15px;
                `}
              >
                {lastQuote?.product?.name}
              </TertiaryFontBold>
              <div className="d-flex gap-4">
                <div>
                  <XSmallFont>Cover</XSmallFont>
                  <TertiaryFontBold>
                    {figureToWords(+lastQuote?.sum_insured)}
                  </TertiaryFontBold>
                </div>
                <div>
                  <XSmallFont>Premium</XSmallFont>
                  <TertiaryFontBold>
                    {amount(lastQuote?.total_premium)}
                  </TertiaryFontBold>
                </div>
              </div>
            </div>
          </div>
          <button
            css={`
      padding: 5px;
      text-align-center;
      border-radius: 1000px;
      color: ${colors.primary_color};
      background: ${colors.primary_shade};
      font-size: 12px;
      width: 100%;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3px;
      cursor: pointer;
      margin-top: 10px;
      `}
            onClick={() => {
              dispatch(api.util.resetApiState()); // clearing cache to improve performance
              history.push(`/shortlisted/${groupCode}?enquiryId=${enquiryId}`);
            }}
          >
            <span>View shortlisted quotes</span>
            <IoIosArrowForward size={15} />
          </button>
        </>
      ) : (
        <div
          css={`
            text-align: center;
            margin: 20px;
            font-size: 12px;
          `}
        >
          No plans shortlisted
        </div>
      )}
    </div>
  );
}
function ShowingPlanType() {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { shareType } = useSelector(state => state.quotePage);
  const { data: unmergedQuotes } = useGetQuotes();
  const justArray = unmergedQuotes?.map(quote =>
    mergeQuotes(quote?.data?.data),
  );
  const mergedQuotes = justArray?.reduce((acc, val) => acc.concat(val), []);

  const displayPlansLength = mergedQuotes?.filter(
    quoteData => quoteData?.length !== 0,
  )?.length;

  useEffect(() => {
    if (shareType.value === "quotation_list") {
      dispatch(replaceShareQuotes(mergedQuotes));
    } else if (shareType.value === "specific_quotes") {
      dispatch(replaceShareQuotes([]));
    }
  }, [shareType]);

  const { getSelectedFilter } = useFilters();

  const selectedPolicyTypeFilter = getSelectedFilter("plantype");

  const displayPolicyTypeFitler = selectedPolicyTypeFilter?.display_name;

  return (
    // <h1
    //   className="m-0"
    //   css={`
    //     font-size: 1rem;
    //     color: ${colors.font.four};
    //     width: max-content;
    //     font-weight: 900;
    //   `}
    // >
    //   {`Showing ${displayPlansLength} ${displayPolicyTypeFitler} plans`}
    // </h1>
    <HeadingTertiary color={colors.font.four}>
      {`Showing ${displayPlansLength} ${displayPolicyTypeFitler} plans`}
    </HeadingTertiary>
  );
}

function ClearFilters(props) {
  const { isFiltersDefault } = useFilters();
  const { resetFilters } = useUpdateFilters();
  const { primary_color, primary_shade } = useTheme().colors;

  if (isFiltersDefault) return null;

  return (
    <button
      onClick={resetFilters}
      css={`
        background-color: ${primary_shade};
        color: ${primary_color};
        font-weight: 900;
        width: max-content;
        padding: 0.6em 1em;
        border-radius: 24px;
        border: 1px solid ${primary_color};
        font-size: 0.73rem;
      `}
      {...props}
    >
      Clear all filters
      <FaSync className="mx-2" />
    </button>
  );
}

export function AssistanceCard(props) {
  const [showTalk, setShowTalk] = useState(false);
  const { colors } = useTheme();
  const {
    data: {
      settings: { talk_to_us_info, talk_to_us_info_pos },
    },
    tenantAlias,
  } = useFrontendBoot();

  const isPosUser = localStorage.getItem("SSO_user");

  return (
    <div
      {...props}
      className="p-3 pb-5 position-relative"
      css={`
        background-color: ${colors.secondary_shade};
      `}
    >
      <div
        css={`
          margin-bottom: 15px;

          & > p,
          & > *,
          & > p > font,
          & > p > span,
          & > p > font > span {
            font-size: 14px; !important;
            color: ${colors.font.one} !important;
            line-height: 1.5 !important;
            font-family: inherit !important;
          }

          & > p:first-child > *,
          & > p:first-child > font,
          & > p:first-child > span,
          & > p:first-child > font > span {
            font-size: 16px; !important;
            font-weight: 900 !important;
            font-family: inherit !important;
          }
        `}
        dangerouslySetInnerHTML={{
          __html: isPosUser ? talk_to_us_info_pos : talk_to_us_info,
        }}
      ></div>
      {!talk_to_us_info && !(isPosUser && talk_to_us_info_pos) && (
        <>
          {" "}
          <h1
            css={`
              font-size: 16px;
              font-weight: 900;
            `}
          >
            {tenantAlias === "renew_buy"
              ? "Need assistance with health insurance plans?"
              : "Health Insurance Assistance"}
          </h1>
          <p
            className="mt-3"
            css={`
              font-size: 14px;
              color: ${colors.font.one};
            `}
          >
            {tenantAlias === "renew_buy"
              ? "Health Insurance plans by insurers have various offerings such as list of hospitals covered, co-payment clauses, family health insurance plans, no claim bonuses etc. In case of any support or assistance, connect with a RenewBuy Health Expert and solve all your and your customers queries."
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu nisl a lorem auctor ultrices auctor vel elit. Aliquam quis consequat tellus. Aliquam pellentesque ligula massa, aliquet fermentum nisl varius ac."}
          </p>
        </>
      )}
      <button
        className="px-3 py-2 rounded"
        css={`
          color: ${colors.primary_color};
          border: 2px solid;
          background-color: #fff;
          font-weight: 900;
        `}
        onClick={() => {
          ClickSound();
          setShowTalk(true);
        }}
      >
        Talk to us
      </button>
      <img
        className="position-absolute m-3"
        css={`
          height: 5em;
          width: 5em;
          right: 0;
          bottom: 0;
        `}
        src={assistant}
        alt="assistant"
      />
      <TalkToUsModal show={showTalk} onClose={() => setShowTalk(false)} />
    </div>
  );
}
