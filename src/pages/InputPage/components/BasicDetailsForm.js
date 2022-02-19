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
import * as mq from "../../../utils/mediaQueries";

const BasicDetailsForm = ({ ...props }) => {
  const { colors } = useTheme();

  let inputData = {};

  const { data } = useGetEnquiriesQuery();

  if (data?.data?.input)
    inputData = { ...data.data, gender: data.data.input.gender };

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
    try {
      const params = Object.fromEntries(urlSearchParams.entries());
      const data = {
        name: capitalize(fullNameInput.value),
        email: formData.email,
        gender,
        mobile: mobileInput.value,
        params,
        section: formData.journeyType,
      };
      const response = await createEnquiry(data);

      if (response.data) {
        const enquiryId = response.data.data.enquiry_id;
        if (!enquiryId) throw Error("Something went wrong");
        history.push({
          pathname: "/input/members",
          search: `enquiryId=${enquiryId}`,
        });
      }
    } catch (error) {
      alert("Something went wrong");
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
                ${mq.mobile} {
                  flex-direction: column;
                  gap: 0;
                }
              `}
            >
              <div>
                <TextInput2
                  ref={register}
                  label="Full Name"
                  name="name"
                  autoFocus
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
            <div className="w-100">
              <TextInput2
                ref={register}
                type="email"
                name="email"
                label="Email Id"
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </div>
          </div>
          <div>
            Journey Type:
            <label className="mx-3">
              <input
                type={"radio"}
                name="journeyType"
                value={"top_up"}
                defaultChecked={
                  !inputData.section || inputData.section === "top_up"
                }
                className="mx-1"
                ref={register}
              />
              Topup
            </label>
            <label>
              <input
                type={"radio"}
                name="journeyType"
                value={"health"}
                className="mx-1"
                ref={register}
                defaultChecked={inputData.section === "health"}
              />
              Health
            </label>
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
