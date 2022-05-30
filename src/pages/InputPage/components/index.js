import { Link } from "react-router-dom";
import { Button } from "../../../components";
import "styled-components/macro";

export function BackLink({ goBack = () => {}, ...props }) {
  return (
    <Link
      onClick={goBack}
      css={`
        color: #000;
        height: 58px;
        width: 172px;
        background: unset;
        padding: 10px 11px;
        color: rgb(37, 56, 88);
        font-weight: 900;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: 600;
        gap: 3px;

        @media (max-width: 480px) {
          background: rgb(239, 243, 245);
          color: rgb(70, 86, 113);
          font-size: 13px;
          height: 40px;
          max-width: 120px;
          width: 100%;
          padding: 0;
        }
      `}
      {...props}
    >
      {/* <BiArrowBack /> */}
      <span>Back</span>
    </Link>
  );
}

export function InputFormCta({
  disabled,
  backLink,
  goBack,
  onContinueClick,
  name,
  formNo,
  loader = false,
  loaderPrimaryColor,
  edit = false,
  ...props
}) {
  const handleClick = () => onContinueClick && onContinueClick();
  return (
    <div
      className="d-flex justify-content-between align-items-center"
      css={`
        padding: ${edit ? "0" : "0px 28px"};
        @media (max-width: 480px) {
          padding: ${name === "location" ? "0" : "0 17px"};
        }
      `}
      {...props}
    >
      <BackLink goBack={goBack} to={backLink} />
      <Button
        loaderPrimaryColor={loaderPrimaryColor}
        disabled={disabled}
        onClick={handleClick}
        arrow
        loader={loader}
        css={`
          height: 58px;
          width: 100%;
          max-width: 172px;
          font-size: 20px;
          font-weight: 400;

          @media (max-width: 480px) {
            font-size: 13px;
            height: 40px;
            width: 100%;
            max-width: 120px;
            padding: 5px 11px;
            font-weight: normal;
          }
        `}
      >
        {formNo === 5 ? "View Quotes" : "Continue"}
      </Button>
    </div>
  );
}
