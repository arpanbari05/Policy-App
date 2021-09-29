import httpClient from "../../api/httpClient";

export const getCriticalIllnessAddOnsApi = ({
  companyAlias,
  tenure,
  groupCode,
}) =>
  httpClient(
    `companies/${companyAlias}/critical-illness-quotes?tenure=${tenure}&group=${groupCode}`,
  );

export const getCancerAddonsApi = ({ companyAlias, tenure, groupCode }) =>
  httpClient(
    `companies/${companyAlias}/cancer-quotes?tenure=${tenure}&group=${groupCode}`,
  );

export const getAdditionalDiscounts = ({
  product_id,
  groupCode,
  tenure,
  sum_insured,
}) =>
  httpClient(
    `products/${product_id}/additional-discounts?group=${groupCode}&sum_insured=${sum_insured}&tenure=${tenure}`,
  );

export const getAddOnDetails = ({productId}) =>{
  console.log(productId,"productId2")
  return httpClient(`products/${productId}/features`);
}
  
