import styled from "styled-components";

export const Filter = styled.div`
  padding: 5px 20px;
  
  &:hover{
    background-color:#eef1f4;
  }
  :not(:last-child) {
    border-right: 1px solid #cacaca;
  }
  .filter_head {
    color: #808080;
    font-size: 16px;
  }
  .filter_sub_head {
    position: relative;

    font-weight: 600;
    i {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0px;
    }
  }
`;

export const OptionWrapper = styled.ul`
  list-style: none;
  padding-left: 0rem;
  .option {
    border-bottom: 1px solid #d5dce5;
    padding: 15px 5px;
    font-weight: 600;
    input[type="radio"] {
      width: 20px;
      height: 20px;
    }
  }
  .insurer_option {
    .insurer_logo {
      width: 80px;
      height: 40px;
    }
  }
  .custom_checkbox {
    width: 20px;
    height: 20px;
    border: 1px solid grey;
    border-radius: 100%;
    margin-left: 10px;
  }
  .custom_radio {
    width: 20px;
    height: 20px;
    border: 1px solid grey;
    border-radius: 100%;
    margin-left: 10px;
  }
  input[type="checkbox"]:checked + label {
    .custom_checkbox {
      background-color: #0a87ff;
      border: 1px solid white;
      ::before {
        content: "\u2713";
        color: white;
        display: flex;
        justify-content: center;
        margin: -3.5px auto;
      }
    }
  }
  input[type="radio"]:checked + label {
    .custom_radio {
      /* background-color: #0a87ff; */
      border: 1px solid #0a87ff;
      display: flex;
        justify-content: center;
        align-items: center;
        
      ::before {
        content: "";
        border-radius: 100%;
        background-color: #0a87ff;
        width: 13px;
  
        height: 13px;
    
      }
    }
  }
`;

export const ApplyBtn = styled.button`
  background-color: #0a87ff;
  color: white;
  padding: 10px 0px;
  font-size: 17px;
  font-weight: 600;
  border: none;
`;
