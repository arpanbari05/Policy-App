import { useLocation } from "react-router";

function useUrlQuery() {
  return new URLSearchParams(useLocation().search);
}

export default useUrlQuery;
