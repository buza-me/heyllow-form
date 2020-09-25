import "./Stepper.css";
import React from "react";
import { Step } from "../Step/Step";

export const Stepper = ({
  steps,
  activeStep,
  onStepChange,
  className = "",
  id = "",
}) => {
  const renderStep = (step, index, isActive) => (
    <Step onClick={() => onStepChange(step)} isActive={isActive}>
      {index + 1}
    </Step>
  );
  const renderSteps = () => {
    const activeStepIndex = steps.indexOf(activeStep);
    return steps.map((step, index) => (
      <li key={index} className="stepper__step-container">
        {renderStep(step, index, activeStepIndex === index)}
        {index !== steps.length - 1 ? (
          <div className="stepper__separator" />
        ) : null}
      </li>
    ));
  };
  return (
    <ul className={`stepper__container ${className}`} id={id}>
      {renderSteps()}
    </ul>
  );
};
