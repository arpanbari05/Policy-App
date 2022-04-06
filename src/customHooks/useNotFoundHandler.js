import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useUrlEnquiry } from ".";

export default function useNotFoundHandler(filterPath) {
  const { groupCode } = useParams();
  const history = useHistory();
  const { getUrlWithEnquirySearch } = useUrlEnquiry();

  useEffect(() => {
    const localStorageSavedGroupCode = JSON.parse(localStorage.groups)[0].id;
    if (parseInt(groupCode) !== localStorageSavedGroupCode) {
      history.push(
        getUrlWithEnquirySearch(`/${filterPath}/${localStorageSavedGroupCode}`),
      );
    }
  }, [groupCode]);

  return 1;
}
