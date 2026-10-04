import { useEffect, useRef } from "react";
import { useExperience } from "./ExperienceContext";

export default function BackgroundMusic() {
  const { section } = useExperience();

  const audioRef = useRef(null);
  const wasPlayingRef = useRef(false);

  // =========================================
  // START MUSIC AFTER USER CLICKS
  // =========================================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const startMusic = () => {
      if (section === "scenes") return;

      audio
        .play()
        .then(() => {
          console.log("🎵 BACKGROUND MUSIC PLAYING");
        })
        .catch((error) => {
          console.log("AUDIO ERROR:", error);
        });

      window.removeEventListener("click", startMusic);
    };

    window.addEventListener("click", startMusic);

    return () => {
      window.removeEventListener("click", startMusic);
    };
  }, [section]);

  // =========================================
  // SCENES / NORMAL WEBSITE
  // =========================================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    // SCENES OPEN
    if (section === "scenes") {
      wasPlayingRef.current = !audio.paused;

      audio.pause();

      console.log("🎬 SCENES → MUSIC PAUSED");

      return;
    }

    // RETURN FROM SCENES
    if (wasPlayingRef.current) {
      audio
        .play()
        .then(() => {
          console.log("🎵 MUSIC RESUMED");
        })
        .catch(() => {
          console.log("Click page to resume music.");
        });
    }
  }, [section]);

  return (
    <audio
      ref={audioRef}
      src="/audio/background.mp3"
      loop
      preload="auto"
      volume={0.5}
    />
  );
}