import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import Aos from "aos";
import logo from "../../../../assets/images/adityaBirlaLogo.png";
import "aos/dist/aos.css";

const BottomFooter = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      mirror: true,
    });
    Aos.refresh();
  }, []);

  return (
    <>
      <StyledUpperFooter>
        <Container>
          <h5>Aditya Birla Insurance Broker Limited</h5>
          <small style={{ textTransform: "capitalize" }}>
            Registered office: indian rayon compound, veraval, gujarat 362266.
            IRDAI license number: 146. composite broker.
            license valid till: 9th april 2024.
            CIN: U99999GJ2001PLC062239.
            corporate office: one world centre, tower-1, 7th floor, jupiter mill
            compound, 841, senapati bapat marg, elphinstone road, mumbai 400
            013.
            tel no.: +91 22 43568585.
          </small>
          <br/>
          <small>
            In case of any queries/complaints/grievances, please write to us at <a href="mailto:clientfeedback.abibl@adityabirlacapital.com" target="_blank">clientfeedback.abibl@adityabirlacapital.com</a>. ISO 9001 Quality Management certified by BSI under certificate number FS 611893. Aditya Birla Insurance Brokers Limited, Aditya Birla Health Insurance Co. Limited and Aditya Birla Sun Life Insurance Company Limited are part of the same promoter group. Insurance is a subject matter of solicitation. 
          </small>
        </Container>
      </StyledUpperFooter>

      <StyledBottomFooter>
        <Container>
          <img
            src={logo}
            width="150px"
            alt="logo"
            style={{ display: "inline" }}
          />
          <br />
          <small>© 2021, Aditya Birla Capital Inc. All Right Reserved</small>
        </Container>
      </StyledBottomFooter>
    </>
  );
};

export default BottomFooter;

const StyledUpperFooter = styled.div`
  background: #201e19;
  padding: 10px 0;
  h5,
  small {
    color: #a1a2a2;
    padding: 10px 0;
  }
  a{
    color:#6C7F85;
    &:hover{
      text-decoration:underline !important;
    }
  }
`;

const StyledBottomFooter = styled.div`
  padding: 30px 0;
  background: #6c7174;
  small {
    color: white;
  }
`;
