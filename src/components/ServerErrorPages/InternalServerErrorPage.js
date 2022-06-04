import { StyledWrapper } from "./StyledCompErrors";
import { get500ErrorImage } from "./serverImages";

export default function InternalServerErrorPage() {
  const image = get500ErrorImage();
  return (
    <StyledWrapper imageSize="550px">
      <img src={image} alt="internal server error" />
      <h1>Opps! internal server error.</h1>
    </StyledWrapper>
  );
}
