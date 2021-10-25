// TRY ADDING THE SCROLL TOP BEHAVIOR
import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import styled from "styled-components/macro";

const TextInput2 = React.forwardRef(
  (
    {
      label,
      name,
      type,
      placeholder,
      autoComplete,
      value,
      clear,
      styledCss,
      onChange,
      onPaste,
      onCopy,
      onKeyDown,
      onBlur,
      maxLength,
    },
    ref
  ) => (
    <div
      css={`
        ${styledCss}
        position: relative;
        & span {
          position: absolute;
          top: 15px;
          right: 14px;
          cursor: pointer;
          & img {
            height: 34px;
          }
        }
        & input {
          padding-top: 41px !important;
          padding-bottom: 22px !important;
          font-weight: 900;
        }
        & label {
          padding: 19px 0.75rem;
          color: #505b6d;
          font-weight: 900;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}
    >
      <FloatingLabel controlId="floatingInput" label={label}>
        <Form.Control
          name={name}
          type={type}
          step="none"
          placeholder={"text"}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          onPaste={onPaste}
          onCopy={onPaste}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          maxLength={maxLength}
          ref={ref}
        />
      </FloatingLabel>
    </div>
  )
);

export default TextInput2;

export const FormGroup = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  box-shadow: none;
  position: relative;
`;
export const TextInput = styled.input`
  z-index: 1;
  height: 60px;
  margin-bottom: 4px;
  border: ${(props) =>
    props.error === "danger" ? "solid 2px #d43d3d " : "solid 1px #e3e4e8"};

  font-size: 18px;
  font-family: "Inter-Regular";
  color: #333;
  border-radius: 4px;
  box-shadow: none;
  word-spacing: ${(props) => props.dob && "-3px"};
  text-transform: ${(props) => props.capitalise && "capitalize"};
  &:focus,
  &:valid {
    padding: 20px 8px 5px 20px;

    & + label {
      font-family: "Inter-Medium";
      color: #107591;
      font-size: 12px;
      transform: translate3d(0, -10px, 0);
      & > span {
        font-size: 10px;
      }
    }
    @media only screen and (max-width: 767px) {
      padding: 20px 8px 5px 15px;
      height: 48px;
      font-size: 14px;
    }
  }
  @media only screen and (max-width: 767px) {
    padding: 20px 8px 5px 15px;
    height: 48px;
    font-size: 14px;
  }
  &:active,
  &:focus {
    border-radius: 4px;
    border-color: ${(props) =>
      props.error === "danger" ? "#d43d3d" : "#107591"};
    border-width: 2px;
    box-shadow: none;
    background-color: rgba(246, 246, 246, 0.2);
  }
`;
export const ErrorMessage = styled.span`
  position: relative;
  margin-top: 4px;
  display: block;
  color: #d43d3d;
  font-size: 14px;
  @media only screen and (max-width: 767px) {
    position: relative;
    padding-left: 0;
    font-size: 12px;
  }
`;
export const Label = styled.label`
  z-index: 0;
  width: 100%;
  height: 0;
  position: absolute;
  top: 17px;
  left: 20px;
  font-weight: 500;
  color: #333;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  font-size: 18px;
  font-family: "Inter-Regular";
  pointer-events: none;
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
  & span {
    font-size: 14px;
    vertical-align: middle;
  }
  @media (max-width: 767px) {
    top: 14px;
    left: 16px;
    font-size: 14px;
    width: 94%;
  }
`;
export const Container = styled.div`
  &:before,
  &:after {
    display: table;
    content: " ";
    clear: both;
  }
  line-height: 1.42857143;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 768px) {
    width: 750px;
  }
  @media (min-width: 992px) {
    width: 970px;
  }
  @media only screen and (max-width: 1199px) and (min-width: 992px) {
    width: 992px;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }
  @media only screen and (max-width: 767px) {
    padding: ${(props) => props.firstPage && "0"};
    margin-top: ${(props) => props.firstPage && "20px"};
  }
`;
