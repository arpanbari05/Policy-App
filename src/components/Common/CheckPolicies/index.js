import { useHistory, useLocation, Redirect } from "react-router-dom";
import useUrlQuery from "../../../customHooks/useUrlQuery";
import { useGetPoliciesQuery } from "../../../api/api";
import { FullScreenLoader, FullScreenLoaderSkeleton } from "../../index";

const dontCheckPoliciesUrl = [
  "/",
  "/input/basic-details",
  "/thankyou",
  "input/portability",
];

export default function CheckPolicies({ children, ...props }) {
  const { pathname } = useLocation();
  const history = useHistory();

  const dontCheckPolicies = dontCheckPoliciesUrl.includes(pathname);

  const url = useUrlQuery();
  const enquiryId = url.get("enquiryId");
  const { isLoading, isUninitialized, data } = useGetPoliciesQuery(undefined, {
    skip: dontCheckPolicies,
  });

  if (dontCheckPolicies) return children;

  if (isLoading || isUninitialized) return <FullScreenLoader />;

  if (data && data.data?.length > 0) {
    const policies = data.data;

    const isPaymentSuccess = policies.every(
      policy => policy.payment_status === "success",
    );
    if (isPaymentSuccess) {
      history.replace(`/thankyou${history.location.search}`);
    } else {
      <Redirect
        to={{
          pathname: "/proposal_summary",
          search: `enquiryId=${enquiryId}`,
        }}
      />;
    }

    // const isPaymentFailed = policies.some((policy) => !!policy.payment_status);

    //   if (isPaymentFailed)
  }

  return children;
}
