import { useState } from "react";
import CustomProgressBar from "../../../components/ProgressBar";
import { Title, ErrorMessage, firstFormSchema } from "./FormComponents";
import {
  checkAllChar,
  checkPreviousChar,
  forbiddedSymbols,
  forbiddedSymbols2,
  numOnly,
} from "../../../utils/formUtils";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import ReactSwitch from "react-switch";
import { boy, girl } from "../../../assets/images";
import TextInput2 from "../../../components/TextInput2";
import { useCreateEnquiry, useTheme } from "../../../customHooks";
import useUrlQuery from "../../../customHooks/useUrlQuery";
import { Button } from "../../../components";
import { IoArrowForwardSharp } from "react-icons/io5";
import "styled-components/macro";
import { useHistory } from "react-router-dom";

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

const BasicDetailsForm = ({ ...props }) => {
  const { colors } = useTheme();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("M");

  const checkDoubleChar = e => {
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

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(firstFormSchema),
    mode: "onBlur",
  });

  const [createEnquiry, createEnquiryQuery] = useCreateEnquiry();

  const urlSearchParams = useUrlQuery();
  const history = useHistory();

  const handleFormSubmit = async () => {
    const params = Object.fromEntries(urlSearchParams.entries());
    const data = {
      name: fullName,
      email,
      gender,
      mobile,
      params,
    };
    const response = await createEnquiry(data);

    if (response.data) {
      const enquiryId = response.data.data.enquiry_id;
      history.push({
        pathname: "/input/members",
        search: `enquiryId=${enquiryId}`,
      });
    }
  };

  return (
    <div {...props}>
      <form noValidate onSubmit={handleSubmit(handleFormSubmit)}>
        <div
          css={`
            padding: 17px;
            @media (max-width: 480px) {
              padding: 10px !important;
            }
          `}
        >
          <Title onClick={demoLogin}>Tell Us about yourself?</Title>
          <CustomProgressBar now={1} total={5} />
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
                  color: ${gender === "M" && colors.primary_color};
                `}
              >
                Male
              </span>
              <ReactSwitch
                onColor={colors.primary_color}
                offColor={colors.primary_color}
                onHandleColor={colors.primary_shade}
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
                  color: ${gender === "F" && colors.primary_color};
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
                    }
                  `}
                >
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
                    onBlur={e => {
                      name === "fullName" && setFullName(e.target.value.trim());
                      name === "email" && setEmail(e.target.value);
                      //name === "mobile" && setMobile(e.target.value);
                    }}
                    onChange={e => {
                      if (name === "fullName") {
                        checkPreviousChar(e.target.value, " ", fullName) &&
                          checkPreviousChar(e.target.value, ".", fullName) &&
                          checkAllChar(e.target.value, forbiddedSymbols2) &&
                          /^[a-zA-Z\s]*$/.test(e.target.value) &&
                          setFullName(e.target.value);
                      }
                      name === "email" &&
                        checkAllChar(e.target.value, forbiddedSymbols) &&
                        setEmail(e.target.value);

                      if (name === "mobile" && e.target.value.length <= 10) {
                        !/^\d*(\d)\1{9}\d*$/.test(e.target.value) &&
                          setMobile(e.target.value);
                      }
                    }}
                    maxLength={maxLength}
                    onPaste={e => {
                      e.preventDefault();
                      return false;
                    }}
                    onCopy={e => {
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
              ),
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-100"
          disabled={createEnquiryQuery.isLoading}
          loader={createEnquiryQuery.isLoading}
        >
          Get Started {!createEnquiryQuery.isLoading && <IoArrowForwardSharp />}
        </Button>
      </form>
    </div>
  );
};

export default BasicDetailsForm;
