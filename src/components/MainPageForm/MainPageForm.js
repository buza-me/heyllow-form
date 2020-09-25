import "./MainPageForm.css";
import React, { useCallback, useState } from "react";

export const MainPageForm = ({ onSubmit }) => {
  const [formValue, setFormValue] = useState({});
  const onFormSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onSubmit(formValue);
    },
    [onSubmit, formValue]
  );
  return (
    <div className="main-page-form__container">
      <form className="main-page-form__form" onSubmit={onFormSubmit}></form>
    </div>
  );
};
