import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuoteToCart, removeQuoteFromCart } from "../cart.slice";
import { createCartApi, deleteCartApi, updateCartApi } from "../serviceApi";

function cartSendData(cartData) {
  if (!cartData) return;
  const {
    product,
    tenure,
    sum_insured,
    service_tax,
    total_premium,
    premium,
    health_riders,
    addons: addOns,
    discounts,
  } = cartData;
  const riders = health_riders
    ? health_riders.map(health_rider => ({
        ...health_rider,
        id: health_rider.rider_id,
      }))
    : [];
  const addons = addOns
    ? addOns.map(addOn => ({
        product_id: addOn.product.id,
        tenure: addOn.tenure,
        sum_insured: addOn.sum_insured,
        deductible: sum_insured,
        premium: addOn.total_premium || addOn.premium,
        tax_amount: addOn.tax_amount,
        total_premium: addOn.total_premium || addOn.gross_premium,
        members: addOn.members,
      }))
    : [];
  return {
    product_id: product.id,
    tenure,
    sum_insured,
    premium: premium,
    service_tax,
    total_premium,
    riders,
    addons,
    discounts: discounts
      ? discounts.map(discount => discount.alias)
      : undefined,
  };
}

function useCartProduct(groupCode, selectedProduct) {
  if (!groupCode)
    throw new Error("argument 'groupCode' is missing for useCartProduct");

  const product = useSelector(({ cart }) => cart[groupCode] || selectedProduct);

  const cartProduct = useSelector(({ cart }) => cart[groupCode]);

  let totalRidersPremium = null;

  let totalAddOnsPremium = null;

  let totalPremium = null;

  if (product) {
    const { total_premium, health_riders, addons } = product;

    totalRidersPremium = health_riders.reduce(
      (sum, rider) => sum + parseInt(rider.total_premium),
      0,
    );

    totalAddOnsPremium = addons.reduce(
      (sum, addon) => sum + parseInt(addon.total_premium || addon.premium),
      0,
    );

    totalPremium =
      parseInt(total_premium) + totalRidersPremium + totalAddOnsPremium;
  }

  const [isCartProductLoading, setIsCartProductLoading] = useState(false);

  const dispatch = useDispatch();

  const updateProductRedux = useCallback(
    productData => {
      dispatch(addQuoteToCart({ groupCode, product: productData }));
    },
    [dispatch, groupCode],
  );

  const updateProduct = useCallback(
    async productData => {
      if (!cartProduct) {
        throw new Error("cart is not created");
      }
      try {
        setIsCartProductLoading(true);
        const { data, statusCode } = await updateCartApi({
          cartId: product.id,
          ...cartSendData(productData),
        });
        setIsCartProductLoading(false);
        if (!data) {
          return false;
        }
        if (data) {
          const { data: createCartData } = data;
          if (statusCode === 200) {
            dispatch(addQuoteToCart({ groupCode, product: createCartData }));
            return true;
          }
        }
      } catch (error) {
        setIsCartProductLoading(false);
        console.error(error);
        return false;
      }
    },
    [dispatch, groupCode, product],
  );

  const addProduct = useCallback(
    async productData => {
      // if (cartProduct?.id) {
      //   return updateProduct(productData);
      // }
      try {
        setIsCartProductLoading(true);
        const {
          data: { data: createCartData },
          statusCode,
        } = await createCartApi(productData);
        setIsCartProductLoading(false);
        if (statusCode === 201) {
          dispatch(addQuoteToCart({ groupCode, product: createCartData }));
          return true;
        }
      } catch (error) {
        console.error(error);
        setIsCartProductLoading(false);
      }
    },
    [dispatch, groupCode, product, updateProduct],
  );

  const deleteProduct = useCallback(async () => {
    if (!product) return;
    try {
      const response = await deleteCartApi({ cartId: product.id });
      if (response.statusCode === 204) {
        dispatch(removeQuoteFromCart(groupCode));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, groupCode, product]);

  const updateRiders = useCallback(
    riders =>
      updateProduct({
        ...product,
        health_riders: undefined,
        product: undefined,
        addons: undefined,
        id: undefined,
        members: undefined,
        product_id: product.product.id,
        riders,
      }),
    [product, updateProduct],
  );

  return {
    product,
    addProduct,
    updateProduct,
    deleteProduct,
    isCartProductLoading,
    totalRidersPremium,
    totalPremium,
    updateRiders,
    updateProductRedux,
  };
}

export default useCartProduct;
