import { StyledWrapper } from "./StyledCompErrors";
import errorImage from "../../assets/svg/500.svg";

export default function InternalServerErrorPage() {
  return (
    <StyledWrapper imageSize="550px">
      <img src={errorImage} alt="internal server error" />
      <h1>Opps! internal server error.</h1>
    </StyledWrapper>
  );
}
