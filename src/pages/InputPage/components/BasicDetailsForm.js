import { useState } from "react";
import CustomProgressBar from "../../../components/ProgressBar";
import { Title, ErrorMessage } from "./FormComponents";
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
import { useUrlQueries } from "../../../customHooks/useUrlQuery";
import { Button } from "../../../components";
import "styled-components/macro";
import { useHistory } from "react-router-dom";
import { useGetEnquiriesQuery } from "../../../api/api";
import { capitalize } from "../../../utils/helper";
import * as mq from "../../../utils/mediaQueries";
import validateInput, {
  isEnquiryOptional,
  settings,
} from "../../../utils/inputPageUtils";
import styled from "styled-components";

const BasicDetailsForm = ({ posContent, ...props }) => {
  const { colors } = useTheme();
  const {
    data: { tenant, settings },
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
  const [shouldProceed, setShouldProceed] = useState(false);
  const fullNameInput = useNameInput(inputData.name || "", setFullNameErrors);
  const mobileInput = useNumberInput(inputData.mobile || "", setMobileErrors, {
    maxLength: 10,
  });
  const emailInput = useEmailInput(inputData.email || "", setEmailErrors);
  const [gender, setGender] = useState(inputData.gender || "");
  const [journeyType, setJourneyType] = useState("health");
  const [createEnquiry, createEnquiryQuery] = useCreateEnquiry();
  const urlSearchParams = useUrlQueries();

  const history = useHistory();

  const handleFormSubmit = async event => {
    event.preventDefault();
    const validation = validateInput({
      settings,
      fullNameInput,
      emailInput,
      mobileInput,
      setFullNameErrors,
      setEmailErrors,
      setMobileErrors,
    });

    const currentGroup =
      localStorage.getItem("groups") &&
      JSON.parse(localStorage.getItem("groups")).find(group => group.id);

    if (!validation) {
      return;
    }

    try {
      const data = {
        name: capitalize(fullNameInput.value),
        email: emailInput.value,
        gender,
        mobile: mobileInput.value,
        params: urlSearchParams,
        section: journeyType,
      };
      const response = await createEnquiry(data);

      if (response.data) {
        const enquiryId = response.data.data.enquiry_id;
        if (!enquiryId) throw Error("Something went wrong");
        history.push({
          pathname: "/input/members",
          search: `enquiryId=${enquiryId}&pincode=${currentGroup?.pincode}&city=${currentGroup?.city}`,
        });
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div {...props}>
      <form onSubmit={handleFormSubmit}>
        <div
          css={`
            padding: 17px;
            @media (max-width: 480px) {
              padding: 10px !important;
            }
          `}
        >
          {tenant.alias === "fyntune" ? (
            <FlexSectionStyled>
              <Title
                dangerouslySetInnerHTML={{
                  __html: posContent.question
                    ? posContent.question
                    : "Tell us about yourself?",
                }}
              ></Title>
              <LinkButton
                onClick={() => {
                  history.push({
                    pathname: "/input/renewal-details",
                  });
                }}
              >
                Renew policy
              </LinkButton>
            </FlexSectionStyled>
          ) : (
            <Title
              dangerouslySetInnerHTML={{
                __html: posContent.question
                  ? posContent.question
                  : "Tell Us about yourself?",
              }}
            ></Title>
          )}
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
            <div
              css={`
                width: 100%;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                align-items: center;
                margin-bottom: 15px;
                margin-top: 13px;
                font-weight: 900;
                gap: 1rem;
                & img {
                  height: 40px;
                }
              `}
            >
              <GenderWrapper
                active={gender === "M"}
                name="male-input"
                color={colors.primary_color}
                onClick={() => setGender("M")}
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
                    color: ${gender === "M" && colors.primary_color};
                    margin: 0 5px;
                  `}
                >
                  Male
                </span>
              </GenderWrapper>
              <GenderWrapper
                name="female-input"
                active={gender === "F"}
                color={colors.primary_color}
                onClick={() => setGender("F")}
              >
                <img
                  src={girl}
                  alt={"girl"}
                  css={`
                    filter: ${gender !== "F" && "grayscale(100%)"};
                    margin: 0 5px;
                  `}
                />
                <span
                  css={`
                    color: ${gender === "F" && colors.primary_color};
                  `}
                >
                  Female
                </span>
              </GenderWrapper>
            </div>
            <div
              className="d-flex align-items-center justify-content-between w-100"
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
              <div
                css={`
                  height: 100%;
                  @media (max-width: 770px) {
                    width: 100%;
                  }
                `}
              >
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

              <div
                css={`
                  height: 100%;
                  @media (max-width: 770px) {
                    width: 100%;
                  }
                `}
              >
                <TextInput2
                  label="Mobile No."
                  name="mobile"
                  type="tel"
                  maxLength={10}
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
                maxLength={50}
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
          disabled={
            createEnquiryQuery.isLoading ||
            isEnquiryOptional("gender", settings)
              ? null
              : !gender
          }
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

const GenderWrapper = styled.label`
  padding: 7px 0;
  border-radius: 4px;
  border: 2px solid;
  border-color: ${props => (props.active ? props.color : "#ddd")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  cursor: pointer;
  gap: 10px;
`;

const LinkButton = styled.button`
  padding: 5px 15px;
  border: 1.5px solid #787878;
  border-radius: 4px;
  color: #787878;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;

  @media (max-width: 420px) {
    padding: 5px 5px;
    font-size: 0.7rem;
    min-width: 90px;
  }
`;

const FlexSectionStyled = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
