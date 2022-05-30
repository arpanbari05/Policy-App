import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useGetPoliciesQuery } from "../../../api/api";
import useUrlQuery from "../../../customHooks/useUrlQuery";
import { FullScreenLoader } from "../../index";

const dontCheckPoliciesUrl = [
  "/",
  "/input/basic-details",
  "/thankyou",
  "/input/portability",
  "/input/renewal-details",
];

export default function CheckPolicies({ children }) {
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
  }

  return children;
}
