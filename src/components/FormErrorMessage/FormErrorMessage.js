import "./FormErrorMessage.css";
import React from "react";

export const FormErrorMessage = ({ children, hidden, className }) => (
  <span
    className={`form-error-message__container ${className}`}
    hidden={hidden}
  >
    {children}
  </span>
);
