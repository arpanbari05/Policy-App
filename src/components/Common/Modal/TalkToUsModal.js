import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextInput from "../../../components/TextInput2";
import { getProposerData } from "../../../pages/InputPage/ServiceApi/serviceApi";
import { mobile } from "../../../utils/mediaQueries";
import { useTheme } from "../../../customHooks/index";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import * as mq from "../../../utils/mediaQueries";


const tollFreeNumber = "1800 010 000";

const TalkToUsContent = () => {
  const { primary_color } = useTheme().colors;
  const [proposerData, setProposerData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const fetch = async () => {
      const data = await getProposerData();
      console.log(data);
      setProposerData({
        name: data.data.data.name,
        email: data.data.data.email,
        mobile: data.data.data.mobile,
      });
    };
    fetch();
  }, []);

  const onCallHandler = (data) => {
    console.log("clicked");
    console.log(data);
  };

  return (
    <Wrapper>
      <Heading>Need Help?</Heading>
      <Subtitle>
        Submit your details and we'll reach out supersoon!
      </Subtitle>
      <FormWrapper onSubmit={handleSubmit(onCallHandler)}>
        <TextInput
          name="name"
          value={proposerData.name}
          label="Name"
          placeholder="Name"
          type="text"
          onChange={(e) => setProposerData({...proposerData, name: e.target.value})}
          ref={() => register("name", { required: true })}
        />
        <TextInput
          name="mobile"
          label="Phone number"
          placeholder="Phone number"
          type="number"
          minLength={10}
          value={proposerData.mobile}
          onChange={(e) => setProposerData({...proposerData, mobile: e.target.value})}
          ref={() => register("mobile", { minLength: 10 })}
        />
        <TextInput
          name="email"
          value={proposerData.email}
          label="Email"
          placeholder="Email"
          type="email"
          onChange={(e) => setProposerData({...proposerData, email: e.target.value})}
          ref={() => register("email", { required: true })}
        />
        <ButtonWrapper>
          <Button color={primary_color}>
            call me
          </Button>
        </ButtonWrapper>
      </FormWrapper>
      <Divider />
      <div>
        <Subtitle>
        For Immediate assistance call us at
        </Subtitle>
        <Heading>{tollFreeNumber}</Heading>
      </div>
      <Divider />
      <Title>
        Email us at <a href={"#link"}>fyntune@gmail.com</a>
      </Title>
    </Wrapper>
  );
};

const Talktouspopup = ({ show, handleClose, ...props }) => {
  return (
    <Modal
      onHide={handleClose}
      show={show}
      animation={false}
      css={`
        .modal-dialog {
          max-width: 400px !important;
          @media (min-width: 576px) {
            max-width: 400px !important;
          }
        }
      `}
      {...props}
    >
      <Modal.Header
        className="w-100"
        style={{
          borderBottomColor: "#fff",
          padding: `1rem 1rem 0 0`,
        }}
      >
        <button onClick={handleClose} style={{marginLeft: "auto"}}>
          <FaTimes />
        </button>
      </Modal.Header>
      <Modal.Body
        className="p-0"
        css={`
          ${mq.mobile} {
            margin-top: 3.91em;
          }
        `}
      >
        <TalkToUsContent />
      </Modal.Body>
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

const Button = styled.div`
  font-size: 1em;
  background-color: ${props => props.color};
  padding: .7em 1.5em;
  text-transform: uppercase;
  color: #fff;
  border-radius: 4px;
  font-weight: 900;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.2));
  }
`
const Heading = styled.div`
  font-size: 20px;
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
  padding: 0 3rem 1.5rem 3rem;
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

const ButtonWrapper = styled.div`
  margin: 0 auto !important;
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
