import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "./index";
import TextInput from "./TextInput2";
import { mobile } from "../utils/mediaQueries";
import { Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import {
  useFrontendBoot,
  useNameInput,
  useNumberInput,
  useEmailInput,
  useTheme,
} from "../customHooks/index";
import { useGetEnquiriesQuery } from "../api/api";
import { useUrlQueries } from "../customHooks/useUrlQuery";
import validateInput from "../utils/inputPageUtils";
import { shareViaEmailApi } from "./ShareQuoteModal";
import { HeadingPrimary, SecondaryFont } from "../styles/typography";
import { isSSOJourney } from "../utils/helper";

const TalkToUsContent = ({ setSuccess }) => {
  const searchQueries = useUrlQueries();
  const { data } = useFrontendBoot();
  const { data: enquiryData } = useGetEnquiriesQuery(undefined, {
    skip: !searchQueries.enquiryId,
  });
  const {
    data: { settings },
    tenantAlias,
  } = useFrontendBoot();
  let inputData = {
    name: enquiryData.data.name,
    email: enquiryData.data.email,
    mobile: enquiryData.data.mobile,
  };
  const [loader, setLoader] = useState(false);
  const [emailError, setEmailErrors] = useState({});
  const [mobileError, setMobileErrors] = useState({});
  const [fullNameError, setFullNameErrors] = useState({});
  const fullNameInput = useNameInput(inputData?.name || "", setFullNameErrors);
  const mobileInput = useNumberInput(inputData?.mobile || "", setMobileErrors, {
    maxLength: 10,
  });
  const emailInput = useEmailInput(inputData?.email || "", setEmailErrors);

  const onCallHandler = async e => {
    e.preventDefault();
    const validation = validateInput({
      settings,
      fullNameInput,
      emailInput,
      mobileInput,
      setEmailErrors,
      setFullNameErrors,
      setMobileErrors,
    });

    if (validation) {
      setLoader(true);
      const response = await shareViaEmailApi(
        {
          email: emailInput?.value,
          mobile: mobileInput?.value,
          name: fullNameInput?.value,
          mode: ["EMAIL"],
          stage: "TALK_TO_US",
        },
        tenantAlias,
      );
      setLoader(false);
      setSuccess(`${response.statusCode}`.startsWith("2"));
    }
  };

  const isPOS = isSSOJourney();

  const email = isPOS ? data?.settings?.email_pos : data?.settings?.email;

  return (
    <Wrapper>
      <Heading>Need Help?</Heading>
      <Subtitle>
        Submit your details and we&#39;ll reach out supersoon!
      </Subtitle>
      <FormWrapper onSubmit={onCallHandler}>
        <div className="w-100">
          <TextInput
            name="name"
            label="Name"
            placeholder="Name"
            type="text"
            {...fullNameInput}
            style={
              fullNameError?.message
                ? { border: "1px solid red", textTransform: "capitalize" }
                : { textTransform: "capitalize" }
            }
          />
          {fullNameError?.message && (
            <ErrorMessage>{fullNameError.message}</ErrorMessage>
          )}
        </div>

        <div className="w-100">
          <TextInput
            name="mobile"
            label="Phone number"
            placeholder="Phone number"
            type="number"
            minLength={10}
            style={mobileError?.message && { border: "1px solid red" }}
            {...mobileInput}
          />
          {mobileError?.message && (
            <ErrorMessage>{mobileError.message}</ErrorMessage>
          )}
        </div>

        <div className="w-100">
          <TextInput
            name="email"
            label="Email"
            placeholder="Email"
            type="email"
            style={emailError?.message && { border: "1px solid red" }}
            {...emailInput}
          />
          {emailError?.message && (
            <ErrorMessage>{emailError.message}</ErrorMessage>
          )}
        </div>
        <Button
          type="submit"
          css={`
            height: 40px;
            width: 100px;
            margin: 0 auto;
          `}
          loader={loader}
        >
          CALL ME
        </Button>
      </FormWrapper>
      <Divider />
      <div>
        <Subtitle>For Immediate assistance call us at</Subtitle>
        <Heading>{data?.settings?.mobile}</Heading>
      </div>
      <Divider />
      <Title>
        Email us at <a href={`mailto:${email}`}>{email}</a>
      </Title>
    </Wrapper>
  );
};

const Talktouspopup = ({ show, onClose }) => {
  const [success, setSuccess] = useState(false);

  return (
    <Modal
      centered
      show={show}
      onHide={onClose}
      animation={false}
      style={{
        zIndex: "2000",
        borderRadius: "12px",
        border: "none",
        marginBottom: "70px",
        background: "rgba(0,0,0,0.5)",
      }}
      className={`noselect`}
      css={`
        & > .modal-content {
          max-width: 90%;
          width: 90% !important;
          border: none !important;
          overflow: hidden !important;
        }
        @media (min-width: 990px) {
          .modal-dialog {
            max-width: 480px !important;
          }
        }
        @media (min-width: 767px) and (max-width: 990px) {
          .modal-dialog {
            max-width: 480px !important;
          }
        }
        @media (max-width: 767px) {
          .modal {
          }
          .modal-dialog {
            max-width: 100% !important;
            margin: unset;
            overflow-x: hidden;
            overflow-y: auto;
          }
          .modal-dialog > div {
            height: fit-content;
            position: fixed;
            max-width: 90% !important;
            width: 90% !important;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      `}
    >
      {!success ? (
        <>
          <Modal.Header
            // closeButton
            style={{
              borderBottomColor: "#fff",
              padding: `10px 10px 0 0`,
              borderTopLeftRadius: "14px",
              borderToprightRadius: "14px",
              borderBottomRightRadius: "0px",
              position: "relative",
              borderBottomLeftRadius: "0px",
            }}
            css={`
              @media (max-width: 400px) {
                padding: 0.5rem;
              }
            `}
          >
            <button
              onClick={onClose}
              style={{
                margin: "10px 10px 0 auto",
              }}
            >
              <FaTimes />
            </button>
          </Modal.Header>
          <div style={{ padding: "0 1rem 1rem 1rem" }}>
            <TalkToUsContent setSuccess={setSuccess} />
          </div>
        </>
      ) : (
        <Success
          title={"Details recieved"}
          subtitle={`We will get in touch with you supersoon`}
          onClose={() => {
            setSuccess(false);
            onClose();
          }}
        />
      )}
    </Modal>
  );
};

const Divider = () => {
  return (
    <FlexWrapper>
      <Line />
      {"OR"}
      <Line />
    </FlexWrapper>
  );
};

export default Talktouspopup;

function Success({ title, subtitle, onClose }) {
  const { colors } = useTheme();

  return (
    <SuccessWrapper>
      <Banner color={colors.primary_color}>
        <IconWrapper>
          <IoIosCheckmarkCircleOutline
            size={120}
            color={colors.primary_color}
          />
        </IconWrapper>
      </Banner>
      <ContentWrapper>
        <HeadingPrimary>{title}</HeadingPrimary>
        <SecondaryFont
          css={`
            color: #777;
          `}
        >
          {subtitle}
        </SecondaryFont>

        <Button
          css={`
            margin-top: 20px;
            width: 70px;
            border-radius: 7px;
          `}
          onClick={onClose}
        >
          OK
        </Button>
      </ContentWrapper>
    </SuccessWrapper>
  );
}

const Heading = styled.div`
  font-size: 24px;
  color: #666;
  text-transform: uppercase;
  margin-top: 0px !important;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
`;

const Title = styled.p`
  font-size: 14px;
  color: #666;
`;

const Wrapper = styled.div`
  display: grid;
  text-align: center;
  padding: 0 50px;
  & > * {
    margin: 7px 0;
  }

  & > p {
    margin: 0 !important;
  }

  ${mobile} {
    padding: 0 20px;
  }

  .talk-to-us-button {
    margin: 0 !important;
  }
`;

const FormWrapper = styled.form`
  display: grid;
  grid-gap: 10px;
`;

const Line = styled.hr`
  width: 100px;
  background-color: #666;
  height: 1px;
  margin: 10px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`;

const ErrorMessage = styled.p`
  font-size: 12px;
  color: red;
  width: 100%;
  margin: 0;
  text-align: left;
`;

const Banner = styled.div`
  width: 100%;
  height: 40%;
  border-radius: 0.3rem 0.3rem 0 0;
  background: ${props => props.color};
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const IconWrapper = styled.span`
  width: 110px;
  height: 110px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transform: translateY(50%);
`;

const ContentWrapper = styled.div`
  padding-top: 60px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const SuccessWrapper = styled.div`
  height: calc(580px);
`;
