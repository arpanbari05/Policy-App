const validateEmail = str => {
  var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return str.match(pattern);
};

export default function validateInput(
  fullName,
  email,
  mobile,
  setFullNameErrors,
  setEmailErrors,
  setMobileErrors,
) {
  let isValidate = true;

  if (fullName.length < 3) {
    setFullNameErrors({ message: "Please enter a valid FullName." });
    isValidate = false;
  }
  if (fullName.length === 0) {
    setFullNameErrors({ message: "Full Name is required." });
    isValidate = false;
  }

  //  ============ mobile validations ==================
  if (!/[6-9]{1}[0-9]{9}/.test(mobile) || /^\d*(\d)\1{9}\d*$/.test(mobile)) {
    setMobileErrors({ message: "Please enter a valid Mobile no." });
    isValidate = false;
  }
  if (mobile.length === 0) {
    setMobileErrors({ message: "Mobile No. is required." });
    isValidate = false;
  }

  //  ==================== email validations ==================
  if (validateEmail(email) === null) {
    setEmailErrors({ message: "Please enter a valid Email id." });
    isValidate = false;
  }
  if (email.length === 0) {
    setEmailErrors({ message: "Email is required." });
    isValidate = false;
  }

  return isValidate;
}
