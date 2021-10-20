import styled from "styled-components";

export const Label = styled.label`
  position: absolute;
  z-index: -1;
  top: -10px;
  background: #fff;
  left: 18px;
  font-size: 13px;
`;

export const Wrapper = styled.div`
  position: relative;

  top: -3px;

  @media (max-width: 767px) {
    left: unset;
  }
`;

export const Header = styled.a`
  cursor: pointer;
  background-color: #fff;
  position: relative;
  border: 0.2px solid #dfe1f2;
  padding: ${(props) => (props.sortByDD ? "auto" : "12px 15px !important")};
  display: inline-block;
  width: ${(props) => (props.sortByDD ? "auto" : "175px")};
  overflow: hidden;
  position: relative;
  z-index: 1;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: inset 0 1px 1px rgb(0 0 0 / 10%);
  box-shadow: inset 0 1px 1px rgb(0 0 0 / 10%);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 50px;
  box-shadow: 0 12px 12px -11px #004b8347;
  margin: 0px 53px 0 2px;

  &.active {
    border-radius: 3px 3px 0 0;
    box-shadow: inset 0 1px 2px rgb(0 0 0 / 15%);
  }
  @media (max-width: 767px) {
    margin: unset;
    width: 130px;
  }
`;

export const HeaderTitle = styled.div`
  position: "relative";
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  color: #000;
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 37%;
    right: 15px;
    /* margin-top: -3px; */
    width: 0;
    height: 0;
    /* border: solid #7b7b7b; */
    border: solid #000;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
  &.active:after {
    top: 43%;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }
  & input {
    position: absolute;
    border: none;
    outline: none;
  }

  @media (max-width: 458px) {
    font-size: 13px;
  }
`;
export const List = styled.div`
  position: absolute;
  z-index: 10000;
  border: 1px solid #d0d0d0;
  background: #fff;
  margin: 0px 0px 0 2px;
  border-top: 0 none;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
  -webkit-border-radius: 0 0 3px 3px;
  -moz-border-radius: 0 0 3px 3px;
  border-radius: 0 0 3px 3px;

  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100px;
  -webkit-overflow-scrolling: touch;
`;
export const ListItem = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;
  color: black;
  padding: 5px 8px 8px 14px;

  &:hover,
  &.active {
    background-color: #e2f0ff;
    color: #495c68;
  }
`;
