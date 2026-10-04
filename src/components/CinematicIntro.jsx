import { useEffect, useState } from "react";
import "./CinematicIntro.css";

export default function CinematicIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="cinematic-intro">
      <div className="intro-glow" />
    </div>
  );
}