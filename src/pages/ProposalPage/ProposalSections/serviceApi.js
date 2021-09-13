import httpClient from "./../../../api/httpClient";
export const saveProposal = data =>
  httpClient("health/proposals", { method: "POST", data });
export const submitProposal = data =>
  httpClient("companies/health_insurances/proposals", { method: "POST", data });
//export const payment = (data) => httpClient("payments", { data });

export const PaymentStatus = data =>
  httpClient("payment_status", { method: "GET" });

export const getProposal = () =>
  httpClient("health/proposals", { method: "GET" });
