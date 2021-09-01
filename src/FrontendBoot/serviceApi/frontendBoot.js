import HttpClient from "../../api/httpClient";

export const getFrontendData = () =>
  HttpClient(`frontend-boot`, { method: "GET" });

export const getCityForPincode = ({ pincode }) =>
  HttpClient(`locations?search=${pincode}`, { method: "GET" });
