import "./TextArea.css";
import React from "react";

export const TextArea = ({
  className = "",
  id = "",
  name = "",
  placeholder = "",
  required = false,
  onChange = () => null,
  onFocus = () => null,
  onBlur = () => null,
  value = "",
  error = false,
}) => (
  <textarea
    className={`textarea__content ${className}  ${error ? "error" : ""}`}
    id={id}
    name={name}
    placeholder={placeholder}
    required={required}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    value={value}
  ></textarea>
);
