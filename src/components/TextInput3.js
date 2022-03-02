// TRY ADDING THE SCROLL TOP BEHAVIOR
import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import styled from "styled-components/macro";

const TextInput3 = React.forwardRef(
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
      style,
      autoFocus,
    },
    ref,
  ) => (
    <div
      css={`
        ${styledCss}
        width: 100%;
        position: relative;
      `}
    >
      {label ? (
        <span
          className="position-absolute px-1"
          css={`
            top: 0;
            left: 8px;
            transform: translateY(-50%);
            font-size: 0.79em;
            z-index: 1;
            background-color: #fff;
            color: black;
          `}
        >
          {label}
        </span>
      ) : null}
      <CustomizedInput
        name={name}
        type={type}
        step="none"
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        onPaste={onPaste}
        onCopy={onPaste}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        maxLength={maxLength}
        ref={ref}
        style={style}
        autoFocus={autoFocus}
        placeholder={`Enter ${label}`}
      />
    </div>
  ),
);

export default TextInput3;

const CustomizedInput = styled.input`
  height: 65px;
  width: 100%;
  padding: 16px 10px;
  border-color: rgb(204, 204, 204);
  border-size: 1px;
  border-style: solid;
  border-radius: 4px;
  font-weight: 900;
`;
