import "./Step.css";
import React from "react";

export const Step = ({ children, isActive, className = "", onClick }) => (
  <div
    className={`step__container ${isActive ? "active" : ""}${className}`}
    tabindex="0"
    onClick={onClick}
    onKeyPress={(evt) => evt.key === "Enter" && onClick()}
  >
    <span className="step__content">{children}</span>
  </div>
);
