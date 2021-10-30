import React from "react";
import useWindowSize from "../../../../customHooks/useWindowSize";
import styled from "styled-components";
import {useSelector} from 'react-redux'
const SeeDetailsTabContainer = ({
  title,
  id,
  onClick,
  activeFieldset,
  image,
}) => {
  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade,SecondaryShade } = theme;

  const handleClick = (id) => {
    onClick(id);
  };
  const [windowHeight, windowWidth] = useWindowSize();
  return (
    <SeeDetailsTabContainerStyle PrimaryColor={PrimaryColor}>
      <li className={`z-tab z-first ${activeFieldset === id && "z-active"} `}>
        <a
          className="z-link see-details__z-link"
          style={{ paddingRight: "0px" }}
          onClick={() => handleClick(id)}
        >
          <span> {title}</span>
        </a>
      </li>
    </SeeDetailsTabContainerStyle>
  );
};

export default SeeDetailsTabContainer;

const SeeDetailsTabContainerStyle = styled.div`
  & li {
    list-style-type: none;
    & a {
      color: black;
    }
  }
  & li.z-active a {
    color: ${props=>props.PrimaryColor} !important;
    font-size: 17px;
    font-weight: 900;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      transition: all 0.3s ease-in-out;
      width: 100%;
      height: 5px;
      top: 44px;
      left: 0;
      right: 0;
      margin: auto;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      background: ${props=>props.PrimaryColor} ;
    }
  }
  margin: auto auto;
  img {
    margin-right: 10px;
    padding-left: 8px;
  }
  @media (max-width: 1114px) {
    img {
      width: 40px;
      margin-top: 14px !important;
    }
    a span {
      font-size: 15px;
    }
  }
`;
