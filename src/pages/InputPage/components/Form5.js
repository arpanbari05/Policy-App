import { useState, useEffect } from "react";
import StyledButton from "../../../components/StyledButton";
import TextInput from "../../../components/TextInput";
import CustomProgressBar from "../../../components/ProgressBar";
import {
  Title,
  SubTitle,
  ErrorMessage,
  formButtons,
  firstFormSchema,
} from "./FormComponents";
import { useSelector, useDispatch } from "react-redux";
import RadioCapsule from "../../../components/RadioCapsule";
import {
  getRegion,
  saveForm1UserDetails,
  saveForm2UserDetails,
  saveForm5UserDetails,
  setIsDisabled,
} from "../greetingPage.slice";
import "styled-components/macro";
import BackButton from "../../../components/BackButton";
import {
  checkAllChar,
  checkPreviousChar,
  forbiddedSymbols,
  forbiddedSymbols2,
  numOnly,
} from "../../../utils/formUtils";
import { useHistory } from "react-router-dom";
import SecureLS from "secure-ls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import ReactSwitch from "react-switch";
import { boy, girl } from "../../../assets/images";
import TextInput2 from "../../../components/TextInput2";

export const fieldSet1Data = [
  {
    type: "text",
    name: "fullName",
    label: "Full Name",
    placeHolder: "Enter Full Name.",
    maxLength: "60",
  },
  {
    type: "number",
    name: "mobile",
    label: "Mobile No.",
    placeHolder: "Enter mobile no.",
    maxLength: "10",
  },
  {
    type: "email",
    name: "email",
    label: "Email Id",
    placeHolder: "Enter email id.",
    maxLength: "50",
  },
];

export const fieldSet1RadioInputData = [
  {
    type: "radio",
    name: "gender",
    label: "Male",
    value: "M",
    id: "male",
  },
  {
    type: "radio",
    name: "gender",
    label: "Female",
    value: "F",
    id: "female",
  },
];

const Form5 = ({ handleChange, currentForm }) => {
  const dispatch = useDispatch();
  const ls = new SecureLS();
  const history = useHistory();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("M");
  const checkDoubleChar = (e) => {
    if (e.keyCode === 190 && fullName[fullName.length - 1] === " ") {
      e.preventDefault();
    }
    if (e.keyCode === 32 && fullName.length < 1) {
      e.preventDefault();
    }
  };
  const demoLogin = () => {
    setFullName("test test");
    setEmail("test@gmail.com");
    setMobile("9111111111");
  };
  const pushToQuotes = (groupCode) => {
    history.push({
      pathname: `/quotes/${groupCode}`,
      search: `enquiryId=${ls.get("enquiryId")}`,
    });
  };

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(firstFormSchema),
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    console.log("dgasgasd", 222);
    dispatch(
      saveForm2UserDetails(
        {
          fullName: fullName.trim(),
          mobile: mobile,
          email: email,
          gender: gender,
        },
        // pushToQuotes
        handleChange
      )
    );
    console.log(gender, fullName, email, mobile, "h21");
  };

  console.log("h21", errors);
  return (
    <div
      css={`
        display: ${currentForm !== 1 && "none"};
      `}
    >
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div
          css={`
            padding: 17px;
            @media (max-width: 480px) {
              padding: 10px !important;
            }
          `}
        >
          <Title onClick={demoLogin}>Tell Us about yourself?</Title>
          <CustomProgressBar now={currentForm} total={5} />
          <div
            css={`
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
            `}
          >
            <label
              css={`
                width: 100%;
                display: flex;
                align-items: center;
                margin-bottom: 35px;
                margin-top: 13px;
                font-weight: 900;
                & > div {
                  margin: 0 10px;
                }
                & img {
                  height: 45px;
                }
              `}
            >
              <img
                src={boy}
                alt={"girl"}
                css={`
                  filter: ${gender !== "M" && "grayscale(100%)"};
                `}
              />
              <span
                css={`
                  margin-left: 10px;
                  color: ${gender === "M" && "#2693e6"};
                `}
              >
                Male
              </span>
              <ReactSwitch
                onColor="#2693e6"
                offColor="#2693e6"
                onHandleColor="#86d3ff"
                handleDiameter={25}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={18}
                width={40}
                onChange={() => {
                  gender === "M" ? setGender("F") : setGender("M");
                }}
                checked={gender === "M" ? false : true}
              />
              <span
                css={`
                  margin-right: 10px;
                  color: ${gender === "F" && "#2693e6"};
                `}
              >
                Female
              </span>
              <img
                src={girl}
                alt={"girl"}
                css={`
                  filter: ${gender !== "F" && "grayscale(100%)"};
                `}
              />
            </label>

            {fieldSet1Data.map(
              ({ type, name, label, placeHolder, maxLength }) => (
                <span
                  css={`
                    width: ${name !== "email" ? "221px" : "100%"};
                    @media (max-width: 1100px) {
                      width: 100% !important;
                      /* margin: 0 11px; */
                    }
                  `}
                >
                  {console.log("The type of input feild renders", type)}{" "}
                  <TextInput2
                    styledCss={`  
                  margin-bottom: 19px;
                  & input {
                    text-transform:${name === "fullName" && "capitalize"};
                  }
                  @media (max-width: 480px) {
             width:100% !important;
              }
                  `}
                    label={name === "fullName" ? "Full Name" : label}
                    name={name}
                    type={type}
                    value={
                      name === "fullName"
                        ? fullName
                        : name === "email"
                        ? email
                        : name === "mobile"
                        ? mobile
                        : undefined
                    }
                    onKeyDown={
                      name === "mobile"
                        ? numOnly
                        : name === "fullName" && checkDoubleChar
                    }
                    onBlur={(e) => {
                      name === "fullName" && setFullName(e.target.value.trim());
                      name === "email" && setEmail(e.target.value);
                      //name === "mobile" && setMobile(e.target.value);
                    }}
                    onChange={(e) => {
                      name === "fullName" &&
                        checkPreviousChar(e.target.value, " ", fullName) &&
                        checkPreviousChar(e.target.value, ".", fullName) &&
                        //    checkDoubleChar(e, ".", " ") &&
                        checkAllChar(e.target.value, forbiddedSymbols2) &&
                        setFullName(e.target.value);
                      name === "email" &&
                        checkAllChar(e.target.value, forbiddedSymbols) &&
                        setEmail(e.target.value);

                      if (name === "mobile") {
                        !/^\d*(\d)\1{3}\d*$/.test(e.target.value) &&
                          setMobile(e.target.value);
                      }
                    }}
                    // onBlur={(e) => {
                    //   checkValidation(name, e.target.value);
                    //   console.log(e.target.value, "gads");
                    // }}
                    maxLength={maxLength}
                    onPaste={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    onCopy={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                    ref={register}
                  />
                  {errors[name]?.message && (
                    <ErrorMessage
                      css={`
                        margin-top: -16px;
                      `}
                    >
                      {errors[name].message}
                    </ErrorMessage>
                  )}
                </span>
              )
            )}
          </div>
          {/* {formButtons(
            () => {
              handleChange(currentForm - 1);
            },
            handleSubmit,
            true
          )} */}
        </div>

        <StyledButton
          styledCss={`margin:0; width: 100%;`}
          value={`Get Started`}
          onClick={handleSubmit}
          className="hide_on_mobile"
        />
      </form>
    </div>
  );
};

export default Form5;
