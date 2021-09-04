import httpClient from "../../../api/httpClient";

export const reportErrors = data =>
  httpClient(`frontend-errors`, { method: "POST", data });
