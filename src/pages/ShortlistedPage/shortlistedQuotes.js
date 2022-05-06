import React from "react";
import { Page } from "../../components";
import {
  useCompareSlot,
  useFrontendBoot,
  useQuotesCompare,
  useShortlistedPlans,
  useSortBy,
  useTheme,
} from "../../customHooks";
import { AssistanceCard } from "../quotePage/QuotesPage";
import QuoteCards from "../quotePage/components/QuoteCards";
import { QuoteCards as QuoteCardsMobile } from "../quotePage/mobile/components/Quotes";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { HeadingSecondary, TertiaryFontBold } from "../../styles/typography";
import { IoIosArrowBack } from "react-icons/io";
import { CompareQuotesTray } from "../quotePage/components/Quotes";
import { CompareTray } from "../quotePage/mobile/components/Quotes";
import GroupLinks from "./components/groupLinks/groupLinks";
import "styled-components/macro";

function ShortlistedQuotes() {
  const { getPlanByGroup } = useShortlistedPlans();

  const { groupCode } = useParams();

  const shortlistedQuotes = getPlanByGroup(groupCode);

  const { default: defaultSortBy } = useSortBy();

  const { colors } = useTheme();

  const history = useHistory();

  const { tenantAlias } = useFrontendBoot();

  // transforming quotes data
  const quotes = shortlistedQuotes.map(quote => ({
    cashlessHospitalsCount: quote?.cashlessHospitalsCount,
    data: {
      data: [[quote]],
    },
  }));

  const compare = useQuotesCompare();

  const compareSlot = useCompareSlot({ maxLength: 2 });

  const isQuotesOnCompare = compareSlot.quotes.length;

  const gotoQuotes = () => {
    history.goBack();
  };

  return (
    <Page noShadow>
      <GroupLinks />
      <Wrapper className="container">
        <Header>
          <LinkWrapper color={colors.primary_color} onClick={gotoQuotes}>
            <IoIosArrowBack size={15} />
            <TertiaryFontBold>
              <span
                css={`
                  @media (max-width: 768px) {
                    display: none;
                  }
                `}
              >
                Go back to quotes
              </span>
              <span
                css={`
                  display: none;
                  @media (max-width: 768px) {
                    display: block;
                  }
                `}
              >
                Quotes
              </span>
            </TertiaryFontBold>
          </LinkWrapper>
          <HeadingSecondary>Shortlisted quotes</HeadingSecondary>
        </Header>
        <div className="d-flex gap-3 align-items-start justify-content-center">
          <div
            css={`
              flex: 3;
              display: grid;
              gap: 10px;
              justify-content: ${tenantAlias !== "robinhood"
                ? "stretch"
                : "center"};
            `}
          >
            {quotes.length > 0 ? (
              <>
                {quotes.map(quote => (
                  <div
                    className="only-desktop"
                    css={`
                      width: 100%;
                      max-width: 850px;
                    `}
                  >
                    <QuoteCards
                      cashlessHospitalsCount={quote.cashlessHospitalsCount}
                      quotesData={quote.data}
                      compare={compare}
                      key={quote.company_alias}
                      sortBy={defaultSortBy?.code}
                    />
                  </div>
                ))}
                {quotes.map(quote => (
                  <div className="only-mobile">
                    <QuoteCardsMobile
                      cashlessHospitalsCount={quote.cashlessHospitalsCount}
                      quotesData={quote.data}
                      compare={compareSlot}
                      key={quote.company_alias}
                      sortBy={defaultSortBy?.code}
                    />
                  </div>
                ))}
              </>
            ) : (
              <div
                css={`
                  margin: 20vh auto;
                  text-align: center;
                `}
              >
                No shortlisted quotes!
              </div>
            )}
          </div>
          {tenantAlias !== "robinhood" && (
            <div
              css={`
                flex: 1;

                @media (max-width: 1025px) {
                  display: none;
                }
              `}
            >
              <AssistanceCard />
            </div>
          )}
        </div>
      </Wrapper>
      {compare?.isQuotesOnCompare ? (
        <CompareQuotesTray compare={compare} onClose={compare?.reset} />
      ) : null}

      {isQuotesOnCompare ? (
        <CompareTray
          quotes={compareSlot.quotes}
          onRemove={compareSlot.remove}
          onClose={compareSlot.clear}
        />
      ) : null}
    </Page>
  );
}

export default ShortlistedQuotes;

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
  padding-top: 20px;
  padding-bottom: 20px;

  @media (max-width: 850px) {
    width: 100%;
  }
`;

const LinkWrapper = styled.span`
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.color};
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;
