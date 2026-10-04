import Scene from "./components/Scene";

import CinematicText from "./components/CinematicText";
import SpiderSidebar from "./components/SpiderSidebar";
import CinematicIntro from "./components/CinematicIntro";
import SceneCards from "./components/SceneCards";
import BackgroundMusic from "./components/BackgroundMusic";


import { ExperienceProvider } from "./components/ExperienceContext";

export default function App() {
  return (
    <ExperienceProvider>

      {/* 3D SCENE */}
      <Scene />

      {/* CINEMATIC TEXT */}
      <CinematicText />

      {/* SIDEBAR */}
      <SpiderSidebar />

      {/* INTRO */}
      <CinematicIntro />

      {/* VIDEO CARDS */}
      <SceneCards />

      {/* BACKGROUND MUSIC */}
      <BackgroundMusic />

    </ExperienceProvider>
  );
}