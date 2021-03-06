import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "styled-components/macro";
import mail from "./../../../assets/svg/mailpolicy.svg";
import paper from "./../../../assets/svg/paperplicy.svg";
import repolicy from "./../../../assets/svg/repolicy.svg";
import { useFrontendBoot, useTheme } from "../../../customHooks";
import { FiDownload } from "react-icons/fi";

const Card = ({ values, isLoading, showTrackStatus }) => {
  const {
    colors: { primary_color: PrimaryColor, secondary_shade: SecondaryShade },
  } = useTheme();
  const [downloadPolicyLoader, setDownloadPolicyLoader] = useState(true);

  const frontendBoot = useFrontendBoot();

  const frontendData = { data: frontendBoot.data };

  useEffect(() => {
    if (values?.pdf_path) {
      setDownloadPolicyLoader(false);
    } else if (!values?.underwriting_status) {
      setTimeout(() => {
        setDownloadPolicyLoader(false);
      }, 50000);
    } else {
      setDownloadPolicyLoader(false);
    }
  }, [values]);

  return values?.product ? (
    <CardWrapper>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <LogoWrapper>
            <img
              src={
                values?.product?.company.alias &&
                frontendData.data.companies[values?.product?.company.alias].logo
              }
              alt="logo"
              css={`
                width: 50px;
              `}
            ></img>
          </LogoWrapper>

          <CompanyName reducePadding>{values?.product?.name}</CompanyName>
        </div>

        <div style={{ float: "right" }}>
          {values?.pdf_path ? (
            values?.pdf_path &&
            (!downloadPolicyLoader ? (
              <DownloadPolicy
                target="_blank"
                href={values?.pdf_path}
                download
                PrimaryColor={PrimaryColor}
              >
                Download Policy{" "}
                {isLoading || !values?.pdf_path ? (
                  <span className="thankyou lds-dual-ring"></span>
                ) : (
                  <FiDownload size={18} />
                )}
              </DownloadPolicy>
            ) : (
              <div
                css={`
                  display: inline-block;
                  border-radius: 999px;
                  padding: 5px 10px;
                  min-width: 160px;
                  color: #fff !important;
                  height: 35px;
                `}
                className="skeleton-loader"
              ></div>
            ))
          ) : (
            <>
              {showTrackStatus && (
                <DownloadPolicy
                  track
                  target="_blank"
                  href={"http://fynixnew.benefitz.in/customer/login"}
                  PrimaryColor={PrimaryColor}
                >
                  Track Status <img src={paper} alt="track"></img>
                </DownloadPolicy>
              )}
            </>
          )}
        </div>
      </div>

      <Wrap>
        {values?.policy_no ? (
          <PolicyWrapper>
            <Title>Your Policy No.</Title>
            <Value break={true} center={!values?.policy_no}>
              {values?.policy_no || "-"}
            </Value>
          </PolicyWrapper>
        ) : values?.proposal_no ? (
          <PolicyWrapper>
            <Title>Application No</Title>
            <Value break={true} center={!values?.policy_no}>
              {values?.proposal_no || "-"}
            </Value>
          </PolicyWrapper>
        ) : (
          <PolicyWrapper>
            <Title>Application No</Title>
            <Value break={true} center={!values?.policy_no}>
              {values?.proposal_reference_id || "-"}
            </Value>
          </PolicyWrapper>
        )}

        <PolicyWrapper>
          <Title>Members</Title>
          <Value>{values?.members && values?.members.join(", ")}</Value>
        </PolicyWrapper>
        <PolicyWrapper>
          <Title>Status</Title>
          <Value>{values?.status && values?.status.split("_").join(" ")}</Value>
        </PolicyWrapper>
      </Wrap>
      {values?.underwriting_status === "underwriting_approval" && (
        <StatusWrapper>
          <DocImage>
            <img
              src={repolicy}
              alt="repolicy"
              css={`
                width: 36px;
              `}
            ></img>
          </DocImage>
          <DocMessage>
            Your proposal is currently pending for medical underwriting. You
            will receive a call shortly from us on further process.
          </DocMessage>
        </StatusWrapper>
      )}
      {values?.underwriting_status === "underwriting_approved" && (
        <StatusWrapper>
          <DocImage>
            <img
              src={mail}
              alt="repolicy"
              css={`
                width: 36px;
              `}
            ></img>
          </DocImage>
          <DocMessage>
            You will receive the Policy in your inbox once generated. In case
            it&lsquo;s under medical underwriting it might take longer.{" "}
          </DocMessage>
        </StatusWrapper>
      )}
      {!values?.pdf_path && !values?.underwriting_status && (
        <StatusWrapper SecondaryShade={SecondaryShade}>
          <DocImage>
            <img
              css={`
                width: 36px;
              `}
              src={mail}
              alt="mail"
            ></img>
          </DocImage>
          <DocMessage>
            You will receive the Policy in your inbox once generated. In case
            it&lsquo;s under medical underwriting it might take longer.{" "}
          </DocMessage>
        </StatusWrapper>
      )}
    </CardWrapper>
  ) : (
    <CardWrapper
      css={`
        padding: 29px 10px 20px 25px; !important;
      `}
    >
      <div className="lightui1-shimmer">
        <div className="_2iwr"></div>
        <div className="_2iws"></div>
        <div className="_2iwt"></div>
        <div className="_2iwu"></div>
        <div className="_2iwv"></div>
        <div className="_2iww"></div>
        <div className="_2iwx"></div>
        <div className="_2iwy"></div>
        <div className="_2iwz"></div>
        <div className="_2iw-"></div>
        <div className="_2iw_"></div>
        <div className="_2ix0"></div>
      </div>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  box-shadow: 0 3px 30px 0 #dfe4ec;
  background-color: #ffffff;
  min-height: 170px;
  padding: 20px 10px 20px 25px;
  border-radius: 16px;
  position: relative;
  margin-bottom: 12px;
  @media (max-width: 1023px) {
    margin-top: 12px;
  }
`;
const StatusWrapper = styled.div`
  border-radius: 8px;
  background-color: ${props => props.SecondaryShade};
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  margin-top: 8px;
  &::before,
  &::after {
    display: table;
    content: "";
    clear: both;
  }
`;
const DocImage = styled.div`
  width: 36px;
  height: 36px;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
  & img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const DocMessage = styled.div`
  margin-left: 12px;
  font-size: 15px;

  width: calc(100% - 46px);
  display: inline-block;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const LogoWrapper = styled.div`
  display: inline-block;
  width: 50px;
  height: 60px;
  padding-top: 4px;
  padding-bottom: 3px;
  float: left;
  @media (max-width: 1023px) {
    display: flex;
    align-items: center;
  }
`;
const Wrap = styled.div`
  position: relative;
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 20px;
  // &::before,
  // &::after {
  //   display: table;
  //   content: "";
  //   clear: both;
  // }
  @media (max-width: 1023px) {
    display: flex;
    justify-content: space-between;
  }
`;
const CompanyName = styled.div`
  display: inline-block;
  /* font-family: pf_handbook_proregular; */
  font-weight: 900;
  font-size: 18px;
  padding: ${props => (props.reducePadding ? "10px" : "14px")} 0 19px 10px;
  line-height: 22px;
  max-width: 220px;
  @media (max-width: 1023px) {
    padding: 20px 0 9px 10px;
  }
`;
const DownloadPolicy = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  /* height: 40px; */
  border-radius: 16px;
  background-color: ${props => props.PrimaryColor};
  padding: 5px 10px;
  text-align: ${props => props.track && "center"};
  /* font-family: pf_handbook_proregular; */
  font-weight: 600;
  font-size: 14px;
  min-width: 160px;
  color: #fff !important;
  & img {
    display: inline-block;
    width: 12%;
  }

  @media (max-width: 768px) {
    font-size: 10px;
    width: fit-content;
    height: auto;
    padding: 4px;
    margin: auto;
    min-width: auto;
    img {
      width: 11%;
    }
  }
`;
const PolicyWrapper = styled.div`
  // display: inline-block;
  // float: left;
  // max-width: 33.333%;
  // min-width: 20%;
  // &:not(:last-child) {
  //   margin-right: 50px;
  // }
`;
const Title = styled.div`
  /* font-family: pf_handbook_proregular; */
  font-size: 15px;
  font-weight: bold;

  margin-bottom: 2px;
  @media (max-width: 1023px) {
    font-size: 13px;
  }
`;

const Value = styled.div`
  /* font-family: pf_handbook_probold; */
  font-size: 16px;
  text-transform: capitalize;
  user-select: all;
  word-break: ${props => (props.break ? "break-all" : "break-word")};
  //text-align: ${props => props.center && "center"};
  // white-space: pre;
  @media (max-width: 1023px) {
    font-size: 11px;
    white-space: unset;
    text-align: left;
  }
`;
