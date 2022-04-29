import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "styled-components/macro";
import styled from "styled-components/macro";
import SearchBarWithCityDD from "./SearchBarWithCityDD";
import SpinLoader from "../../../../../components/Common/SpinLoader/SpinLoader";
import {
  mobile,
  small,
  tablet,
  tabletAndMobile,
} from "../../../../../utils/mediaQueries";
import { useTheme } from "../../../../../customHooks";
import NetworkHospitalUrlCard from "../../../../../components/ProductDetails/components/NetworkHospitalUrlCard";

function MobileCashlessHospitals({ ActiveMainTab, hospitals }) {
  const [searchText, setSearchText] = useState("");

  const [searchByNameKeys, setSearchByNameKeys] = useState([]);

  const [searchByPincodeKeys, setSearchByPincodeKeys] = useState([]);

  const [foundHospital, setFoundHospital] = useState(hospitals.hospitals);

  const { colors } = useTheme();

  const { loading } = useSelector(state => state.seeDetails);
  useEffect(() => {
    setFoundHospital(hospitals.hospitals);
  }, [hospitals]);

  useEffect(() => {
    if (searchText.length > 0) {
      const tempArray = hospitals.hospitals.filter(data =>
        data.name.toLowerCase().includes(searchText.toLowerCase()),
      );

      setFoundHospital(tempArray);
    } else if (searchText.length < 1) {
      setFoundHospital(hospitals.hospitals);
    }
  }, [searchText]);

  console.log("hospitals", hospitals);

  return (
    <div
      className={`z-content ${ActiveMainTab && "z-active"}`}
      style={{ display: ActiveMainTab ? "block" : "none" }}
      css={`
        display: none !important;
        ${tabletAndMobile} {
          display: block !important;
          padding-bottom: 90px !important;
        }
      `}
    >
      <Outer
        networkUrl={
          hospitals.networkHospitalUrl || hospitals.networkHospitalUrl !== ""
        }
      >
        {loading ? (
          <SpinLoader />
        ) : !hospitals.networkHospitalUrl ||
          hospitals.networkHospitalUrl === "" ? (
          <>
            <FeatureSection secondary_color={colors.secondary_color}>
              <h6
                style={{
                  fontWeight: "600",
                  marginTop: "10px",
                  fontSize: "17px",
                }}
              >
                Hospitals Near By You
              </h6>
            </FeatureSection>
            <DisplayHospitals>
              <table
                width="100%"
                height="50px"
                style={{ marginLeft: "auto", marginRight: "auto" }}
              >
                {hospitals.displayHospitals &&
                  hospitals.displayHospitals.map(item =>
                    item.map((el, index) => (
                      <tr>
                        <td
                          style={{
                            padding: "10px",
                            fontSize: "13px",
                          }}
                        >
                          <span
                            style={{
                              color: colors.primary_color,
                            }}
                          >
                            {el.name}
                          </span>
                          <br />
                          <small style={{ color: "#7b7b7b", marginTop: "5px" }}>
                            {el.address}
                          </small>
                          <br />
                          <small style={{ color: "#7b7b7b", marginTop: "5px" }}>
                            {el.phone}
                          </small>
                        </td>
                      </tr>
                    )),
                  )}
              </table>
            </DisplayHospitals>

            <hr />
            <div
              css={`
                padding: 0px 10px;
              `}
            >
              <SearchBarWithCityDD
                searchText={searchText}
                setSearchText={setSearchText}
              />
            </div>

            <table className="table  table_pro_search">
              <tbody>
                <tr
                  className="tr_table_search_hospital "
                  css={`
                    ${mobile} {
                      background: #f8f9fa;
                      padding: 20px;
                      height: 45px;
                      line-height: 44px;
                      border-radius: 8px;
                    }
                    @media (max-width: 450px) {
                      display: none;
                    }
                  `}
                >
                  <th
                    style={{
                      paddingTop: "unset",
                      whiteSpace: "nowrap",
                      paddingRight: "10px",
                      fontSize: "15px",
                    }}
                    css={`
                      padding: 12px !important;
                      ${mobile} {
                        padding: 2px 0 4px 13px;
                        vertical-align: top;
                        text-align: left;
                        width: 30%;
                        color: #aeaeae;
                        font-size: 12px;
                        font-weight: 100;
                        border-bottom: unset;
                      }
                    `}
                  >
                    <span
                      css={`
                        font-weight: 900;
                        display: none;
                        @media (max-width: 450px) {
                          display: block;
                        }
                      `}
                    >
                      Hospital Name, Address and Phone No.
                    </span>
                    <span
                      css={`
                        font-weight: 900;
                        border: none;
                        @media (max-width: 450px) {
                          display: none;
                        }
                      `}
                    >
                      Hospital Name and Address
                    </span>
                  </th>
                  <th
                    style={{
                      paddingTop: "unset",
                      whiteSpace: "nowrap",
                      fontSize: "15px",
                    }}
                    css={`
                    padding: 12px !important;
                      ${mobile} {
                        padding: 2px 0 4px 13px;
                        vertical-align: top;
                        text-align: left;
                        width: 30%;
                        color: #aeaeae;
                        font-size: 12px
                        font-weight: 100;
                        padding: 12px !important;
                        border-bottom : unset;
                      }
                      @media (max-width: 450px) {
                        display: none;
                      }
                    `}
                  >
                    Phone No.
                  </th>
                </tr>

                {foundHospital?.map(item => (
                  <>
                    <tr>
                      <td style={{ padding: "5px 10px" }}>
                        <div>
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                            }}
                          >
                            {item.name}
                          </span>
                          <p
                            style={{
                              fontSize: "12px",
                              lineHeight: "1.3",
                              fontWeight: "300",
                              color: "gray",
                              marginBottom: "unset",
                            }}
                          >
                            {item.address}
                            <span
                              css={`
                                display: none;
                                margin-top: 3px;
                                @media (max-width: 450px) {
                                  display: block;
                                }
                              `}
                            >
                              {item.phone}
                            </span>
                          </p>
                        </div>
                      </td>

                      <td
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                        css={`
                          @media (max-width: 450px) {
                            display: none;
                          }
                        `}
                      >
                        {item.phone}
                      </td>
                    </tr>
                    <hr
                      css={`
                        margin: unset !important;
                      `}
                    />
                  </>
                ))}
              </tbody>
            </table>
            {foundHospital?.length < 1 && (
              <div
                css={`
                  display: flex;
                  width: 100%;
                  height: 88px;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <p>No hospitals found!</p>
              </div>
            )}
          </>
        ) : (
          <div
            css={`
              padding: 20px;
              background: transparent;
            `}
          >
            <NetworkHospitalUrlCard url={hospitals.networkHospitalUrl} />
          </div>
        )}
      </Outer>
    </div>
  );
}

const Outer = styled.div`
  background-color: ${props => (props.networkUrl ? "transparent" : "#fff")};
  padding-bottom: 40px;
`;
const Search = styled.div`
  display: flex;
  justify-content: flex-start;
  border: 1px solid gray;
  margin: 10px;
  border-radius: 10px;
  padding: 10px 5px;
  margin-top: 20px;
  flex-wrap: nowrap;
  @media (max-width: 767px) {
    padding: 0px 5px !important;
  }
`;

const FeatureSection = styled.div`
  padding: 10px;
  padding-top: 20px;
  margin-left: 20px;
  display: flex;
  &::before {
    content: "";
    color: ${({ secondary_color }) => secondary_color};
    height: 39px;
    width: 9px;
    padding-right: 10px;
    margin-right: 10px;
    @media (max-width: 767px) {
      padding-right: 5px;
      width: 5px;
    }
    /* top: -7px; */
    /* left: -20px; */
    /* position: absolute; */
    /* background-color: #de9b9e; */
    background-color: ${({ secondary_color }) => secondary_color};
    border-radius: 0 15px 15px 0;
  }
  @media (max-width: 767px) {
    padding: 0px;
    padding-top: 10px !important;
    margin-left: 10px;
  }
`;

const DisplayHospitals = styled.div`
  background-color: #f3f4f9;
  border-radius: 20px;
  margin: 10px;
`;

export default MobileCashlessHospitals;
