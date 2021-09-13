import httpClient from "../../api/httpClient";

export const  policyPdf = () => httpClient("policies", { method: "GET" });
