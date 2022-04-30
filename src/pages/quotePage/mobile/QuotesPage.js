import { BackButtonMobile, Page } from "../../../components";
import { GroupLinks } from "../components/UpperModifier";
import { useFrontendBoot, useTheme } from "../../../customHooks";
import { BottomNavigation } from "./components";
import { Quotes } from "./components/Quotes";
import { QuotesLoader } from "../components";
import "styled-components/macro";
import { SortByDialog } from "./components/SortBy";
import { useState } from "react";
import ErrorPopup from "../../ProposalPage/ProposalSections/components/ErrorPopup";
import { useSelector, useDispatch } from "react-redux";
import { setPosPopup } from "../quote.slice";
import { useUrlQueries } from "../../../customHooks/useUrlQuery";

function QuotesPage() {
  const { boxShadows } = useTheme();
  const dispatch = useDispatch();
  const { pos_popup } = useSelector(({ quotePage }) => quotePage);
  const urlQueries = useUrlQueries();
  const {
    data: {
      settings: { pos_nonpos_switch_message },
    },
  } = useFrontendBoot();

  return (
    <Page
      backButton={
        <BackButtonMobile
          path={`/input/medicalHistory?enquiryId=${urlQueries?.enquiryId}`}
        />
      }
      loader={<QuotesLoader />}
    >
      <div
        css={`
          border-radius: 0 0 1em 1em;
          box-shadow: ${boxShadows.four};
        `}
      >
        <GroupLinks />
      </div>
      <Main />
      {pos_popup && (
        <ErrorPopup
          handleClose={() => dispatch(setPosPopup(false))}
          htmlProps={pos_nonpos_switch_message}
        />
      )}
    </Page>
  );
}

function useSortBy(defaultSortBy = "relevance") {
  const [sortBy, setSortBy] = useState(defaultSortBy);

  const onChange = code => {
    setSortBy(code);
  };

  return { current: sortBy, onChange };
}

function Main() {
  const { default: defaultSortBy } = useSortBy();
  const sortBy = useSortBy(defaultSortBy?.code);

  return (
    <main>
      <div
        css={`
          padding-bottom: 6em;
        `}
      >
        <Quotes sortBy={sortBy.current} />
      </div>
      <BottomNavigation
        sortBy={
          <SortByDialog
            currentSortBy={sortBy.current}
            onChange={sortBy.onChange}
          />
        }
      />
    </main>
  );
}

export default QuotesPage;
