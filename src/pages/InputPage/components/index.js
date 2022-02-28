import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Button } from "../../../components";
import "styled-components/macro";

export function BackLink({ ...props }) {
  return (
    <Link
      css={`
        color: #000;
      `}
      {...props}
    >
      <BiArrowBack />
      Back
    </Link>
  );
}

export function InputFormCta({
  backLink,
  onContinueClick,
  loader = false,
  ...props
}) {
  const handleClick = () => onContinueClick && onContinueClick();
  return (
    <div
      className="d-flex justify-content-around align-items-center"
      {...props}
    >
      <BackLink to={backLink} />
      <Button
        onClick={handleClick}
        arrow
        loader={loader}
        css={`
          width: 7.9em;
        `}
      >
        Continue
      </Button>
    </div>
  );
}
