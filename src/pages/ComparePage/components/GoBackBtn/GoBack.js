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
    <Container>
      <div
        css={`
          height: 66px;
        `}
      >
        <BackButton
          styledCss={`width: 121px;`}
          value={`Back`}
          icon={
            <span
              css={`
                color: #ebf5ff;
                font-size: 43px;
                position: relative;
                top: 4px;
              `}
            >
              <IoChevronBackCircleSharp />
            </span>
          }
          onClick={() =>
            history.replace({
              pathname: `${path}/${groupCode}`,
              search: `enquiryId=${enquiryID}`,
            })
          }
        ></BackButton>
      </div>
    </Container>
  );
};

export default GoBack;
