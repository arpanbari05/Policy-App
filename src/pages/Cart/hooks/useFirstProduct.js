import { useSelector } from "react-redux";

function useFirstGroupCodeWithProduct() {
  const { memberGroups } = useSelector(state => state.greetingPage);
  const cart = useSelector(state => state.cart);
  const selectedGroupCodes = Object.keys(cart);
  const allMemberGroups = Object.keys(memberGroups);
  const firstGroupCodeWithProduct = selectedGroupCodes.find(
    groupCode =>
      cart[groupCode] !== null && allMemberGroups.includes(groupCode),
  );

  return { firstGroupCodeWithProduct };
}

export default useFirstGroupCodeWithProduct;
