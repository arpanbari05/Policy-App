import styled from "styled-components/macro";
import BackButton from "../../../components/BackButton";
import StyledButton from "../../../components/StyledButton";
import * as yup from "yup";
import "yup-phone";
import styles from "../../../styles";

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 900;
  color: ${styles.colors.font.one};
  text-decoration: capitalize;
  @media (max-width: 480px) {
    font-size: 18px;
  }
  text-transform: capitalize;
`;
export const SubTitle = styled.h3`
  font-size: 16px;
  font-weight: 900;
`;
export const SubQuestions = styled.h3`
  font-size: 16px;
  font-weight: 900;
`;
export const SubAnswer = styled.h3`
  font-size: 12px;
  font-weight: 900;
  color: #9696b5;
  width: 87%;
`;
export const ErrorMessage = styled.p`
  font-size: 12px;
  color: red;
  width: 100%;
`;
export function formButtons(handleChange, handleSubmit, lastForm) {
  return (
    <div
      css={`
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0px 17px 17px;
        @media (max-width: 480px) {
          padding: 10px 0px !important;
        }
      `}
    >
      <div
        css={`
          width: 40%;
          @media screen and (max-width: 480px) {
            width: 120px;
            height: 40px;
          }
        `}
      >
        <BackButton
          value={`Back`}
          onClick={handleChange}
          width={`100%`}
          styledCss={`
          margin: 0;
          @media screen and (max-width: 480px) {
            height: 40px !important;
          }
          `}
        />
      </div>

      <div
        css={`
          width: 40%;
          @media screen and (max-width: 480px) {
            width: 120px;
            height: 40px;
          }
        `}
      >
        <StyledButton
          value={lastForm ? "View Quotes" : `Continue`}
          onClick={handleSubmit}
          width={`100%`}
          css={``}
          styledCss={`
           margin: 0; 
           @media screen and (max-width: 480px) {
            height: 40px !important;
          }`}
        />
      </div>
    </div>
  );
}

export const acceptedEmailExtensions = [
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
const mobile = /[6-9]{1}[0-9]{9}$/;
const fullName = /^[a-zA-Z. ]{3,60}$/;
const email =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const firstFormSchema = yup.object({
  name: yup
    .string()
    .required("Full Name is required.")
    .matches(fullName, "Please enter a valid Full Name."),
  email: yup
    .string()
    .required("Email is required.")
    .matches(email, "Please enter a valid Email id.")
    .test("email", "Please enter valid email id", givenValue => {
      const value = givenValue.toLowerCase();
      if (acceptedEmailExtensions.find(ext => value.endsWith(ext))) {
        if (!value.endsWith(".co.in") && !value.endsWith(".co.jp"))
          if (
            value
              .substr(
                value.indexOf("@") + 1,
                value.lastIndexOf(".") - (value.indexOf("@") + 1),
              )
              .includes(".")
          ) {
            return false;
          }
        return true;
      }
      return false;
    }),
  mobile: yup
    .string()
    .required("Mobile no. is required.")
    .matches(mobile, "Please enter a valid Mobile No.")
    .label("Mobile No."),
  // declaration: yup
  //   .boolean()
  //   .oneOf([true], "Please Accept terms and conditions"),
});

export const secondFormSchema = yup.object({
  // pinCode: yup.string().required("Invalid Pincode or city"),
  // cities: yup.string().nullable().required("select city"),
});

export const forthFormSchema = yup.object({
  planType: yup.string().nullable().required("Select plan"),
});

export const fifthFormSchema = yup.object({
  medicalHistory: yup.string().nullable().required("Select one option"),
});
