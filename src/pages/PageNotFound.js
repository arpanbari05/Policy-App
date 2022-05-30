import useNotFoundHandler from "../customHooks/useNotFoundHandler";

function PageNotFound() {
  const { pathname } = window.location;

  const filterdPath = pathname.split("/")[1];

  useNotFoundHandler(filterdPath);

  return <></>;
}

export default PageNotFound;
