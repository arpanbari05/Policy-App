// TRY ADDING THE SCROLL TOP BEHAVIOR

import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import "styled-components/macro";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useTheme } from "../customHooks";
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
  onClick = () => {},
  onCopy,
  onKeyDown,
  onBlur,
  maxLength,
  member,
  onKeyPress,
  name,
  id,
}) => {
  const { colors } = useTheme();

  return (
    <div
      css={`
        ${styledCss}
        position: relative;
        & span {
          position: absolute;
          top: 11px;
          font-size: 28px;
          color: ${colors.primary_color};
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
        <label className="visually-hidden" htmlFor={id}>
          {label}
        </label>
        <Form.Control
          autoComplete={autoComplete}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onPaste={onPaste}
          onClick={onClick}
          onCopy={onPaste}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          maxLength={maxLength}
          onKeyPress={onKeyPress}
          name={name}
          id={id}
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
