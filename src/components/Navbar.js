import { useState } from "react";
import { fyntune } from "../assets/images";
import { useSelector } from "react-redux";
import Card from "./Card";
import "styled-components/macro";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import TextInput from "./TextInput";
import ThemeModal from "./ThemeModal";
const Navbar = () => {
  const { trace_id } = useSelector((state) => state.greetingPage);
  const location = useLocation();
  const [show, setShow] = useState(false);

  return (
    <div
      css={`
        @media (max-width: 769px) {
          display: none;
        }
      `}
    >
      <Card width={"100%"} height={"80px"}>
        <div
          css={`
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0px 100px;
          `}
        >
          <a href="/">
            <img
              src={fyntune}
              alt={`companylogo`}
              css={`
                height: 34px;
                cursor: pointer;
              `}
            />
          </a>
        </div>

        {location.pathname !== "/" && trace_id && (
          <div
          onClick={()=>{setShow(true)}}
            css={`
              position: absolute;
              right: 14px;
              bottom: 2px;
              font-size: 12px;
            `}
          >
            Trace Id: <span>{trace_id}</span>
          </div>
        )}
        {location.pathname === "/" && (
          <div
            onClick={()=>{setShow(true)}}
            css={`
              position: absolute;
              right: 14px;
              bottom: 2px;
              font-size: 12px;
            `}
          >
            Theme
          </div>
        )}
      </Card>
      <ThemeModal show={show} setShow={setShow}/>
    </div>
  );
};

export default Navbar;
