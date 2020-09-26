import "./MainPage.css";
import React, { useContext, useState, useMemo } from "react";
import { TextContentContext } from "../../providers";
import { Stepper } from "../../components";
import { MainPageForm } from "../../components";

export const MainPage = () => {
  const { getText } = useContext(TextContentContext);
  const steps = useMemo(
    () => [
      { content: <h2>Ola!</h2> },
      { content: <h2>Hey!</h2> },
      { content: <MainPageForm /> },
    ],
    []
  );
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
        className="main-page__stepper"
      />
    ),
    [steps, currentStep]
  );
  return (
    <section className="main-page__container">
      {header}
      <main className="main-page__content">
        {stepper}
        <div className="main-page__step-content">
          {currentStep && currentStep.content}
        </div>
      </main>
    </section>
  );
};
