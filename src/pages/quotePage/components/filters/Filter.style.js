import styled from "styled-components";

export const Filter = styled.div`
    padding: 5px 20px;
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
    padding: 15px;
    font-weight: 600;
    input[type="radio"] {
      width: 20px;
      height: 20px;
    }
  }
`;

export const ApplyBtn = styled.button`
  background-color: #0a87ff;
  color: white;
  padding: 10px 0px;
  font-size: 20px;
  font-weight: 600;
`;
