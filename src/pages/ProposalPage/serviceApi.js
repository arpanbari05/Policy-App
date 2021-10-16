import httpClient from "../../api/httpClient";
export const proposalFields = (data) =>
  httpClient("proposal-fields", { queryParams: data });

  export const getTermConditions = (data) =>
  httpClient(`companies/${data}/terms_and_conditions`, { method: "GET" });