import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";
import { useTheme } from "../../../../customHooks";
import { mobile } from "../../../../utils/mediaQueries";
import { setCurrentSection } from "../../productDetails.slice";

function FeatureSection({ heading, subHeading, children, id, ...props }) {
  const dispatch = useDispatch();
  const featureSectionRef = useRef(null);
  const { colors } = useTheme();
  useEffect(() => {
    const checkIsInViewport = () => {
      if (featureSectionRef.current) {
        const rect = featureSectionRef.current.getBoundingClientRect();
        if (
          rect.bottom >= 90 &&
          rect.bottom <= featureSectionRef.current.offsetHeight + 110
        ) {
          dispatch(setCurrentSection(id));
        }
      }
    };
    window.addEventListener("scroll", checkIsInViewport);
    return () => window.removeEventListener("scroll", checkIsInViewport);
  }, [dispatch, id]);
  return (
    <FeatureSectionContainer ref={featureSectionRef} id={id} {...props}>
      <FeatureSection.Header
        secondary_color={colors.secondary_color}
        heading={heading}
        subHeading={subHeading}
      />
      {children}
    </FeatureSectionContainer>
  );
}

FeatureSection.Header = ({ heading, subHeading, secondary_color }) => {
  return (
    <FeatureSectionHeader>
      {heading && (
        <FeatureSectionHeading secondary_color={secondary_color}>
          {heading}
        </FeatureSectionHeading>
      )}
      {subHeading && (
        <FeatureSectionSubHeading>{subHeading}</FeatureSectionSubHeading>
      )}
    </FeatureSectionHeader>
  );
};

const FeatureSectionHeader = styled("header")`
  margin-bottom: 20px;
  /* @media (max-width: 767px) {
    display: none;
  } */
  ${mobile} {
    margin-bottom: 0px;
  }
`;

const FeatureSectionHeading = styled("p")`
  font-size: 23px;
  margin-bottom: 8px;
  color: #253858;
  font-weight: 900;
  display: flex;
  /* margin-left:20px !important; */
  align-items: center;
  position: relative;
  /* @media (max-width: 767px) {
    display: none;
  } */
  @media (max-width: 768px) {
    &::before {
      content: "";
      height: 35px;
      width: 5px;
      top: -7px;
      margin-right: 10px;
      position: relative;

      background-color: ${({ secondary_color }) => secondary_color};
      border-radius: 0 15px 15px 0;
    }
  }
  margin-left: 2px;

  ${mobile} {
    font-size: 17px;
    margin-bottom: 5px;
    &::before {
      top: 0;
    }
  }
`;
const FeatureSectionSubHeading = styled("p")`
  /* color: #929296; */
  color: #76797e;
  font-size: 14px;
  margin-left: 2px !important;
  color: #253858;
  ${mobile} {
    line-height: normal;
  }

  ${mobile} {
    font-size: 10px;
    color: #7b7b7f;
    margin-bottom: unset !important;
  }
`;

const FeatureSectionContainer = styled("section")`
  display: block;
`;

export default FeatureSection;
