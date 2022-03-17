const validateEmail = str => {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return str.match(pattern);
};

export default function validateInput(
  fullNameInput,
  emailInput,
  mobileInput,
  setFullNameErrors = () => {},
  setEmailErrors = () => {},
  setMobileErrors = () => {},
) {
  let isValidate = true;

  if (fullNameInput.value.length < 3) {
    fullNameInput.touched && setFullNameErrors({ message: "Please enter a valid FullName." });
    isValidate = false;
  }
  if (fullNameInput.value.length === 0) {
    fullNameInput.touched && setFullNameErrors({ message: "Full Name is required." });
    isValidate = false;
  }

  //  ============ mobile validations ==================
  if ((!/[6-9]{1}[0-9]{9}/.test(mobileInput.value) || /^\d*(\d)\1{9}\d*$/.test(mobileInput.value))) {
    mobileInput.touched && setMobileErrors({ message: "Please enter a valid Mobile no." });
    isValidate = false;
  }
  if (mobileInput.value.length === 0) {
    mobileInput.touched && setMobileErrors({ message: "Mobile No. is required." });
    isValidate = false;
  }

  //  ==================== email validations ==================
  if (validateEmail(emailInput.value) === null) {
    emailInput.touched && setEmailErrors({ message: "Please enter a valid Email id." });
    isValidate = false;
  }
  if (emailInput.value.length === 0) {
    emailInput.touched && setEmailErrors({ message: "Email is required." });
    isValidate = false;
  }

  return isValidate;
}
