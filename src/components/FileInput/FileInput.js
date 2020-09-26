import "./FileInput.css";
import React, {
  useContext,
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { FolderIcon } from "..";
import { TextContentContext } from "../../providers";

const FileInputBase = (
  {
    accept,
    multiple,
    required,
    id = "",
    className = "",
    label = "",
    tabIndex = "0",
    onChange = () => null,
  },
  ref
) => {
  const inputRef = useRef(null);
  const { getText } = useContext(TextContentContext);
  const [value, setValue] = useState([]);
  const onInputChange = useCallback(
    (event) => {
      setValue([...event.currentTarget.files]);
      onChange(event);
    },
    [onChange]
  );
  useImperativeHandle(ref, () => ({
    reset: () => {
      setValue([]);
      inputRef.current.files = null;
    },
  }));
  const countMessage = `${value.length} ${
    value.length === 1
      ? getText("mainPage.attached.file")
      : getText("mainPage.attached.files")
  }`;
  return (
    <div
      className={`file-input__container ${className}`}
      tabIndex={tabIndex}
      ref={ref}
    >
      <button
        type="button"
        className="file-input__button"
        onClick={() => inputRef.current.click()}
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
        ref={inputRef}
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

export const FileInput = forwardRef(FileInputBase);
