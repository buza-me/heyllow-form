import "./MainPage.css";
import React, { useContext, useState, useMemo, useRef } from "react";
import { TextContentContext } from "../../providers";
import { Stepper } from "../../components";
import { MainPageForm } from "../../components";

export const MainPage = () => {
  const { getText } = useContext(TextContentContext);
  const steps = useRef([
    { content: null },
    { content: null },
    { content: <MainPageForm /> },
  ]).current;
  const [currentStep, setCurrentStep] = useState(steps[steps.length - 1]);

  const header = useMemo(
    () => (
      <h1 className="main-page__container_header">
        {getText("mainPage.header")}
      </h1>
    ),
    [getText]
  );
  const stepper = useMemo(
    () => (
      <Stepper
        steps={steps}
        activeStep={currentStep}
        onStepChange={setCurrentStep}
      />
    ),
    [steps, currentStep]
  );
  return (
    <section className="main-page__container">
      {header}
      <main className="main-page__content">
        {stepper}
        {currentStep && currentStep.content}
      </main>
    </section>
  );
};
