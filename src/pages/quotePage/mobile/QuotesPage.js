import { BackButtonMobile, Page } from "../../../components";
import { GroupLinks } from "../components/UpperModifier";
import { useTheme } from "../../../customHooks";
import { BottomNavigation } from "./components";
import { Quotes } from "./components/Quotes";
import { QuotesLoader } from "../components";
import "styled-components/macro";

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
      <div
        css={`
          padding-bottom: 6em;
        `}
      >
        <Quotes />
      </div>
      <BottomNavigation />
    </Page>
  );
}

export default QuotesPage;
