import "./FileInput.css";
import React, { useRef, useContext, useCallback, useState } from "react";
import { FolderIcon } from "..";
import { TextContentContext } from "../../providers";

export const FileInput = ({
  accept,
  multiple,
  required,
  id = "",
  className = "",
  label = "",
  tabIndex = "0",
  onChange = () => null,
}) => {
  const input = useRef(0);
  const { getText } = useContext(TextContentContext);
  const [value, setValue] = useState([]);
  const onInputChange = useCallback(
    (event) => {
      setValue([...event.currentTarget.files]);
      onChange(event);
    },
    [onChange]
  );
  const countMessage = `${value.length} ${
    value.length === 1
      ? getText("mainPage.attached.file")
      : getText("mainPage.attached.files")
  }`;
  return (
    <div className={`file-input__container ${className}`} tabIndex={tabIndex}>
      <button
        className="file-input__button"
        onClick={() => input.current.click()}
      >
        <FolderIcon />
      </button>
      <span className="file-input__title_container">
        <span className="file-input__title_content">{label}</span>
      </span>
      <span className="file-input__count_container">
        <span className="file-input__count_content">{countMessage}</span>
      </span>
      <input
        ref={input}
        type="file"
        multiple={multiple}
        required={required}
        id={id}
        className="file-input__base"
        onChange={onInputChange}
        accept={accept}
      />
    </div>
  );
};
