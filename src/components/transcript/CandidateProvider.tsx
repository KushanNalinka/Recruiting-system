import React, { createContext, useContext, useState } from "react";

const CandidateContext = createContext();

export const useCandidate = () => useContext(CandidateContext);

export const CandidateProvider = ({ children }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  return (
    <CandidateContext.Provider
      value={{ selectedCandidate, setSelectedCandidate }}
    >
      {children}
    </CandidateContext.Provider>
  );
};
