import axios from "axios";
import { stringify } from "querystring";
import SecureLS from "secure-ls";

const defaultOptions = {
  headers: {},
  queryParams: null,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
};

export const restClient = axios.create();

restClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const err = error.response;
    const ls = new SecureLS();
    if (err.status === 401) {
      ls.remove("token");
      ls.remove("user");
    }
    return Promise.reject(error);
  }
);

const httpClient = async (url = "", options = defaultOptions) => {
  const ls = new SecureLS();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  let fullPath = `${baseUrl}${url}`;
  if (options.queryParams) {
    const queryString = stringify(options.queryParams);
    fullPath = `${fullPath}?${queryString}`;
  }

  const urlQueryStrings = new URLSearchParams(window.location.search);

  const token = ls.get("token");
  const EnquiryId = urlQueryStrings.get("enquiryId") || ls.get("enquiryId");

  if (token) {
    restClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  if (EnquiryId) {
    restClient.defaults.headers.common["Enquiry-Id"] = EnquiryId;
  }

  return await restClient({
    ...options,
    url: fullPath,
    method: options.method || "GET",
    data: options.data,
  })
    .then((response) => ({
      data: response.data,
      errors: response.data.errors,
      error: response.data.error,
      message: response.message,
      statusCode: response.status,
      success:
        (response.status === 200 || response.status === 201) &&
        response.data.status,
    }))
    .catch((err) => {
      // alert(err);
      return {
        data: null,
        success: false,
        message: err?.response?.data?.message,
        errors: err?.response?.data?.errors,
      };
    });
};

export default httpClient;
