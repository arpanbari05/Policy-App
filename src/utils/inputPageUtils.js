export const settings = {
  journey_type: "single",
  mobile: "000000000000000",
  email: "fyntunesolutionshealth@gmail.com",
  license: "00000000000000",
  logo: "https://health-admin-bucket.s3.ap-south-1.amazonaws.com/tenant_logos/fyntune.3b50b50a.png",
  primary_color: "#0a87ff",
  secondary_color: "#2cd44a",
  primary_shade: "#ecf6ff",
  secondary_shade: "#eef1f4",
  addons_visibilty: "1",
  riders_visibilty: "1",
  footer: "",
  input_banner_info: "",
  talk_to_us_info: "",
  multiindividual_visibilty: "1",
  top_up_flow: ["Single_Top_Up_Journey"],
  account_login_link: null,
  shop_more_link: null,
  b2b_enquiry_optionals: ["email", "mobile", "gender"],
  b2c_enquiry_optionals: ["email", "mobile", "gender"],
};

export function isEnquiryOptional(value, setting) {
  return setting?.b2b_enquiry_optionals?.includes(value);
}
const validateEmail = str => {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return str.match(pattern);
};

export default function validateInput({
  setting,
  fullNameInput,
  emailInput,
  mobileInput,
  setFullNameErrors = () => {},
  setEmailErrors = () => {},
  setMobileErrors = () => {},
}) {
  let isValidate = true;

  if (fullNameInput?.value?.length < 3) {
    setFullNameErrors({ message: "Please enter a valid FullName." });
    isValidate = false;
  }
  if (fullNameInput?.value?.length === 0) {
    setFullNameErrors({ message: "Full Name is required." });
    isValidate = false;
  }

  //  ============ mobile validations ==================
  if (
    (mobileInput.value.length > 0 &&
      !/[6-9]{1}[0-9]{9}/.test(mobileInput.value)) ||
    /^\d*(\d)\1{9}\d*$/.test(mobileInput.value)
  ) {
    setMobileErrors({ message: "Please enter a valid Mobile no." });
    isValidate = false;
  }
  if (mobileInput.value.length === 0) {
    if (!isEnquiryOptional("mobile", setting)) {
      setMobileErrors({ message: "Mobile No. is required." });
      isValidate = false;
    }
  }

  //  ==================== email validations ==================
  if (emailInput.value.length > 0 && validateEmail(emailInput.value) === null) {
    setEmailErrors({ message: "Please enter a valid Email id." });
    isValidate = false;
  }
  if (!isEnquiryOptional("email", setting) && emailInput.value.length === 0) {
    setEmailErrors({ message: "Email is required." });
    isValidate = false;
  }

  return isValidate;
}
