// TRY ADDING THE SCROLL TOP BEHAVIOR

import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import "styled-components/macro";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {useSelector} from 'react-redux'
const TextInput = ({
  label,
  type,
  placeholder,
  value,
  clear,
  autoComplete,
  styledCss,
  allValues,
  onChange,
  onPaste,
  onCopy,
  onKeyDown,
  onBlur,
  maxLength,
  member
}) => {
 
  const { theme } = useSelector((state) => state.frontendBoot);

  const { PrimaryColor, SecondaryColor, PrimaryShade } = theme;



  return (
    <div
      css={`
        ${styledCss}
        position: relative;
        & span {
          position: absolute;
          top: 11px;
          font-size: 28px;
          color: ${PrimaryColor};
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
        }
      `}
    >
      <FloatingLabel controlId="floatingInput" label={label}>
        <Form.Control
          autoComplete={autoComplete}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onPaste={onPaste}
          onCopy={onPaste}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          maxLength={maxLength}
        />
      </FloatingLabel>
      {value?.length > 1 && clear && (
        <span onClick={clear}>
          <AiOutlineCloseCircle />
        </span>
      )}
    </div>
  );
};

TextInput.defaultProps = {
  type: "text",
  label: "text",
  placeholder: "text",
};

export default TextInput;
