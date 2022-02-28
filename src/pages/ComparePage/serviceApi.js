import httpClient from "../../api/httpClient";

export const sendEmail = data =>
  httpClient("quotes/compare/share", {
    method: "POST",
    data: { ...data, via: "email" },
  });
export const updateComparison = data =>
  httpClient("comparisons", { method: "PUT", data });
export const fetchComparison = () =>
  httpClient("comparisons", { method: "GET" });
