import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "styled-components/macro";
import DownloadMobile from "./DownloadMobile";
function CardMobile({ values }) {
  const { frontendData } = useSelector(state => state.frontendBoot);
  return (
    <CardWrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              height: "100%",
              width: "100%",
              maxWidth: "40px",
              maxHeight: "40px",
            }}
          >
            <img
              src={
                values?.product?.company.alias &&
                frontendData.data.companies[values?.product?.company.alias].logo
              }
              alt="logo"
            />
          </div>

          <div style={{ padding: "0px 10px" }}>
            <p>{values?.product?.name}</p>
          </div>
        </div>
        <div>
          <button
            css={`
              display: flex;

              align-items: center;
              height: 40px;
              border-radius: 5px;
              background-color: #c7222a;
              padding: 8px 16px;
              font-family: pf_handbook_probold;
              font-size: 15px;
              color: #fff;
            `}
          >
            Download
            <DownloadMobile />
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          marginRight: "30px",
        }}
      >
        <Box>
          <Title>Your Policy No.</Title>

          <Value>11111</Value>
        </Box>
        <Box>
          <Title>Members</Title>

          <Value>
            {values?.group?.members && values?.group?.members.join(", ")}
          </Value>
        </Box>
        <Box>
          <Title>Status</Title>
          <Value>Policy Issued</Value>
        </Box>
      </div>
    </CardWrapper>
  );
}
const CardWrapper = styled.div`
  margin-top: 20px;
  box-shadow: 0 3px 30px 0 #dfe4ec;
  background-color: #ffffff;
  height: 130px;
  padding: 20px 15px 20px 15px;
  border-radius: 10px;
  position: relative;
`;

const Box = styled.div``;

const Title = styled.div`
  font-size: 13px;
`;

const Value = styled.div`
  font-size: 14px;
  font-family: pf_handbook_probold;
  text-transform: capitalize;
`;

export default CardMobile;
