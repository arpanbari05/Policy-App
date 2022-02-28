import HttpClient from "../../api/httpClient";

export const getCartApi = () => HttpClient(`cart-items`);

export const createCartApi = data =>
  HttpClient(`cart-items`, {
    method: "POST",
    data,
  });

export const updateCartApi = ({ cartId, ...data }) =>
  HttpClient(`cart-items/${cartId}`, {
    method: "PUT",
    data,
  });

export const deleteCartApi = ({ cartId }) =>
  HttpClient(`cart-items/${cartId}`, {
    method: "DELETE",
  });
