import { useParams } from "react-router-dom";
import { Import } from "../../components";
import { useMembers } from "../../customHooks";
import PageNotFound from "../PageNotFound";

function QuotesPage() {
  const { groupCode } = useParams();

  const { checkGroupExist } = useMembers();

  const isGroupExist = checkGroupExist(groupCode);

  if (!isGroupExist) return <PageNotFound />;

  return (
    <Import
      mobile={() =>
        import(
          /* webpackChunkName: "quotes-page-mobile" */ "./mobile/QuotesPage"
        )
      }
      desktop={() =>
        import(/* webpackChunkName: "quotes-page-desktop" */ "./QuotesPage")
      }
    >
      {Page => <Page />}
    </Import>
  );
}

export default QuotesPage;
