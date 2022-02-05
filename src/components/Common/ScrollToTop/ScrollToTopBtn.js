import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "../../../customHooks";
import { FaChevronUp } from "react-icons/fa";

const ScrollToTopBtn = () => {
  const { colors } = useTheme();

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      {scrollPosition > 500 && (
        <ScrollButton primaryColor={colors.primary_color} onClick={handleClick}>
          <FaChevronUp />
        </ScrollButton>
      )}
    </div>
  );
};

export default ScrollToTopBtn;

const ScrollButton = styled.button`
  outline: none;
  border: none;
  position: fixed;
  bottom: 5vh;
  right: 5vw;
  background: ${props => props.primaryColor || "#000"};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  color: #fff;

  @media (max-width: 1200px) {
    display: none;
  }
`;
