import "./Step.css";
import React from "react";

export const Step = ({
  children,
  isActive,
  className = "",
  onClick,
  id = "",
}) => (
  <div
    className={`step__container ${isActive ? "active" : ""}${className}`}
    tabIndex="0"
    onClick={onClick}
    onKeyPress={(evt) => evt.key === "Enter" && onClick()}
    id={id}
  >
    <span className="step__content">{children}</span>
  </div>
);
