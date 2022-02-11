import { useState } from "react";
import CustomProgressBar from "../../../components/ProgressBar";
import { Title, ErrorMessage, firstFormSchema } from "./FormComponents";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import ReactSwitch from "react-switch";
import { boy, girl } from "../../../assets/images";
import TextInput2 from "../../../components/TextInput2";
import {
  useCreateEnquiry,
  useNameInput,
  useNumberInput,
  useTheme,
} from "../../../customHooks";
import useUrlQuery from "../../../customHooks/useUrlQuery";
import { Button } from "../../../components";
import { IoArrowForwardSharp } from "react-icons/io5";
import "styled-components/macro";
import { useHistory } from "react-router-dom";
import { useGetEnquiriesQuery } from "../../../api/api";
import { capitalize } from "../../../utils/helper";

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

  let inputData = {};

  const { data } = useGetEnquiriesQuery();

  if (data?.data) inputData = { ...data.data, gender: data.data.input.gender };

  const fullNameInput = useNameInput(inputData.name || "");
  const mobileInput = useNumberInput(inputData.mobile || "", { maxLength: 10 });
  const [gender, setGender] = useState(inputData.gender || "M");

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      mobile: mobileInput.value,
      name: fullNameInput.value,
      email: inputData.email || "",
      gender,
    },
    resolver: yupResolver(firstFormSchema),
    mode: "onBlur",
  });

  const [createEnquiry, createEnquiryQuery] = useCreateEnquiry();

  const urlSearchParams = useUrlQuery();
  const history = useHistory();

  const handleFormSubmit = async formData => {
    const params = Object.fromEntries(urlSearchParams.entries());
    const data = {
      name: capitalize(fullNameInput.value),
      email: formData.email,
      gender,
      mobile: mobileInput.value,
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
          <Title>Tell Us about yourself?</Title>
          <CustomProgressBar now={1} total={5} />
          <div
            css={`
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              & img {
                user-select: none;
              }
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
            <div
              className="d-flex aling-items-center justify-content-between w-100"
              css={`
                gap: 1em;
                & > div {
                  flex: 1;
                }
              `}
            >
              <div>
                <TextInput2
                  ref={register}
                  label="Full Name"
                  name="name"
                  {...fullNameInput}
                  maxLength={60}
                />
                <ErrorMessage>{errors.name?.message}</ErrorMessage>
              </div>
              <div>
                <TextInput2
                  ref={register}
                  label="Mobile No."
                  name="mobile"
                  {...mobileInput}
                />
                <ErrorMessage>{errors.mobile?.message}</ErrorMessage>
              </div>
            </div>
            <div className="mt-3 w-100">
              <TextInput2
                ref={register}
                type="email"
                name="email"
                label="Email Id"
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </div>
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
