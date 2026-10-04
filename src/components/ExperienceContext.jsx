import { createContext, useContext, useState } from "react";

const ExperienceContext = createContext();

export function ExperienceProvider({ children }) {

  const [section, setSection] = useState("home");

  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <ExperienceContext.Provider
      value={{
        section,
        setSection,

        videoOpen,
        setVideoOpen,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  return useContext(ExperienceContext);
}