import { Redirect, useLocation } from "react-router-dom";

export function BaseComponent({ tenant }) {
  const location = useLocation();
  console.log(location.search);
  return <Redirect from="/" to={`/input/basic-details${location.search}`} />;
}
