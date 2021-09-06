import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpinLoader from "../../../../components/Common/SpinLoader/SpinLoader";
import "styled-components/macro";

/* eslint-disable jsx-a11y/anchor-is-valid */
const CashlessHospital = ({ ActiveMainTab, hospitals }) => {
 
  const { loading } = useSelector(state => state.seeDetails);
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
      const tempArray = hospitals.hospitals.filter(data =>
        data.name.toLowerCase().includes(searchText.toLowerCase()),
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
                  style={{ paddingTop: "4px" }}
                >
                  Hospitals Near You
                </h2>
              </div>
              {/* <p className='color_gray_sub mb-15 title_h4_title'>
          Loreum ipsum site visit
        </p> */}
              <div className="row hospital_new_css_r">
                {hospitals.displayHospitals &&
                  hospitals.displayHospitals.map(item => {
                    return (
                      <div className="col-md-4">
                        <ul className="recent-news-item">
                          <li
                            style={{
                              minHeight: "135px",
                              maxHeight: "fir-content",
                            }}
                          >
                            <h4
                              className="sidebar-title color_red"
                              style={{ paddingBottom: "3px", fontSize: "18px" }}
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
                            >
                              {item[0].address}
                            </h6>
                            <div className="date">
                              Phone number: {item[0].phone}
                            </div>
                          </li>
                          <li>
                            <h4
                              className="sidebar-title color_red"
                              style={{ paddingBottom: "3px", fontSize: "18px" }}
                            >
                              {item[1].name}
                            </h4>
                            <h6
                              className="rn-title"
                              style={{
                                fontSize: "13px",
                                lineHeight: "15px",
                                padding: "5px 0px",
                              }}
                            >
                              {item[1].address}
                            </h6>
                            <div className="date">
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
                css={`
                  // justify-content: center;
                `}
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
                  <div className="theme-sidebar-widget">
                    <div className="row">
                      <div
                        className="col-md-12"
                        //  style={{ borderRight: "1px solid #cdcfe0" }}
                      >
                        <div className="single-block mb-10">
                          <form
                            action="#"
                            onSubmit={e => {
                              e.preventDefault();
                            }}
                            className="sidebar-search"
                          >
                            <i
                              className="fa fa-search margin_search_icon_plan"
                              aria-hidden="true"
                            ></i>
                            <input
                              className="bg_transparent border_none"
                              type="text"
                              value={searchText}
                              onChange={e => {
                                setSearchText(e.target.value);
                              }}
                              placeholder="Search Hospitals"
                            />
                          </form>
                        </div>
                      </div>
                      {/* <div className="col-md-6">
                        <div className="single-block mb-10">
                          <form
                            action="#"
                            onSubmit={e => {
                              e.preventDefault();
                            }}
                            className="sidebar-search"
                          >
                            <i
                              className="fa fa-search margin_search_icon_plan"
                              aria-hidden="true"
                            ></i>
                            <input
                              type="text"
                              className="bg_transparent border_none"
                              value={searchText.pincode}
                              onChange={e =>
                                setSearchText({
                                  ...searchText,
                                  searchValue: e.target.value,
                                  pincode: e.target.value,
                                })
                              }
                              placeholder="Search Hospitals by pincode"
                            />
                          </form>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>

                <table className="table margin_p_r_table table_pro_search">
                  <tbody>
                    <tr className="tr_table_search_hospital">
                      <th style={{ paddingTop: "unset" }}>Hospital Name</th>
                      <th>Address</th>
                      <th>Phone Number</th>
                    </tr>
                    {foundHospital?.length > 0 &&
                      foundHospital?.map(item => (
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
