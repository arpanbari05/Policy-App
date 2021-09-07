import React from "react";
import styled from "styled-components/macro";

const PlansTab = ({ isActive, title, description, onClick }) => {
  return (
    <Anchor
      onClick={onClick}
      className={`nav-link mb-3 p-3 shadow ${isActive && "active"}`}
    >
      <span className={`${isActive && "active"}`}>{title}</span>
      <p className={`${isActive && "active"}`}>{description}</p>
    </Anchor>
  );
};

export default PlansTab;

const Anchor = styled.a`
  border: solid 1px #dde5ea;
  & span {
    font-size: 22px;
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
    &:after {
      content: "";
      height: 100%;
      width: 5px;
      position: absolute;
      left: 0px;
      top: 0px;
      background-color: rgb(254, 204, 40);
    }
  }
`;
