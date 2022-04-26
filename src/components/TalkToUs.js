import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./index";
import TextInput from "./TextInput2";
import { mobile } from "../utils/mediaQueries";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import {
  useFrontendBoot,
  useNameInput,
  useNumberInput,
  useEmailInput,
} from "../customHooks/index";
import { useGetEnquiriesQuery } from "../api/api";
import { useUrlQueries } from "../customHooks/useUrlQuery";
import validateInput from "../utils/inputPageUtils";
import { shareViaEmailApi } from "./ShareQuoteModal";

const TalkToUsContent = () => {
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
  const [success, setSuccess] = useState(false);
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

  return (
    <Wrapper>
      <Heading>Need Help?</Heading>
      <Subtitle>Submit your details and we'll reach out supersoon!</Subtitle>
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
        Email us at <a href={"#link"}>{data?.settings?.email}</a>
      </Title>
    </Wrapper>
  );
};

const Talktouspopup = ({ show, onClose }) => {
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
        & .modal-content {
          max-width: 90%;
          width: 90% !important;
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
        <TalkToUsContent />
      </div>
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
