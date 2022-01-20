import React, { useEffect } from "react";
import styled from "styled-components";
import BottomFooter from "./BottomFooter/BottomFooter";
import Aos from "aos";
import "aos/dist/aos.css";
import "./Footer.scss";
import TopFooter from "./TopFooter/TopFooter";
import shape67 from "../../../assets/svg/shape67.svg";

const Footer = ({ displayFooter }) => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      mirror: true,
    });
    Aos.refresh();
  }, []);

  return (
    <StyledFooter style={{ display: displayFooter ? "block" : "none" }}>
      <BottomFooter />
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  position: relative;
  background: #201e19;
  border-top: 1px solid #ededed;
  /* padding-top: 95px; */
`;
