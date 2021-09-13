import React from "react";
import styled from "styled-components";
import { Collapse } from "react-bootstrap";
import pencil from "../../../../assets/images/pencil_pro.png";
import ProposalCheckBox from "../../../../components/Common/ProposalSummary/summaryCheckBox";
const Panel = ({
  title,
  show,
  onClick,
  children,
  formName,
  isFilled,
  values,
}) => {
  return (
    <>
      <StyledPanel
        aria-expanded={show}
        onClick={onClick}
        add={!show ? true : undefined}
        isShowMedical={formName === "Medical Details"}
      >
        <span>
          {title.includes("_") ? title.split("_").slice(1).join(", ") : title}
        </span>
        {formName === "Insured Details" &&
          (show ? (
            <>
              <ChevronWrapper>
                <i class="fas fa-chevron-up"></i>
              </ChevronWrapper>
            </>
          ) : !isFilled ? (
            <>
              <ChevronWrapper>
                <i class="fas fa-chevron-down"></i>
              </ChevronWrapper>
            </>
          ) : (
            <>
              <PencilWrapper>
                <Values>{values}</Values>
                <img src={pencil} alt={"pencil"}></img>
              </PencilWrapper>
            </>
          ))}
        {formName !== "Insured Details" &&
          (show ? (
            <>
              <ChevronWrapper>
                <i class="fas fa-chevron-up"></i>
              </ChevronWrapper>
            </>
          ) : !isFilled ? (
            <>
              <ChevronWrapper>
                <i class="fas fa-chevron-down"></i>
              </ChevronWrapper>
            </>
          ) : (
            <>
              <PencilWrapper isMedical={formName === "Medical Details"}>
                <span>Edit</span> <img src={pencil} alt={"pencil"}></img>
              </PencilWrapper>
            </>
          ))}
      </StyledPanel>
      <Collapse style={{ padding: "22px 0 0", position: "relative" }} in={show}>
        {children}
      </Collapse>
      {(formName !== "Medical Details" || !show) && <HR />}
    </>
  );
};

export default Panel;
const PencilWrapper = styled.div`
  right: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${props => props.isMedical && "100px"};
  background: ${props => (props.isMedical ? "#f6f7f9 !important" : "")};
  height: ${props => (props.isMedical ? "46px" : "")};
  color: ${props => (props.isMedical ? "#666e84" : "")};
  border-radius: ${props => (props.isMedical ? "50px" : "")};
  @media (max-width: 767px) {
    width: ${props => (props.isMedical ? "80px" : "46px")};
  }
  & span {
    position: absolute;
    font-family: pf_handbook_proregular;
    font-weight: 400;
    right: 60px;
    top: 50%;
    transform: translateY(-50%);
    @media (max-width: 767px) {
      right: 48px;
    }
  }
  & img {
    position: ${props => props.isMedical && "absolute"};
    right: ${props => props.isMedical && "0px"};
    top: ${props => props.isMedical && "50%"};
    ${props => props.isMedical && "transform: translateY(-50%)"};
    @media (max-width: 767px) {
      height: ${props => props.isMedical && "46px"};
    }
  }
`;

const Values = styled.div`
  background-image: linear-gradient(to right, #eff1f3 33%, #fff 60%);
  padding: 6px 20px;
  border-radius: 34px;
  width: 280px;
  font-family: pf_handbook_proregular;
  font-size: 16px;

  font-weight: 400;
  color: #000;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 44px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media (max-width: 767px) {
    display: none;
  }
`;
const ChevronWrapper = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(70, 70, 70);
  font-size: 16px;
  & i {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  background: rgb(235, 235, 235);
  border-radius: 50%;
  right: 24px;
`;
const StyledPanel = styled.a`
  display: block;
  margin-top: ${props => props.isShowMedical && !props.add && "8px"};
  padding: ${props =>
    props.isShowMedical
      ? props.add
        ? "20px 10px"
        : "10px 10px"
      : "20px 40px 22px 45px"};
  margin-left: 0px;
  font-size: 22px;
  background-image: ${props =>
    props.isShowMedical &&
    !props.add &&
    "linear-gradient(to right, #ffe7e7 5%, #fff 15%)"};
  color: ${props => (!props.isShowMedical ? "#000 !important" : "")};
  position: relative;
  border: ${props => (!props.isShowMedical ? "1px solid #eeeff5" : "none")};
  width: 100%;
  position: relative;

  box-shadow: ${props =>
    !props.isShowMedical || props.add
      ? "0 3px 10px rgb(211 220 232 / 60%) !important;"
      : ""};

  border-radius: ${props => (!props.isShowMedical ? "19px" : "")};
  font-weight: 900;
  font-family: "pf_handbook_proregular";
  text-transform: capitalize;
  margin-bottom: 22px;
  & span {
    font-size: 22px;
  }
  &:after {
    ${props => props.isShowMedical && "content:''"}
    content: "";
    height: 38px;
    width: 6px;
    position: absolute;
    left: -2px;
    top: 16px;
    background-color: #fecc28;
    border-radius: 50px;
    @media (max-width: 767px) {
      top: 15px;
    }
  }
  @media (max-width: 767px) {
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 20px;
    border-radius: 8px;
    font-size: 16px;
    margin-bottom: 6px;
  }
`;
const HR = styled.hr`
  border-top: 0;
  border-bottom: 1px dashed #ddd;
  width: 100%;
  margin-left: -18px;
  margin-top: 0px;
  @media (max-width: 767px) {
    margin-left: 0px;
    margin-bottom: 12px;
  }
`;
