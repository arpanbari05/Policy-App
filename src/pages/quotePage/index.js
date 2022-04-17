import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Import } from "../../components";
import { useMembers } from "../../customHooks";
import PageNotFound from "../PageNotFound";
import QuotePageMobile from "./mobile/QuotesPage";
import QuotePage from "./QuotesPage";

function QuotesPage() {
  const { groupCode } = useParams();
  const [isGroupExist, setGroupExist] = useState(true);

  useEffect(() => {
    const isGroupExist = checkGroupExist(groupCode);
    setGroupExist(isGroupExist);
  }, [groupCode]);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const { checkGroupExist } = useMembers();

  if (!isGroupExist) return <PageNotFound />;

  return isMobile ? <QuotePageMobile /> : <QuotePage />;
  // <Import
  //   mobile={() =>
  //     import(
  //       /* webpackChunkName: "quotes-page-mobile" */ "./mobile/QuotesPage"
  //     )
  //   }
  //   desktop={() =>
  //     import(/* webpackChunkName: "quotes-page-desktop" */ "./QuotesPage")
  //   }
  // >
  //   {Page => <Page />}
  // </Import>
}

export default QuotesPage;
