import errorImageBase from "../../assets/svg/500.svg";
import errorImageRB from "../../assets/svg/500rb.svg";
import errorImagePinc from "../../assets/svg/500pinc.svg";
import errorImageBlue from "../../assets/svg/500blue.svg";
import maintenanceErrorImage from "../../assets/svg/503.svg";
import maintenanceErrorImagePinc from "../../assets/svg/503pinc.svg";
import maintenanceErrorImageRB from "../../assets/svg/503rb.svg";
import maintenanceErrorImageBlue from "../../assets/svg/503blue.svg";

export function get500ErrorImage() {
  const broker = process.env.REACT_APP_TENANT;

  switch (broker) {
    case "fyntune":
      return errorImageBlue;
    case "pinc":
      return errorImagePinc;
    case "renew_buy":
      return errorImageRB;
    default:
      return errorImageBase;
  }
}

export function get503ErrorImage() {
  const broker = process.env.REACT_APP_TENANT;

  switch (broker) {
    case "fyntune":
      return maintenanceErrorImageBlue;
    case "pinc":
      return maintenanceErrorImagePinc;
    case "renew_buy":
      return maintenanceErrorImageRB;
    default:
      return maintenanceErrorImage;
  }
}
