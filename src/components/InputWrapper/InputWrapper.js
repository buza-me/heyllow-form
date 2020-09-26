import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";

const InputWrapperBase = (
  { renderChildren, validators, required, childRefs = [] },
  ref
) => {
  const [meta, setMeta] = useState({
    value: "",
    isValid: true,
  });

  useImperativeHandle(ref, () => ({
    getMeta: () => {
      const newMeta = {
        ...meta,
        isValid: validate(meta.value),
      };
      setMeta(newMeta);
      return newMeta;
    },
    reset: () => {
      setMeta({
        value: "",
        isValid: true,
      });
      Object.values(childRefs).forEach((ref) => ref.current.reset());
    },
  }));

  const validate = useCallback(
    (value) => {
      return (
        (!required || !!value) &&
        (!validators ||
          !validators.length ||
          validators.some((validator) => validator(value)))
      );
    },
    [required, validators]
  );

  const changeListener = useCallback(
    (value) =>
      setMeta({
        ...meta,
        isValid: true,
        value,
      }),
    [meta]
  );

  const blurListener = useCallback(
    () =>
      setMeta({
        ...meta,
        isValid: validate(meta.value),
      }),
    [meta, validate]
  );

  const children = renderChildren({
    onChange: changeListener,
    onBlur: blurListener,
    getRefs: () => childRefs,
    meta,
  });

  return (
    <div ref={ref} className="main-page-form__input-wrapper">
      {children}
    </div>
  );
};

export const InputWrapper = forwardRef(InputWrapperBase);
