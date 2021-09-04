import React from "react";
import { useSelector } from "react-redux";
import proposer from "../../../assets/images/proposal.png";
import insured from "../../../assets/images/insured.png";
import medical from "../../../assets/images/medical.png";
import others from "../../../assets/images/others.png";

import styled from "styled-components";

const iconIndex = {
  "Proposer Details": proposer,
  "Insured Details": insured,
  "Medical Details": medical,
  "Other Details": others,
};
const FormGrid = ({ listOfForms = [], active = 0, setActive = () => { } }) => {
  const { proposalData } = useSelector(state => state.proposalPage);
  return (
    <UnorderedList>
      {listOfForms.map((item, index) => (
        <ListItem
          key={index}
          active={index === active}
          length={listOfForms.length}
        >
          <ListButton
            active={index === active}
            onClick={() => {
              if (
                proposalData[listOfForms[index - 1]] ||
                proposalData[listOfForms[index]]
              )
                setActive(index);
            }}
          >
            {" "}
            <IconWrapper>
              <img src={iconIndex[item]} alt={item} />
            </IconWrapper>
            {item}
          </ListButton>
        </ListItem>
      ))}
    </UnorderedList>
  );
};

export default FormGrid;

const UnorderedList = styled.ul`
  overflow-x: auto;
  white-space: nowrap;
  width: 76% !important;
  border-bottom: 1px solid #fff !important;
  overflow-y: hidden;
  background: #fff !important;
  box-shadow: #e2e3ed 0px 6px 12px !important;
  padding: 0px 0px 0px 0px !important;
  border-radius: 12px !important;
  margin: 0 0px 12px !important;
  border: none !important;
  display: inline-flex;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media (min-width:768px) and ( max-width:1200px){
    width: 100% !important;}
  @media (max-width: 767px) {
    padding: 0 16px !important;
    width: 100% !important;
    border-radius: 0 !important;
  }
`;
const IconWrapper = styled.span`
  display: inline-block;
  position: relative;
  & img {
    position: absolute;
    top: 50%;
    margin-top:10px;
    transform: translateY(-50%);
    width: 30px;
    height: 30px;
    @media (max-width: 767px) {
      top: 10px;
      transform: translateY(0px);
      display: none;
      height: 18px;
      width: 18px;
    }
  }
  margin-right: 10px;
  width: 30px;
  height: 30px;
  @media (max-width: 767px) {
    display: block;
    margin: 0 auto -10px;
    height: 18px;
    width: 18px;
  }
`;
const ListItem = styled.li`
  float: left;

  width: ${props => 100 / props.length}%;
  ${props => props.active && "background: none; z-index: 1;border-radius: 0px;"}
  min-width: 25%;
  display: inline-block;
  position: relative;
  margin: 0;
  padding: 0 25px !important;
  border: 0;
  &:first-child {
    padding-left: 0 !important;
  }
  &:last-child {
    padding-right: 0 !important;
  }
  text-decoration: none;
  list-style: none;
  list-style-type: none;
  @media (max-width: 767px) {
    padding: 0 !important;
    margin-right: 2px;
  }
`;
const ListButton = styled.button`
  font-size: 17px;
  color: ${props => (props.active ? "#c7222a" : "#777")};
  background-image: ${props =>
    props.active && "linear-gradient(to top, #ffe7e7 , #fff)"};
  font-weight: ${props => (props.active ? "900" : "400")};
  width: 100%;
  height: 78px;
  line-height: 80px;

  position: relative;
  /* text-align: left;*/
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    padding-right: 0;
  }

  &:before {
    content: "";
    height: 5px;
    right: 0px;
    
    bottom: -17px;
    opacity: ${props => (props.active ? "1" : "0")};
    transform: ${props => (props.active ? "scale(1)" : "scale(0,1)")};
    background: #c72229;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    top: 73px;
    width: 100%;
    text-align: left;
    position: absolute;
    transition: all 0.3s;
    @media (max-width: 767px) {
      width: 83%;
      left: 50%;
      transform: translateX(-50%);
      top: 43px;
    }
  }

  @media (max-width: 767px) {
    font-size: 13px;
 
    line-height:16px;
    height: 48px;
  }
`;
