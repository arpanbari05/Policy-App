import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";
import { mobile } from "../../../../utils/mediaQueries";
import { setCurrentSection } from "../../productDetails.slice";

function FeatureSection({ heading, subHeading, children, id, ...props }) {
  const dispatch = useDispatch();
  const featureSectionRef = useRef(null);
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
      <FeatureSection.Header heading={heading} subHeading={subHeading} />
      {children}
    </FeatureSectionContainer>
  );
}

FeatureSection.Header = ({ heading, subHeading }) => {
  return (
    <FeatureSectionHeader>
      {heading && <FeatureSectionHeading>{heading}</FeatureSectionHeading>}
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
  }
`;

const FeatureSectionHeading = styled("p")`
  font-size: 23px;
   margin-bottom: 8px; 
   color: #253858;
  font-weight: 900;

  position: relative;
  /* @media (max-width: 767px) {
    display: none;
  } */

  &::before {
    content: "";
    height: 39px;
    width: 9px;
    top: -7px;
    left: -20px;
    position: absolute;
    /* background-color: #de9b9e; */
    background-color: var(--yellow-one);
    border-radius: 0 15px 15px 0;
  }
  margin-left: 20px;

  ${mobile} {
    font-size: 17px;

    &::before {
      top: 0;
    }
  }
`;
const FeatureSectionSubHeading = styled("p")`
  /* color: #929296; */
  color: #76797e;
  font-size: 14px;
  margin-left: 20px;
  color: #253858;
  ${mobile} {
    line-height: normal;
  }

  ${mobile} {
    font-size: 10px;
    color: #7b7b7f;
  }
`;

const FeatureSectionContainer = styled("section")`
  display: block;
`;

export default FeatureSection;
