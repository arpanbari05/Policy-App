import HttpClient from "../../api/httpClient";

const getQutoes = (
  {
    alias,
    sum_insured,
    tenure,
    member,
    plan_type,
    base_plan_type = "base_health",
  },
  headers,
) => {
  return HttpClient(
    `companies/${alias}/quotes?sum_insured_range=${sum_insured}&tenure=${tenure}&plan_type=${plan_type}&group=${member}&base_plan_type=${base_plan_type}`,
    {
      method: "GET",
      ...headers,
    },
  );
};

const getDiscount = ({ productId, sum_insured, group }) =>
  HttpClient(
    `products/${productId}/discounts?sum_insured=${sum_insured}&group=${group}`,
  );

const deleteCart = ({ id }) =>
  HttpClient(`cart-items/${id}`, {
    method: "DELETE",
  });

const getCart = () =>
  HttpClient(`cart-items`, {
    method: "GET",
  });

const createCart = data =>
  HttpClient(`cart-items`, {
    method: "POST",
    data,
  });

export const updateCart = ({ cartId, ...data }) =>
  HttpClient(`cart-items/${cartId}`, {
    method: "PUT",
    data,
  });

export const getRidersApi = ({
  productId,
  sum_insured,
  tenure,
  group,
  selected_riders = [],
}) =>
  HttpClient(
    `products/${productId}/riders?sum_insured=${sum_insured}&tenure=${tenure}&group=${group}&selected_riders=${selected_riders.join(
      ",",
    )}`,
  );

export const getAbhiRidersApi = ({
  productId,
  sum_insured,
  tenure,
  group,
  string,
}) =>
  HttpClient(
    `products/${productId}/riders?sum_insured=${sum_insured}&tenure=${tenure}&group=${group}&${string}`,
  );

export const getFeaturesApi = productId =>
  HttpClient(`products/${productId}/features`);

export const updateGroups = ({ groupCode, data }) =>
  HttpClient(`groups/${groupCode}`, {
    method: "PUT",
    data,
  });

export const getUpdatedGroups = ({ groupCode }) =>
  HttpClient(`groups/${groupCode}`);

export const getTopUpAddOnsApi = ({
  company_alias,
  sum_insured,
  tenure,
  groupCode,
}) =>
  HttpClient(
    `companies/${company_alias}/topup-quotes?deductible=${sum_insured}&tenure=${tenure}&group=${groupCode}`,
  );

export { getQutoes, createCart, deleteCart, getCart, getDiscount };
