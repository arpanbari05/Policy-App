import React from "react";
import styled from "styled-components";
import "styled-components/macro";
import { Collapse } from "react-bootstrap";
import { useSelector } from "react-redux";
import pencil from "../../../../assets/images/pencil_pro.png";
import ProposalCheckBox from "../../../../components/Common/ProposalSummary/summaryCheckBox";
import { useTheme } from "../../../../customHooks";
import { FaChevronUp, FaPen } from "react-icons/fa";
const Panel = ({
  title,
  show,
  onClick,
  children,
  formName,
  isFilled,
  values,
  allMembers,
}) => {
  const { colors } = useTheme();

  const PrimaryColor = colors.primary_color,
    SecondaryColor = colors.secondary_color,
    PrimaryShade = colors.primary_shade;

  let EditedName = "";

  if (formName === "Insured Details" && title.includes("_")) {
    EditedName = title.replace(/_/g, " ");
  } else if (formName !== "Insured Details" && title.includes("_")) {
    EditedName = allMembers.map(member => member.code).filter(member => title.includes(member)).join(", ").replaceAll("_"," ");
  } else {
    EditedName = title;
  }

  return (
    <>
      <StyledPanel
        aria-expanded={show}
        onClick={onClick}
        add={!show ? true : undefined}
        PrimaryColor={PrimaryColor}
        SecondaryColor={SecondaryColor}
        PrimaryShade={`linear-gradient(90deg, ${PrimaryShade} 0%, white 100%)`}
        isShowMedical={formName === "Medical Details"}
      >
        <span>{EditedName}</span>
        {formName === "Insured Details" &&
          (show ? (
            <>
              <ChevronWrapper>
                <FaChevronUp />
              </ChevronWrapper>
            </>
          ) : !isFilled ? (
            <>
              <PencilWrapper>
                {/*<Values>{values}</Values>*/}
                <div
                  css={`
                    width: 30px;

                    height: 30px;
                    background: #eff7ff !important;
                    border-radius: 100%;
                    display: flex;
                    color: #369cff;
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                  `}
                  className="btn p-0"
                >
                  <FaPen />
                </div>
              </PencilWrapper>
            </>
          ) : (
            <>
              <PencilWrapper>
                <Values>{values}</Values>
                <div
                  css={`
                    width: 30px;

                    height: 30px;
                    background: #eff7ff !important;
                    border-radius: 100%;
                    display: flex;
                    color: #369cff;
                    align-items: center;
                    justify-content: center;
                    font-size: 13px;
                  `}
                  className="btn p-0"
                >
                  <FaPen />
                </div>
              </PencilWrapper>
            </>
          ))}
        {formName !== "Insured Details" &&
          (show ? (
            <>
              <ChevronWrapper>
                <FaChevronUp />
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
              {/* <PencilWrapper isMedical={formName === "Medical Details"}>
                <span>Edit</span> <img src={pencil} alt={"pencil"}></img>
              </PencilWrapper> */}
              <div
                css={`
                  width: 30px;

                  height: 30px;
                  background: #eff7ff !important;
                  border-radius: 100%;
                  display: flex;
                  color: #369cff;
                  align-items: center;
                  justify-content: center;
                  font-size: 13px;
                `}
                className="btn p-0"
              >
                <FaPen />
              </div>
            </>
          ))}
      </StyledPanel>
      <Collapse
        style={{
          padding: "22px 0 0",
          position: "relative",
        }}
        in={show}
      >
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
  width: ${props => props.isMedical && "116px"};
  background: ${props => (props.isMedical ? "#0a87ff !important" : "")};
  height: ${props => (props.isMedical ? "46px" : "")};
  color: ${props => (props.isMedical ? "white" : "")};
  border-radius: ${props => (props.isMedical ? "50px" : "")};
  @media (max-width: 767px) {
    width: ${props => (props.isMedical ? "80px" : "46px")};
  }
  & span {
    position: absolute;
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
  background-image: linear-gradient(to right, #eff7ff 33%, #fff 60%);
  padding: 6px 20px;
  border-radius: 34px;
  width: 280px;
  font-weight: 900;
  font-size: 16px;
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
  & svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  background: #eff7ff;
  border-radius: 50%;
  right: 24px;
`;
const StyledPanel = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.isShowMedical && !props.add && "8px"};
  padding: ${props =>
    props.isShowMedical
      ? props.add
        ? "20px 10px"
        : "10px 10px"
      : "20px 40px 22px 45px"};
  margin-left: 15px;
  margin-right: 15px;
  font-size: 22px;
  background-image: ${props =>
    props.isShowMedical && !props.add && props.PrimaryShade};

  color: ${props => props.PrimaryColor} !important;
  position: relative;
  border: ${props => (!props.isShowMedical ? "1px solid #eeeff5" : "none")};
  width: 98%;
  position: relative;

  box-shadow: ${props =>
    !props.isShowMedical || props.add
      ? "0 3px 10px rgb(211 220 232 / 60%) !important;"
      : ""};
  font-weight: 900;

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
    background-color: ${props => props.SecondaryColor};
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

  margin-top: 0px;
  @media (max-width: 767px) {
    margin-left: 0px;
    margin-bottom: 12px;
  }
`;
