import styled from "styled-components";

export const UnderWritingDiscisionTable = styled.div`
  width: 100%;
  border: 1px dashed #ddd;
  margin: 20px 0px;
  .head_section{
   font-weight:900;
    border-bottom: 1px dashed #ddd;
  }
  .section_column{
    padding:15px 0px 15px 40px;
    width: 33.33%;
  }
  .check_status_btn{
    width: 200px;
    margin: 10px 0;
    @media(max-width:400px){
      width:150px;
    }
  }

  .click_btn{
    background-color: #ecf6ff;
    font-family: "Dax", sans-serif;
    font-weight: 400;
    border-radius: 50px;
    margin: 0 8px;
    font-size: 14px;
    padding: 11px;
    :visited{
      background: #0a87ff !important;
      color:white;
    }
  }
`;

export const DisableScreen = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  top: -12px;
  left: 0px;
  z-index: 99;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: not-allowed;
  .display_onHover {
    display: none;
    font-size: 20px !important;
  }
  :hover {
    .display_onHover {
      display: block;
    }
  }
`;
