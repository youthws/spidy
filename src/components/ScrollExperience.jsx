import { useEffect } from "react";
import { useExperience } from "./ExperienceContext";

export default function ScrollExperience() {

  const {
    section,
    setSection,
    setScrollSection,
  } = useExperience();

  useEffect(() => {

    const handleWheel = (event) => {

      // Prevent tiny accidental movements
      if (Math.abs(event.deltaY) < 10) {
        return;
      }

      setScrollSection((current) => {

        let next = current;

        // Scroll DOWN
        if (event.deltaY > 0) {
          next = Math.min(current + 1, 3);
        }

        // Scroll UP
        if (event.deltaY < 0) {
          next = Math.max(current - 1, 0);
        }

        // =====================================
        // UPDATE SECTION
        // =====================================

        if (next === 0) {
          setSection("home");
        }

        if (next === 1) {
          setSection("suit");
        }

        if (next === 2) {
          setSection("city");
        }

        if (next === 3) {
          setSection("scenes");
        }

        return next;
      });

    };

    window.addEventListener(
      "wheel",
      handleWheel,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel
      );
    };

  }, [setSection, setScrollSection]);

  return null;
}