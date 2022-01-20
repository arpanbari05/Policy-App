import React, { useState } from "react";
import styled from "styled-components";

const ScrollToTopBtn = () => {
  const [showScroll, setShowScroll] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 200) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 200) {
      setShowScroll(false);
    }
  };
  window.addEventListener("scroll", checkScrollTop);

  return (
    <Button
      onClick={scrollTop}
      style={{ display: showScroll ? "block" : "none" }}
    >
      <i className="fa fa-angle-up" aria-hidden="true"></i>
    </Button>
  );
};

export default ScrollToTopBtn;

const Button = styled.button`
  width: 25px;
  height: 25px;
  position: fixed;
  bottom: 10px;
  right: 5px;
  z-index: 112;
  text-align: center;
  color: #fff;
  font-size: 18px;
  background: #c72229;
  cursor: pointer;
  border-radius: 3px;
  &:after {
    position: absolute;
    z-index: -1;
    content: "";
    top: 100%;
    left: 5%;
    height: 10px;
    width: 90%;
    opacity: 1;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(0, 0, 0, 0) 80%
    );
  }
`;
