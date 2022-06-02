import { get503ErrorImage } from "./serverImages";
import { StyledWrapper } from "./StyledCompErrors";

export default function MaintenancePage() {
  const errorImage = get503ErrorImage();
  return (
    <StyledWrapper>
      <img src={errorImage} alt="under maintenance" />
      <h1>Opps! we are under scheduled maintenance</h1>
      <p>We &#39;re preparing to serve you better</p>
    </StyledWrapper>
  );
}
