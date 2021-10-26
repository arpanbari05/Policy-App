import styled from "styled-components";

export const Filter = styled.div`
  padding: 5px 20px;
  cursor: pointer;
  &:hover {
    background-color: #eef1f4;
    :not(:last-child) {
      border-right: 1px solid transparent;
    }
  }
  :not(:last-child) {
    border-right: 1px solid #eef1f4;
  }
  .filter_head {
    color: #808080;
    font-size: 16px;
  }
  .filter_sub_head {
    position: relative;
    text-transform: capitalize;
    font-weight: 600;
    i {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0px;
    }
  }

  @media (max-width: 1399px) {
    .filter_head {
      font-size: 13px;
    }
    .filter_sub_head {
      font-size: 14px;
    }
  }
`;

export const OptionWrapper = styled.ul`
  list-style: none;
  padding-left: 0rem;
  .option {
    border-bottom: 1px solid #d5dce5;
    text-transform: capitalize;
    padding: 14px 5px;
    font-weight: 600;
    input[type="radio"] {
      width: 20px;
      height: 20px;
    }
  }
  .insurer_option {
    .insurer_logo {
      width: 40px;
      display: flex;
      height: 40px;
      justify-content: center;
      align-items: center;
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
  background-color: ${props=>props.PrimaryColor};
  color: white;
  padding: 10px 0px;
  font-size: 17px;
  font-weight: 600;
  border: none;
`;
