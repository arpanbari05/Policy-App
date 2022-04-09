const acceptedEmailExtensions = [
  ".com",
  ".org",
  ".in",
  ".outlook",
  ".co.in",
  ".rediff",
  ".net",
  ".co",
  ".co.jp",
  ".info",
  ".local",
  ".bike",
  ".jll.com",
];

const verifyDomain = emailString => {
  let pass = false;
  acceptedEmailExtensions.map(ext => {
    if (
      ext ===
      emailString.slice(emailString.lastIndexOf("."), emailString.length)
    ) {
      pass = true;
    }
  });
  return pass;
};

export function isEnquiryOptional(value, setting) {
  return (
    localStorage.getItem("SSO_user") !== null &&
    setting?.b2b_enquiry_optionals?.includes(value)
  );
}
const validateEmail = str => {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (str.match(pattern)) {
    return verifyDomain(str);
  } else {
    return false;
  }
};

export default function validateInput({
  settings,
  fullNameInput,
  emailInput,
  mobileInput,
  setFullNameErrors = () => {},
  setEmailErrors = () => {},
  setMobileErrors = () => {},
}) {
  let isValidate = true;

  if (fullNameInput?.value?.length > 0 && fullNameInput?.value?.length < 3) {
    setFullNameErrors({ message: "Please enter a valid FullName." });
    isValidate = false;
  }
  if (
    !isEnquiryOptional("name", settings) &&
    fullNameInput?.value?.length === 0
  ) {
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
    if (!isEnquiryOptional("mobile", settings)) {
      setMobileErrors({ message: "Mobile No. is required." });
      isValidate = false;
    }
  }

  //  ==================== email validations ==================
  if (emailInput.value.length > 0 && !validateEmail(emailInput.value)) {
    setEmailErrors({ message: "Please enter a valid Email id." });
    isValidate = false;
  }
  if (!isEnquiryOptional("email", settings) && emailInput.value.length === 0) {
    setEmailErrors({ message: "Email is required." });
    isValidate = false;
  }

  return isValidate;
}
