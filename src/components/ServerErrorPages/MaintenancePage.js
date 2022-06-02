import errorImage from "../../assets/svg/503.svg";
import { StyledWrapper } from "./StyledCompErrors";

export default function MaintenancePage() {
  return (
    <StyledWrapper>
      <img src={errorImage} alt="under maintenance" />
      <h1>Opps! we are under scheduled maintenance</h1>
      <p>We &#39;re preparing to serve you better</p>
    </StyledWrapper>
  );
}
