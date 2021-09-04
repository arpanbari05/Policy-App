import React from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import SecureLS from "secure-ls";
import useUrlQuery from "../../../../customHooks/useUrlQuery";
import "./GoBack.css"
const GoBack = ({ productDetails, path, groupCode }) => {
  const history = useHistory();

  const urlQueries = useUrlQuery();
  const enquiryID = urlQueries.get("enquiryId");
  return (
    <Container>
      <div className="theme-title-one text-center">
        <button
          onClick={() =>
            history.replace({
              pathname: `${path}/${groupCode}`,
              search: `enquiryId=${enquiryID}`,
            })
          }
          className="go_back_quote compare_back"
          style={{ left: productDetails ? "0px" : "54px" }}
        >
          <i className="flaticon-back font_size_go_back"></i>
          <p className="hideGoBack">
            &nbsp;Go Back
          </p>
        </button>
        <h2 className="main-title comp_m_top_line" >&nbsp;</h2>
      </div>
    </Container>
  );
};

export default GoBack;
