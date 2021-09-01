import HttpClient from "../../../api/httpClient";

const createUser = data =>
  HttpClient("enquiries", {
    method: "POST",
    data,
  });

const checkpinCode = data =>
  HttpClient(`locations?search=${data}`, { method: "GET" });

const updateUser = data =>
  HttpClient(`enquiries`, {
    method: "PATCH",
    data,
  });

const getProposerData = () =>
  HttpClient(`enquiries`, {
    method: "GET",
  });

export { createUser, updateUser, checkpinCode, getProposerData };
