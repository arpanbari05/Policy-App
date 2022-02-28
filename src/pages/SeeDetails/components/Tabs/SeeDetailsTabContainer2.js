import React from "react";
import useWindowSize from "../../../../customHooks/useWindowSize";
import styled from "styled-components";

const SeeDetailsTabContainer2 = ({
  title,
  id,
  onClick,
  activeFieldset,
  image,
}) => {
  const handleClick = id => {
    onClick(id);
  };
  const [windowHeight, windowWidth] = useWindowSize();
  return (
    <SeeDetailsTabContainerStyle>
      <li
        className={`z-tab z-first ${activeFieldset === id && "z-active"} ${
          id === 1 ? "firsttab" : id === 5 && "secondtab"
        }`}
      >
        <a
          className="z-link see-details__z-link"
          style={{ paddingRight: "0px" }}
          onClick={() => handleClick(id)}
        >
          {/* <img src={image} alt="" />{" "} */}
          <span style={{ paddingRight: "15px", textAlign: "center" }}>
            {title}
          </span>
        </a>
      </li>
    </SeeDetailsTabContainerStyle>
  );
};

export default SeeDetailsTabContainer2;

const SeeDetailsTabContainerStyle = styled.div`
  //margin:0px auto;
  cursor: pointer;
  & a {
    text-align: center;
  }
  & span {
    color: #000 !important;
  }
  & li {
    width: 260px;
    padding: 20px 2px;
    list-style-type: none;
    border: 1px solid #e3e4e8;
  }
  & .firsttab {
    border-radius: 6px 0 0 6px;
  }
  & .secondtab {
    border-radius: 0 6px 6px 0;
  }
  & .z-active,
  & li:hover {
    & span {
      font-weight: 900;
      color: #fff !important;
    }
    background-color: #0d6efd;
    border: 1px solid #0d6efd;
  }
  img {
    margin-right: 10px;
    padding-left: 8px;
  }
  @media (max-width: 1114px) {
    img {
      width: 40px;
      margin-top: 14px !important;
    }
    a span {
      font-size: 15px;
    }
  }
`;
