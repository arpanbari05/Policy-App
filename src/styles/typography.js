import styled from "styled-components";

const Regular = styled.div`
  font-weight: 400;
  color: ${props => props.color || "inherit"};
  text-align: ${props => (props.textCenter ? "center" : "left")};
  ${props => props.css}
`;

const Bold = styled.div`
  font-weight: bold;
  color: ${props => props.color || "inherit"};
  text-align: ${props => (props.textCenter ? "center" : "left")};
  ${props => props.css}
`;

const HeadingPrimary = styled(Bold)`
  font-size: 23px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
const HeadingSecondary = styled(Bold)`
  font-size: 18px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
const HeadingTertiary = styled(Bold)`
  font-size: 16px;
`;
const Subtitle = styled(Regular)`
  font-size: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const PrimaryFont = styled(Regular)`
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
const PrimaryFontBold = styled(Bold)`
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;
const SecondaryFont = styled(Regular)`
  font-size: 13px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const SecondaryFontBold = styled(Bold)`
  font-size: 13px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const TertiaryFont = styled(Regular)`
  font-size: 12px;
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;
const TertiaryFontBold = styled(Bold)`
  font-size: 12px;
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;
const XSmallFont = styled(Regular)`
  font-size: 11px;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;
const XSmallFontBold = styled(Bold)`
  font-size: 11px;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export {
  HeadingPrimary,
  HeadingSecondary,
  HeadingTertiary,
  Subtitle,
  PrimaryFont,
  PrimaryFontBold,
  SecondaryFont,
  SecondaryFontBold,
  TertiaryFont,
  TertiaryFontBold,
  XSmallFont,
  XSmallFontBold,
};
