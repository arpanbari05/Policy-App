import { Page } from "../components";
import useNotFoundHandler from "../customHooks/useNotFoundHandler";

function PageNotFound(props) {
  const { pathname } = window.location;
  
  const filterdPath = pathname.split("/")[1];
  
  useNotFoundHandler(filterdPath);

  return <Page {...props}>Page not found!</Page>;
}

export default PageNotFound;
