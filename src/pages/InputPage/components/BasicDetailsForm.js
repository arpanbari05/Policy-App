import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import { boy, girl } from "../../../assets/images";
import { Button } from "../../../components";
import CustomProgressBar from "../../../components/ProgressBar";
import TextInput2 from "../../../components/TextInput2";
import {
  useCreateEnquiry,
  useNameInput,
  useNumberInput,
  useEmailInput,
  useTheme,
  useFrontendBoot,
  useUpdateEnquiry,
} from "../../../customHooks";
import { useUrlQueries } from "../../../customHooks/useUrlQuery";
import {
  allowOnWebsites,
  capitalize,
  inputEnquiryVisibility,
} from "../../../utils/helper";
import validateInput, {
  isEnquiryOptional,
} from "../../../utils/inputPageUtils";
import * as mq from "../../../utils/mediaQueries";
import { Title, ErrorMessage } from "./FormComponents";
import "styled-components/macro";
import toast from "react-hot-toast";

const BasicDetailsForm = ({ posContent, ...props }) => {
  const location = window.location;
  let inputData = {
    gender: "M",
  };

  const urlQueryStrings = new URLSearchParams(window.location.search);
  const EnquiryId = urlQueryStrings.get("enquiryId");

  const { colors } = useTheme();
  const urlSearchParams = useUrlQueries();
  const [createEnquiry, createEnquiryQuery] = useCreateEnquiry();
  const { updateEnquiry, ...updateEnquiryQuery } = useUpdateEnquiry();

  const history = useHistory();
  const {
    data: { tenant, settings },
    subJourneyType,
  } = useFrontendBoot(!EnquiryId);

  // previous error
  if (sessionStorage["invalidEnquiry"]) {
    toast.error("Opps! invalid enquiryId passed.", {
      style: {
        borderRadius: "5px",
        background: "#333",
        color: "#fff",
      },
    });
    sessionStorage.removeItem("invalidEnquiry");
  }

  //===== page states======
  const [emailError, setEmailErrors] = useState({});
  const [mobileError, setMobileErrors] = useState({});
  const [fullNameError, setFullNameErrors] = useState({});
  const fullNameInput = useNameInput(inputData?.name || "", setFullNameErrors);
  const mobileInput = useNumberInput(inputData?.mobile || "", setMobileErrors, {
    maxLength: 10,
  });
  const emailInput = useEmailInput(inputData?.email || "", setEmailErrors);
  const [gender, setGender] = useState(inputData?.gender || "");
  const [journeyType, setJourneyType] = useState(
    location.host === tenant.topup_frontend_domain ? "top_up" : "health",
  );

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
      JSON.parse(localStorage.getItem("groups")).find(group => group?.id);

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
      let response;
      if (subJourneyType === "port" || EnquiryId) {
        response = await updateEnquiry(data);
      } else {
        response = await createEnquiry(data);
      }

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

  return location.host !== tenant?.health_renewal_frontend_domain ? (
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
          {process.env.NODE_ENV === "development" ||
          allowOnWebsites(["topup", "healthUat", "renewBuyUat"]) ? (
            <FlexSectionStyled>
              <Title
                dangerouslySetInnerHTML={{
                  __html: posContent.question
                    ? posContent.question
                    : "Tell us about yourself? ",
                }}
              ></Title>
              {process.env.NODE_ENV === "development" && (
                <LinkButton
                  type="button"
                  onClick={() => {
                    history.push({
                      pathname: "/input/renewal-details",
                    });
                  }}
                >
                  Renew policy
                </LinkButton>
              )}
              <LinkButton
                type="button"
                onClick={() => {
                  history.push({
                    pathname: "/input/portability",
                  });
                }}
              >
                Port
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
            {inputEnquiryVisibility(settings, "gender") && (
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
            )}
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
              {inputEnquiryVisibility(settings, "name") && (
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
                    {...fullNameInput}
                    maxLength={60}
                  />
                  <ErrorMessage>{fullNameError.message}</ErrorMessage>
                </div>
              )}

              {inputEnquiryVisibility(settings, "mobile") && (
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
              )}
            </div>
            {inputEnquiryVisibility(settings, "email") && (
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
            )}
          </div>
          {process.env.NODE_ENV === "development" ? (
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
          loader={createEnquiryQuery.isLoading || updateEnquiryQuery.isLoading}
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
  ) : (
    <Redirect to="/input/renewal-details" />
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
