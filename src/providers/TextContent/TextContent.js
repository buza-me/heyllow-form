import React, { createContext, useCallback } from "react";
import entries from "./entries";

export const TextContentContext = createContext();

export const TextContentProvider = ({ children }) => {
  const getText = useCallback(
    (key = "") => (typeof entries[key] === "string" ? entries[key] : key),
    []
  );
  return (
    <TextContentContext.Provider value={{ getText }}>
      {children}
    </TextContentContext.Provider>
  );
};
