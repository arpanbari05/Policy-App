import { useParams } from "react-router-dom";
import { Import } from "../../components";
import { useMembers } from "../../customHooks";
import PageNotFound from "../PageNotFound";

function ComparePage() {
  const { groupCode } = useParams();

  const { checkGroupExist } = useMembers();

  const isGroupExist = checkGroupExist(groupCode);

  if (!isGroupExist) return <PageNotFound />;

  return (
    <Import
      mobile={() =>
        import(
          /* webpackChunkName: "compare-page-mobile" */ "./mobile/ComparePage"
        )
      }
      desktop={() =>
        import(/* webpackChunkName: "compare-page-desktop" */ "./ComparePage")
      }
    >
      {Page => <Page />}
    </Import>
  );
}

export default ComparePage;
