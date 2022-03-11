import { useState } from "react";
import CustomProgressBar from "../../../components/ProgressBar";
import { Title, ErrorMessage } from "./FormComponents";
import ReactSwitch from "react-switch";
import { boy, girl } from "../../../assets/images";
import TextInput2 from "../../../components/TextInput2";
import {
  useCreateEnquiry,
  useNameInput,
  useNumberInput,
  useEmailInput,
  useTheme,
  useFrontendBoot,
} from "../../../customHooks";
import useUrlQuery from "../../../customHooks/useUrlQuery";
import { Button } from "../../../components";
import "styled-components/macro";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useGetEnquiriesQuery } from "../../../api/api";
import { capitalize } from "../../../utils/helper";
import * as mq from "../../../utils/mediaQueries";
import validateInput from "../../../utils/inputPageUtils";

const BasicDetailsForm = ({ ...props }) => {
  const paramsData = useLocation();
  const { colors } = useTheme();
  const {
    data: { tenant },
  } = useFrontendBoot();

  let inputData = {};

  const { data } = useGetEnquiriesQuery();

  if (data?.data?.input)
    inputData = {
      ...data.data,
      gender: data.data.input.gender,
    };

  const [emailError, setEmailErrors] = useState({});
  const [mobileError, setMobileErrors] = useState({});
  const [fullNameError, setFullNameErrors] = useState({});
  const fullNameInput = useNameInput(inputData.name || "", setFullNameErrors);
  const mobileInput = useNumberInput(inputData.mobile || "", setMobileErrors, {
    maxLength: 10,
  });
  const emailInput = useEmailInput(inputData.email || "", setEmailErrors);
  const [gender, setGender] = useState(inputData.gender || "M");
  const [journeyType, setJourneyType] = useState("health");
  const [createEnquiry, createEnquiryQuery] = useCreateEnquiry();
  const urlSearchParams = useUrlQuery();

  const history = useHistory();

  const handleFormSubmit = async event => {
    event.preventDefault();
    const validation = validateInput(
      fullNameInput.value,
      emailInput.value,
      mobileInput.value,
      setFullNameErrors,
      setEmailErrors,
      setMobileErrors,
    );
    if (!validation) {
      return;
    }

    try {
      const params = Object.fromEntries(urlSearchParams.entries());
      const data = {
        name: capitalize(fullNameInput.value),
        email: emailInput.value,
        gender,
        mobile: mobileInput.value,
        params,
        section: journeyType,
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
      <form noValidate onSubmit={handleFormSubmit}>
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
                  label="Full Name"
                  name="name"
                  type="text"
                  autoFocus
                  {...fullNameInput}
                  maxLength={60}
                />
                <ErrorMessage>{fullNameError.message}</ErrorMessage>
              </div>
              <div>
                <TextInput2
                  label="Mobile No."
                  name="mobile"
                  type="tel"
                  {...mobileInput}
                />
                <ErrorMessage>{mobileError.message}</ErrorMessage>
              </div>
            </div>
            <div className="w-100">
              <TextInput2
                type="email"
                name="email"
                label="Email Id"
                {...emailInput}
              />
              <ErrorMessage>{emailError.message}</ErrorMessage>
            </div>
          </div>
          {tenant.alias === "fyntune" ? (
            <div>
              Journey Type:
              <label className="mx-3">
                <input
                  type={"radio"}
                  name="journeyType"
                  value={"top_up"}
                  className="mx-1"
                  checked={journeyType === "top_up"}
                  onChange={() => {
                    setJourneyType("top_up");
                  }}
                />
                Topup
              </label>
              <label>
                <input
                  type={"radio"}
                  name="journeyType"
                  value={"health"}
                  className="mx-1"
                  checked={journeyType === "health"}
                  onChange={() => {
                    setJourneyType("health");
                  }}
                />
                Health
              </label>
            </div>
          ) : null}
        </div>

        <Button
          type="submit"
          className="w-100"
          disabled={createEnquiryQuery.isLoading}
          loader={createEnquiryQuery.isLoading}
          css={`
            height: 58px;
            font-weight: normal;
            font-size: 20px;
            @media (max-width: 480px) {
              font-size: 13px;
              font-weight: normal;
              padding: 5px 11px;
            }
          `}
        >
          Get Started
        </Button>
      </form>
    </div>
  );
};

export default BasicDetailsForm;
