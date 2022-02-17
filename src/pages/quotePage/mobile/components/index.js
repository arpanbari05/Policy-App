import { useTheme, useToggle } from "../../../../customHooks";
import {
  RiChatSmile3Line,
  RiFilter2Line,
  RiShareLine,
  RiSortAsc,
} from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";
import { EditMembers } from "../../components/filters/EditMemberFilter";
import React from "react";
import "styled-components/macro";
import { FilterModal } from "./Filters";
import Talktouspopup from "../../../../components/TalkToUs";

export function BottomNavigation({ sortBy = <></>, ...props }) {
  const { boxShadows } = useTheme();
  return (
    <div
      className="p-2 position-fixed bottom-0 w-100 d-flex"
      css={`
        border-radius: 1em 1em 0 0;
        box-shadow: ${boxShadows.six};
        background-color: #fff;
        & > div {
          flex: 1;
          display: flex;
          justify-content: center;
        }
      `}
      {...props}
    >
      <NavItemToggle icon={<BsPeopleFill />} label="Edit">
        <EditMembers />
      </NavItemToggle>
      <NavItemToggle icon={<RiFilter2Line />} label="Filter">
        <FilterModal />
      </NavItemToggle>
      <NavItemToggle icon={<RiShareLine />} label="Share"></NavItemToggle>
      <NavItemToggle icon={<RiChatSmile3Line />} label="Talk to us">
        <Talktouspopup show />
      </NavItemToggle>
      <NavItemToggle icon={<RiSortAsc />} label="Sort">
        {sortBy}
      </NavItemToggle>
    </div>
  );
}

export function NavItem({ icon: Icon = <></>, children, onClick, ...props }) {
  const { colors } = useTheme();
  return (
    <button
      onClick={onClick}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <div
        css={`
          font-size: 1.27rem;
          color: ${colors.font.six};
        `}
      >
        {Icon}
      </div>
      <div
        className="mt-1"
        css={`
          font-size: 0.79rem;
        `}
      >
        {children}
      </div>
    </button>
  );
}

function NavItemToggle({ icon: Icon = <></>, label = "", children }) {
  const toggle = useToggle(false);
  return (
    <div>
      <NavItem onClick={toggle.toggle} icon={Icon}>
        {label}
      </NavItem>
      {toggle.isOn
        ? React.Children.map(children, child =>
            React.cloneElement(child, {
              onClose: toggle.off,
              onHide: toggle.off,
            }),
          )
        : null}
    </div>
  );
}
