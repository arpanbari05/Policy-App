import httpClient from "../../api/httpClient";
export const proposalFields = (data) =>
  httpClient("proposal-fields", { queryParams: data });
