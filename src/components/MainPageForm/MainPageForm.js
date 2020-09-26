import "./MainPageForm.css";
import React, { useContext, useRef } from "react";
import { TextContentContext } from "../../providers";
import {
  Button,
  TextArea,
  Input,
  Label,
  FileInput,
  FormErrorMessage,
  InputWrapper,
} from "..";

export const MainPageForm = ({
  onSubmit = (value) => console.log(value),
  className = "",
  id = "",
}) => {
  const { getText } = useContext(TextContentContext);

  const formModel = {
    companyNameInput: {
      ref: useRef(null),
      validators: [],
      renderChildren: ({ onChange, meta }) => (
        <>
          <Label htmlFor="main-page-form__company-name-input">
            {getText("mainPage.inputTitle.companyName")}
          </Label>
          <Input
            id="main-page-form__company-name-input"
            placeholder={getText("mainPage.inputPlaceholder.text")}
            onChange={(e) => onChange(e.currentTarget.value)}
            value={meta.value}
          />
        </>
      ),
    },
    peopleCountInput: {
      ref: useRef(null),
      required: true,
      validators: [
        (value) => {
          return value.length && +value >= 1 && +value <= 99;
        },
      ],
      renderChildren: ({ onChange, onBlur, meta: { value, isValid } }) => (
        <>
          <Label htmlFor="main-page-form__people-count-input" required>
            {getText("mainPage.inputTitle.numOfPeople")}
          </Label>
          <Input
            placeholder={getText("mainPage.inputPlaceholder.number")}
            id="main-page-form__people-count-input"
            onChange={(e) => onChange(e.currentTarget.value)}
            onBlur={onBlur}
            type="number"
            value={value}
            error={!isValid}
          />
          <FormErrorMessage hidden={isValid}>
            {!value
              ? getText("mainPage.errorMessage.required")
              : getText("mainPage.errorMessage.numInput")}
          </FormErrorMessage>
        </>
      ),
    },
    businessAreaInput: {
      ref: useRef(null),
      validators: [],
      required: true,
      renderChildren: ({ onChange, onBlur, meta: { isValid, value } }) => (
        <>
          <Label htmlFor="main-page-form__business-area-input" required>
            {getText("mainPage.inputTitle.area")}
          </Label>
          <Input
            placeholder={getText("mainPage.inputPlaceholder.area")}
            id="main-page-form__business-area-input"
            onChange={(e) => onChange(e.currentTarget.value)}
            onBlur={onBlur}
            value={value}
            error={!isValid}
          />
          <FormErrorMessage hidden={isValid}>
            {getText("mainPage.errorMessage.required")}
          </FormErrorMessage>
        </>
      ),
    },
    descriptionInput: {
      ref: useRef(null),
      validators: [],
      required: true,
      renderChildren: ({ onChange, onBlur, meta: { value, isValid } }) => (
        <>
          <Label htmlFor="main-page-form__description-input" required>
            {getText("mainPage.inputTitle.description")}
          </Label>
          <TextArea
            placeholder={getText("mainPage.inputPlaceholder.text")}
            className="main-page-form__description-input"
            id="main-page-form__description-input"
            onChange={(e) => onChange(e.currentTarget.value)}
            onBlur={onBlur}
            value={value}
            error={!isValid}
          />
          <FormErrorMessage hidden={isValid}>
            {getText("mainPage.errorMessage.required")}
          </FormErrorMessage>
        </>
      ),
    },
    fileInput: {
      ref: useRef(null),
      validators: [],
      childRefs: {
        fileInputRef: useRef(null),
      },
      renderChildren: ({ onChange, getRefs }) => {
        const { fileInputRef } = getRefs();
        return (
          <FileInput
            ref={fileInputRef}
            id="main-page-form__file-input"
            onChange={(e) => onChange(e.currentTarget.files)}
            label={getText("mainPage.inputTitle.fileInput")}
          />
        );
      },
    },
  };

  const renderInput = (name) => {
    const { ref, validators, renderChildren, required, childRefs } = formModel[
      name
    ];
    return (
      <InputWrapper
        ref={ref}
        validators={validators}
        childRefs={childRefs}
        renderChildren={renderChildren}
        required={required}
      />
    );
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const detailedMeta = Object.entries(formModel).reduce(
      (acc, [key, { ref }]) => {
        const { isValid, value } = ref.current.getMeta();
        if (!isValid) {
          acc.hasError = true;
        }
        acc.refs.push(ref);
        acc.entries.push([key, value]);
        return acc;
      },
      { refs: [], entries: [], hasError: false }
    );
    if (!detailedMeta.hasError) {
      onSubmit(Object.fromEntries(detailedMeta.entries));
      detailedMeta.refs.forEach((ref) => ref.current.reset());
    }
  };

  return (
    <form
      className={`main-page-form__container ${className}`}
      id={id}
      onSubmit={onFormSubmit}
    >
      <div className="main-page-form__row-section">
        {renderInput("companyNameInput")}
        {renderInput("peopleCountInput")}
      </div>
      <div className="main-page-form__description-section">
        {renderInput("businessAreaInput")}
        {renderInput("descriptionInput")}
      </div>
      {renderInput("fileInput")}
      <Button type="submit" className="main-page-form__submit-button">
        {getText("mainPage.button.submit")}
      </Button>
    </form>
  );
};
