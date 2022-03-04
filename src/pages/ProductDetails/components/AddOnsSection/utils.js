import { getInsuranceType, matchQuotes } from "../../../../utils/helper";

export function getAddOnMembers(addOn, quotesList = [], cartEntry) {
  if (!addOn) return [];
  const insurance_type = getInsuranceType(addOn);
  if (insurance_type === "top_up") {
    return cartEntry.group.members;
  }

  const members = ["all"];

  for (let quote of quotesList) {
    if (matchQuotes(addOn, quote)) {
      members.push(quote.member);
    }
  }

  return members;
}
