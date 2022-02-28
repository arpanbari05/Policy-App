import { BackButtonMobile, Page } from "../../../components";
import { GroupLinks } from "../components/UpperModifier";
import { useTheme } from "../../../customHooks";
import { BottomNavigation } from "./components";
import { Quotes } from "./components/Quotes";
import { QuotesLoader } from "../components";
import "styled-components/macro";
import { SortByDialog } from "./components/SortBy";
import { useState } from "react";

function QuotesPage() {
  const { boxShadows } = useTheme();

  return (
    <Page backButton={<BackButtonMobile path="/" />} loader={<QuotesLoader />}>
      <div
        css={`
          border-radius: 0 0 1em 1em;
          box-shadow: ${boxShadows.four};
        `}
      >
        <GroupLinks />
      </div>
      <Main />
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
  const sortBy = useSortBy();

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
