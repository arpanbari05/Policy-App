import { Redirect, useLocation } from "react-router-dom";

export function BaseComponent({ tenant }) {
  const location = useLocation();
  return !location.origin?.includes(tenant?.health_renewal_frontend_domain) ? (
    <Redirect from="/" to={`/input/basic-details${location.search}`} />
  ) : (
    <Redirect from="/" to={`/input/renewal-details`} />
  );
}
