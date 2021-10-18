import React from "react";
import styled from "styled-components";
import "styled-components/macro";

const PlansTab = ({ isActive, title, description, onClick }) => {
  return (
    <Anchor
      onClick={onClick}
      className={`nav-link  p-3  ${isActive && "active"}`}
   
    >
      <span className={`${isActive && "active"}`}>{title}</span>
      <p className={`${isActive && "active"}`}>{description}</p>
    </Anchor>
  );
};

export default PlansTab;

const Anchor = styled.a`
border-bottom: 1px solid #eee !important;
  & span {
    font-size: 20px;
    color: #253858;
    font-weight: 900;
    &.active {
      color: #0d6efd;
    }
  }
  & p {
    margin-top: 3px;
    color: #505f79;
  }
  height: 112px;
  &.active {
    color: unset !important;
    background-color: unset !important;
    position: relative;
    border: 1px solid #eee !important;
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15) !important;
    
    // &:after {
    //   content: "";
    //   height: 100%;
    //   width: 5px;
    //   position: absolute;
    //   left: 0px;
    //   top: 0px;
    //   background-color: rgb(254, 204, 40);
    // }
  }
`;
