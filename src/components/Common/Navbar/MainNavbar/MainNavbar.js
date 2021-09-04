import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import adityaBirlaLogo from "../../../../assets/images/adityaBirlaLogo.png";
import CartIcon from "../../../../assets/images/cart.png";
import DropdownOnHover from "../DropdownOnHover/DropdownOnHover";
import NavDropdown from "../NavDropdown/NavDropdown";
import {
  advertising,
  financing,
  investing,
  protecting,
} from "./DropDownData/MainNavData";
import "./Navbar.scss";
import { useSelector } from "react-redux";
import { SidebarCart } from "../../../../modules/Cart";
import "styled-components/macro";

const MainNavbar = () => {
  const cartArr = useSelector(({ quotePage }) => quotePage.cartItems);
  const { pathname } = useLocation();
 console.log(pathname)
  const navbarNavigation = (
    <ul className="navbar__nav">
      <li>
        <DropdownOnHover label={"PROTECTING"} items={protecting} hasLink />
      </li>
      <li>
        <DropdownOnHover label={"INVESTING"} items={investing} hasLink />
      </li>
      <li>
        <DropdownOnHover label={"FINANCING"} items={financing} hasLink />
      </li>
      <li>
        <DropdownOnHover label={"ADVISING"} items={advertising} hasLink />
      </li>

      <li
      //	style={{ display: "flex", alignItems: "center" }}
      >
        <span>1800-270-7000</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="13"
          viewBox="0 0 14 13"
          style={{ paddingLeft: "5px", width: "19px" }}
        >
          <path
            fill="none"
            fillRule="evenodd"
            stroke="#FFF"
            strokeLinecap="square"
            d="M10.143 7.429L8.429 9.143 3.857 4.57l1.714-1.714L2.714 0 1 1.714C1 7.394 5.605 12 11.286 12L13 10.286l-2.857-2.857z"
          />
        </svg>
      </li>
      <li>
        <span>HOME</span>
      </li>
    </ul>
  );

  return (
    <div
      className="navbar"
      css={`
        padding: 0 40px !important;
        @media (max-width: 767px) {
          padding: 0 18px !important;
        }
      `}
    >
      <div className="navbar__logo">
        <a href="/">
          <img src={adityaBirlaLogo} alt="" width="202px;" />
        </a>
      </div>
      {/* {navbarNavigation}  */}
      {/* {pathname !== "/" && (
        <div style={{ zIndex: 99 }}>
          <NavDropdown
            customClassName="navbar__cart-dropdown"
            items={["adfs", "asfd"]}
          >
            <button className="navbar__cartBtn">
              <img src={CartIcon} alt="" style={{ width: "30px" }} />
              <span className="navbar__cartBtn__item-count hide-in-tab">
                {cartArr.length}
              </span>
            </button>
          </NavDropdown>
          <span className="navbar__toggler">
            <i className="flaticon-setup"></i>
          </span>
        </div>
      )} */}
      {pathname !== "/" ? <SidebarCartToggle isQuotes={pathname?.slice(0, 7) === "/quotes" ? true : false} /> : null}
    </div>
  );
};

export default MainNavbar;

function SidebarCartToggle({isQuotes}) {
 
  const [showCart, setShowCart] = useState(false);
  const toggleShowCart = () => {
    setShowCart(!showCart);
    if (!showCart && !isQuotes) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
      return;
    }
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  };
  const cart = useSelector(state => state.cart);
  const cartItemsCount = Object.keys(cart).reduce(
    (count, groupCode) =>
      cart[groupCode] && groupCode !== "totalPremium" ? count + 1 : count,
    0,
  );
  return (
    <div>
      <CartIconButton number={cartItemsCount} onClick={toggleShowCart} />
      {showCart ? <SidebarCart handleClose={toggleShowCart} /> : null}
    </div>
  );
}

function CartIconButton({ number = 0, ...props }) {
  return (
    <button
      css={`
        position: relative;
      `}
      {...props}
    >
      <img src={CartIcon} alt="cart" width="30" />
      <div
        css={`
          position: absolute;
          top: -30%;
          right: -30%;
          font-size: 12px;
          font-weight: 900;
          background-color: #fff;
          color: var(--abc-red);
          border-radius: 50%;
          height: 20px;
          width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {number}
      </div>
    </button>
  );
}
