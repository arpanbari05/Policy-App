import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpinLoader from "../../../../components/Common/SpinLoader/SpinLoader";
import "styled-components/macro";

/* eslint-disable jsx-a11y/anchor-is-valid */
const CashlessHospital = ({ ActiveMainTab, hospitals }) => {
  const { loading } = useSelector((state) => state.seeDetails);
  const [searchText, setSearchText] = useState("");
  const [searchByNameKeys, setSearchByNameKeys] = useState([]);
  const [searchByPincodeKeys, setSearchByPincodeKeys] = useState([]);
  const [foundHospital, setFoundHospital] = useState(hospitals.hospitals);

  // useEffect(() => {
  //   if (hospitals.searchByName && hospitals.searchByPincode) {
  //     setSearchByNameKeys(Object.keys(hospitals.searchByName));
  //     setSearchByPincodeKeys(Object.keys(hospitals.searchByPincode));
  //   }
  // }, [hospitals]);

  useEffect(() => {
    setFoundHospital(hospitals.hospitals);
  }, [hospitals]);

  useEffect(() => {
    if (searchText.length > 0) {
      const tempArray = hospitals.hospitals.filter((data) =>
        data.name.toLowerCase().includes(searchText.toLowerCase())
      );

      setFoundHospital(tempArray);
    } else if (searchText.length < 1) {
      setFoundHospital(hospitals.hospitals);
    }

    // if (
    //   searchText.searchValue &&
    //   hospitals.searchByName &&
    //   hospitals.searchByPincode
    // ) {
    //   if (
    //     searchText.searchValue === searchText.pincode &&
    //     searchText.searchValue.length === 6
    //   ) {
    //     let matches = [];
    //     searchByPincodeKeys.forEach(item => {
    //       if (item.includes(searchText.pincode))
    //         matches.push(...hospitals.searchByPincode[item]);
    //     });

    //     setFoundHospital(matches);
    //   } else if (
    //     searchText.searchValue === searchText.name &&
    //     searchText.searchValue.length >= 4
    //   ) {
    //     let matches = [];
    //     searchByNameKeys.forEach(item => {
    //       let re = new RegExp(searchText.name, "i");
    //       if (item.match(re)) matches.push(...hospitals.searchByName[item]);
    //     });

    //     setFoundHospital(matches);
    //   }
    // }
  }, [searchText]);
  return (
    <div
      className={`z-content ${ActiveMainTab && "z-active"}`}
      style={{
        position: "relative",
        display: ActiveMainTab ? "block" : "none",
        left: ActiveMainTab ? "0px" : "1296px",
        top: "0px",
        padding: "0 70px",
      }}
    >
      {loading ? (
        <SpinLoader />
      ) : (
        <div className="col-lg-12 col-md-6 col-sm-8">
          <div className="theme-sidebar-widget">
            <div className="single-block mb-80 text-left">
              <div className="plan_a_t_search_s" style={{ marginTop: "40px" }}>
                <h2
                  className="title_h4 title_h4_title "
                  css={`
                    font-size: 23px;
                    margin-bottom: 8px;
                    color: #253858;
                    font-weight: 900;
                  `}
                >
                  Hospitals Near You
                </h2>
              </div>
              {/* <p className='color_gray_sub mb-15 title_h4_title'>
          Loreum ipsum site visit
        </p> */}
              <div className="row hospital_new_css_r">
                {hospitals.displayHospitals &&
                  hospitals.displayHospitals.map((item) => {
                    return (
                      <div
                        className="col-md-4"
                        css={`
                          & ul {
                            margin: 0;
                            padding: 0;
                          }
                          & li {
                            margin-bottom: 10px;
                            list-style-type: none;
                            min-height: 135px;
                            box-shadow: 0 3px 13px 0 rgb(0 0 0 / 16%);
                            margin-bottom: 20px;
                            padding: 15px;
                          }
                        `}
                      >
                        <ul>
                          <li>
                            <h4
                              className="sidebar-title color_red"
                              style={{ paddingBottom: "3px", fontSize: "18px" }}
                              css={`
                                color: #253858;
                                font-weight: 900;
                              `}
                            >
                              {item[0].name}
                            </h4>
                            <h6
                              className="rn-title"
                              style={{
                                fontSize: "13px",
                                lineHeight: "15px",
                                padding: "5px 0px",
                              }}
                              css={`
                                color: #253858;
                              `}
                            >
                              {item[0].address}
                            </h6>
                            <div
                              className="date"
                              css={`
                                color: #253858;
                              `}
                            >
                              Phone number: {item[0].phone}
                            </div>
                          </li>
                          <li>
                            <h4
                              className="sidebar-title color_red"
                              style={{ paddingBottom: "3px", fontSize: "18px" }}
                              css={`
                                color: #253858;
                                font-weight: 900;
                              `}
                            >
                              {item[1].name}
                            </h4>
                            <h6
                              css={`
                                color: #253858;
                              `}
                              className="rn-title"
                              style={{
                                fontSize: "13px",
                                lineHeight: "15px",
                                padding: "5px 0px",
                              }}
                            >
                              {item[1].address}
                            </h6>
                            <div
                              className="date"
                              css={`
                                color: #253858;
                              `}
                            >
                              Phone number: {item[1].phone}
                            </div>
                          </li>
                        </ul>
                      </div>
                    );
                  })}
              </div>
              <div
                className="row hospital_margin"
                style={{
                  marginTop: "20px",
                }}
              >
                <div
                  className="col-lg-12 col-md-6 col-sm-8 border_search_all"
                  style={{
                    marginBottom: "15px",
                    padding: "0px",
                    boxShadow: "1px 1px 5px #c2cbde",
                  }}
                  css={`
                    max-width: 40%;
                    margin-left: 34px;
                  `}
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="single-block mb-10">
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                          }}
                          css={`
                            padding: 15px;
                            border-radius: 4px;
                            box-shadow: 0 3px 13px 0 rgba(0, 0, 0, 0.16);
                          `}
                        >
                          <i
                            className="fa fa-search margin_search_icon_plan"
                            aria-hidden="true"
                          ></i>
                          <input
                            css={`
                              outline: none;
                              border: none;

                              color: #000;
                              opacity: 0.39;
                            `}
                            type="text"
                            value={searchText}
                            onChange={(e) => {
                              setSearchText(e.target.value);
                            }}
                            placeholder="Search Hospitals"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <table className="table margin_p_r_table table_pro_search">
                  <tbody
                    css={`
                      & td {
                        border-bottom: 1px solid #d5ddea6e !important;
                        padding: 15px;
                      }
                    
                    `}
                  >
                    <tr
                      className="tr_table_search_hospital"
                      css={`
                        background-color: #d5ddea6e;
                        font-size: 20px;
                      `}
                    >
                      <th style={{ paddingTop: "unset" }}>Hospital Name</th>
                      <th>Address</th>
                      <th>Phone Number</th>
                    </tr>
                    {foundHospital?.length > 0 &&
                      foundHospital?.map((item) => (
                        <tr>
                          <td>{item.name}</td>
                          <td>{item.address}</td>
                          <td>{item.phone}</td>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashlessHospital;
