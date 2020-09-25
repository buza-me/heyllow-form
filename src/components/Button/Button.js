import "./Button.css";

import React from "react";

export const Button = ({ children, className = "", onClick, type, value }) => (
  <button
    type={type}
    value={value}
    className={`button__container ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);
