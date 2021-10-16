import React from "react";
import { Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import SecureLS from "secure-ls";
import useUrlQuery from "../../../../customHooks/useUrlQuery";
import BackButton from "../../../../components/BackButton";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import "styled-components/macro";
const GoBack = ({ productDetails, path, groupCode }) => {
  const history = useHistory();

  const urlQueries = useUrlQuery();
  const enquiryID = urlQueries.get("enquiryId");
  return (
   
      <div
        css={`
          height: 66px;
        `}
      >
        <BackButton
          styledCss={`font-size:17px; display:flex; align-items:center;`}
          value={`Go Back`}
          icon={
            <span
              css={`
                color: #4f5c6f;
                font-size: 17px;
                position: relative;
                display:flex; 
                align-items:center;
                justify-content:center;
                top: 4px;
                width: 40px;
                height:40px;
                border-radius:100%;
                background: #f1f4f8;
              `}
            >
              <i class="fas fa-chevron-left"></i>
            </span>
          }
          onClick={() => {
            history.replace({
              pathname: `${path}/${groupCode}`,
              search: `enquiryId=${enquiryID}`,
            })

          }
          }
        ></BackButton>
      </div>
   
  );
};

export default GoBack;
