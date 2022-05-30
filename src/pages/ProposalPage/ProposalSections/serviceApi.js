import httpClient from "./../../../api/httpClient";
export const fetchUnderWritingMQ = () =>
  httpClient("health/proposals/underwriting-status", { method: "POST" });
export const saveProposal = data =>
  httpClient("health/proposals", { method: "POST", data });
export const submitProposal = data =>
  httpClient("companies/health_insurances/proposals", { method: "POST", data });
//export const payment = (data) => httpClient("payments", { data });

export const PaymentStatus = () =>
  httpClient("payment_status", { method: "GET" });

export const getProposal = () =>
  httpClient("health/proposals", { method: "GET" });

export const getMedicalUrls = () =>
  httpClient("health/proposals/medical-url", { method: "POST" });
export const getMedicalLetter = () =>
  httpClient("health/proposals/medical-letter", { method: "POST" });
