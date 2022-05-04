import { Redirect, useLocation } from "react-router-dom";
import { allowOnWebsites } from "../utils/helper";

export function BaseComponent({ tenant }) {
  const location = useLocation();
  return !allowOnWebsites(["renewalRB"]) ? (
    <Redirect from="/" to={`/input/basic-details${location.search}`} />
  ) : (
    <Redirect from="/" to={`/input/renewal-details`} />
  );
}
