
import { useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { LoopOnce } from "three";

export default function Spider() {
  // Load the actual GLB
  const { scene, animations } = useGLTF("/models/spiderman.glb");

  const { actions } = useAnimations(animations, scene);

  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(0.5);

  // =========================
  // START ANIMATION
  // =========================
  useEffect(() => {
    console.log("SPIDER ANIMATIONS:", animations);

    console.log(
      "ANIMATION NAMES:",
      animations.map((animation) => animation.name)
    );

    const animationName = animations[0]?.name;

    if (!animationName) {
      console.log("NO SPIDER ANIMATION FOUND");
      return;
    }

    const action = actions[animationName];

    if (!action) {
      console.log("SPIDER ACTION NOT FOUND:", animationName);
      return;
    }

    // Start from beginning
    action.reset();

    // Animation speed
    action.timeScale = speed;

    // Play only once
    action.setLoop(LoopOnce, 1);

    // Stay at final frame
    action.clampWhenFinished = true;

    // Start animation
    action.play();

    return () => {
      action.stop();
    };
  }, [animations, actions]);

  // =========================
  // KEYBOARD CONTROLS
  // =========================
  useEffect(() => {
    const handleKeyDown = (event) => {
      const animationName = animations[0]?.name;

      if (!animationName) return;

      const action = actions[animationName];

      if (!action) return;

      // SPACE = PLAY / PAUSE
      if (event.code === "Space") {
        event.preventDefault();

        if (action.paused) {
          action.paused = false;
          setIsPlaying(true);
        } else {
          action.paused = true;
          setIsPlaying(false);
        }
      }

      // UP = SPEED UP
      if (event.code === "ArrowUp") {
        const newSpeed = Math.min(speed + 0.1, 2);

        action.timeScale = newSpeed;
        setSpeed(newSpeed);
      }

      // DOWN = SLOW DOWN
      if (event.code === "ArrowDown") {
        const newSpeed = Math.max(speed - 0.1, 0.1);

        action.timeScale = newSpeed;
        setSpeed(newSpeed);
      }

      // R = RESTART
      if (event.code === "KeyR") {
        action.reset();
        action.timeScale = speed;
        action.setLoop(LoopOnce, 1);
        action.clampWhenFinished = true;
        action.play();

        setIsPlaying(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [animations, actions, speed]);

  return (
    <primitive
      object={scene}
      position={[-12, -0.3, -0.2]}
      scale={0.60}
      rotation={[0, 1.5, 0]}
    />
  );
}

// Preload separately
useGLTF.preload("/models/spiderman.glb");

