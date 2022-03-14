import { useLocation } from "react-router";

function useUrlQuery() {
  const value = new URLSearchParams(useLocation().search);
  return value;
}

export function useUrlQueries() {
  const queries = useLocation().search.split("?")[1];
  const paramsList = queries.split("&");
  const paramsObject = {};
  paramsList.forEach(data => {
    const value = data.search("=");
    const itemName = data.slice(0, value);
    const itemValue = data.slice(value + 1, data.length);
    paramsObject[itemName] = itemValue;
  });

  console.log(paramsObject);
  return paramsObject;
}

export default useUrlQuery;
