import { useSelector } from "react-redux";
import { calculateTotalPremium } from "../../../utils/helper";
import { useFrontendBoot } from "../../../customHooks";

function useTotalPremium() {
  const cart = useSelector(state => state.cart);

  const { memberGroups } = useSelector(state => state.greetingPage);

  const groupCodes = Object.keys(cart).filter(item =>
    Object.keys(memberGroups).includes(item),
  );

  const { journeyType } = useFrontendBoot();

  const totalPremium = groupCodes.reduce((totalPremium, groupCode) => {
    return totalPremium + cart[groupCode]
      ? calculateTotalPremium(cart[groupCode], {}, journeyType)
      : 0;
  }, 0);

  return { totalPremium };
}

export default useTotalPremium;
