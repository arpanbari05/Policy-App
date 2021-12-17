import HttpClient from "../../api/httpClient";
import SecureLS from "secure-ls";

const ls = new SecureLS();

// const getQutoes = (
//   { alias, sum_insured, tenure, member, plan_type },
//   headers
// ) =>
//   HttpClient(
//     `companies/${alias}/quotes?sum_insured=${sum_insured}&tenure=${tenure}&plan_type=${plan_type}&members=${Array.prototype.map
//       ?.call(member || {}, (s) => s.type)
//       .toString()}`,
//     {
//       method: "GET",
//       ...headers,
//     }
//   );
const getQutoes = (
  {
    alias,
    sum_insured,
    tenure,
    member,
    plan_type,
    base_plan_type = "base_health",
  },
  headers
) => {
  return HttpClient(
    `companies/${alias}/quotes?sum_insured_range=${sum_insured}&tenure=${tenure}&plan_type=${plan_type}&group=${member}&base_plan_type=${base_plan_type}`,
    {
      method: "GET",
      ...headers,
    }
  );
};
// const getDiscount = ({ alias, productId, member }) =>
//   HttpClient(
//     `products/${productId}/discounts?members=${Array.prototype.map
//       ?.call(member || {}, (s) => s.type)
//       .toString()}&sum_insured=${ls.get("cover")}`
//   );
const getDiscount = ({ productId, sum_insured, group }) =>
  HttpClient(
    `products/${productId}/discounts?sum_insured=${sum_insured}&group=${group}`
  );

const deleteCart = ({ id }) =>
  HttpClient(`cart-items/${id}`, {
    method: "DELETE",
  });

const getCart = () =>
  HttpClient(`cart-items`, {
    method: "GET",
  });

const createCart = (data) =>
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
      ","
    )}`
  );
export const getAbhiRidersApi = ({
  productId,
  sum_insured,
  tenure,
  group,
  string,
}) =>
  HttpClient(
    `products/${productId}/riders?sum_insured=${sum_insured}&tenure=${tenure}&group=${group}&${string}`
  );

export const getFeaturesApi = (productId) =>
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
    `companies/${company_alias}/topup-quotes?deductible=${sum_insured}&tenure=${tenure}&group=${groupCode}`
  );

// export const updatePlanTypeFilter = ({ planTypeCode, companyAlias, member }) =>
//   HttpClient(
//     `companies/${companyAlias}/quotes?plan_type=${planTypeCode}&members=${Array.prototype.map
//       ?.call(member || {}, (s) => s.type)
//       .toString()}`,
//     {
//       method: "GET",
//     }
//   );

// export const updateCoverFilter = ({
//   coverCode,
//   companyAlias,
//   member,
//   tenure,
// }) =>
//   HttpClient(
//     `companies/${companyAlias}/quotes?sum_insured=${coverCode}&tenure=${tenure}&members=${Array.prototype.map
//       ?.call(member || {}, (s) => s.type)
//       .toString()}&tenure=1`,
//     {
//       method: "GET",
//     }
//   );

// export const updateMultiYearFilter = ({
//   yearCode,
//   companyAlias,
//   member,
//   sum_insured,
// }) =>
//   HttpClient(
//     `companies/${companyAlias}/quotes?sum_insured=400000-500000&members=${Array.prototype.map
//       ?.call(member || {}, (s) => s.type)
//       .toString()}&tenure=${yearCode}`,
//     {
//       method: "GET",
//     }
//   );

export { getQutoes, createCart, deleteCart, getCart, getDiscount };
