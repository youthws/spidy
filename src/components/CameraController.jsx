import { useFrame } from "@react-three/fiber";
import { useExperience } from "./ExperienceContext";
import * as THREE from "three";

export default function CameraController() {
  const { section } = useExperience();

  const targetPosition = new THREE.Vector3();
  const targetLookAt = new THREE.Vector3();

  useFrame((state) => {

    // =========================================
    // HOME
    // =========================================

    let x = -10;
    let y = 3;
    let z = 0.5;

    // =========================================
    // THE SUIT
    // EXTREME CLOSE-UP
    // =========================================

    if (section === "suit") {
      x = -6;
      y = 2;
      z = 1;
    }

    // =========================================
    // THE CITY
    // FAR CINEMATIC VIEW
    // =========================================

    if (section === "city") {
      x = 20;
      y = 2;
      z = -4;
    }

    // =========================================
    // SCENES
    // CAMERA STAYS FAR
    // VIDEO CARDS APPEAR
    // =========================================

    if (section === "scenes") {
      x = 5;
      y = 5;
      z = 12;
    }

    // =========================================
    // SMOOTH CAMERA MOVEMENT
    // =========================================

    targetPosition.set(x, y, z);

    state.camera.position.lerp(
      targetPosition,
      0.035
    );

    // =========================================
    // LOOK TARGET
    // =========================================

    if (section === "city") {
      targetLookAt.set(
        0,
        2,
        0
      );
    } else {
      targetLookAt.set(
        -12,
        1.5,
        -0.4
      );
    }

    state.camera.lookAt(targetLookAt);
  });

  return null;
}