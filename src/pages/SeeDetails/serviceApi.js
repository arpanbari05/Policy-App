import httpClient from "./../../api/httpClient";

export const getFeatures = data =>
  httpClient(`products/${data}/features`, { method: "GET" });

export const getHospitals = data =>
  httpClient(`companies/${data}/network-hospitals`);

export const getClaimProcess = data =>
  httpClient(`companies/${data}/claim_processes`, { method: "GET" });

export const getAboutCompany = data =>
  httpClient(`companies/${data}/about`, { method: "GET" });

export const getProductBrochureAPI = ({ productId }) =>
  httpClient(`products/${productId}/brochure`);
