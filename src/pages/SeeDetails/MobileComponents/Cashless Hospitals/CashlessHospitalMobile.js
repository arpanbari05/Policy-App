import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components/macro";
import SpinLoader from "../../../../components/Common/SpinLoader/SpinLoader";

function CashlessHospitalMobile({ ActiveMainTab, hospitals }) {
  

  const [searchText, setSearchText] = useState("");

  const [searchByNameKeys, setSearchByNameKeys] = useState([]);
  const [searchByPincodeKeys, setSearchByPincodeKeys] = useState([]);
  const [foundHospital, setFoundHospital] = useState(hospitals.hospitals);

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

  return (
    <div
      className={`z-content ${ActiveMainTab && "z-active"}`}
      style={{ display: ActiveMainTab ? "block" : "none" }}
    >
      <Outer>
        {loading ? (
          <SpinLoader />
        ) : (
          <>
            <FeatureSection>
              <h6 style={{ fontWeight: "600", marginTop: "10px" }}>
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
                              color: "#0a87ff",
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

            <Search>
              <div
                style={{
                  padding: "10px 10px",
               //   borderRight: "1px solid lightgray",
                  width: "100%",
                }}
              >
                <form
                  action="#"
                  onSubmit={e => {
                    e.preventDefault();
                  }}
                  className="sidebar-search"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <i
                    className="fa fa-search "
                    aria-hidden="true"
                    style={{ marginRight: "10px" }}
                  ></i>
                  <input
                    className="bg_transparent border_none"
                    type="text"
                    style={{ fontSize: "14px" }}
                    value={searchText}
                    onChange={e => {
                      setSearchText(e.target.value);
                    }}
                    placeholder="Search Hospitals"
                  />
                </form>
              </div>
              {/* <div style={{ padding: "10px 10px", width: "50%" }}>
                <form
                  action="#"
                  onSubmit={e => {
                    e.preventDefault();
                  }}
                  className="sidebar-search"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <i
                    className="fa fa-search "
                    aria-hidden="true"
                    style={{ marginRight: "10px" }}
                  ></i>
                  <input
                    className="bg_transparent border_none"
                    type="text"
                    style={{ width: "100%", fontSize: "14px" }}
                    value={searchText.pincode}
                    onChange={e => {
                      e.preventDefault();
                      setSearchText({
                        ...searchText,
                        searchValue: e.target.value,
                        pincode: e.target.value,
                      });
                    }}
                    placeholder="Search Pincode"
                  />
                </form>
              </div> */}
            </Search>

            <table className="table  table_pro_search">
              <tbody>
                <tr className="tr_table_search_hospital ">
                  <th
                    style={{
                      paddingTop: "unset",
                      whiteSpace: "nowrap",
                      paddingRight: "10px",
                     
                      fontSize: "15px",
                    }}
                  >
                    Hospital Name and Address
                  </th>
                  <th
                    style={{
                      paddingTop: "unset",
                      whiteSpace: "nowrap",
         
                     
                      fontSize: "15px",
                    }}
                  >
                    Phone No.
                  </th>
                </tr>

                {foundHospital?.map(item => (
                  <tr style={{ borderBottom: "1px solid lightgray" }}>
                    <td style={{ padding: "10px" }}>
                      <div>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: "400",
                            lineHeight: "1.3",
                          }}
                        >
                          {item.name}
                        </p>
                        <p
                          style={{
                            fontSize: "12px",
                            lineHeight: "1.3",
                            fontWeight: "300",
                            color: "gray",
                          }}
                        >
                          {item.address}
                        </p>
                      </div>
                    </td>

                    <td
                      style={{
                        fontSize: "14px",
                        fontWeight: "400",
                      
                      }}
                    >
                      {item.phone}
                    </td>
                  </tr>
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
        )}
      </Outer>
    </div>
  );
}

const Outer = styled.div`
  background-color: #fff;

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
    color:#2cd44a;
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
    background-color: #2cd44a;
    border-radius: 0 15px 15px 0;
  }
  @media (max-width: 767px) {
    padding: 0px;
    padding-top: 20px !important;
    margin-left: 10px;
  }
`;

const DisplayHospitals = styled.div`
  background-color: #f3f4f9;
  border-radius: 20px;
  margin: 10px;
`;

export default CashlessHospitalMobile;
