import { useSelector } from "react-redux";
import { calculateTotalPremium } from "../../../utils/helper";

function useTotalPremium() {
  const cart = useSelector(state => state.cart);
  const { memberGroups } = useSelector(state => state.greetingPage);
  const groupCodes = Object.keys(cart).filter(item =>
    Object.keys(memberGroups).includes(item),
  );

  const totalPremium = groupCodes.reduce((totalPremium, groupCode) => {
    return totalPremium + cart[groupCode]
      ? calculateTotalPremium(cart[groupCode])
      : 0;
  }, 0);

  return { totalPremium };
}

export default useTotalPremium;
