import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useExperience } from "./ExperienceContext";
import * as THREE from "three";

export default function ScrollCamera() {
  const scroll = useScroll();

  const { section } = useExperience();

  const targetPosition = new THREE.Vector3();
  const targetLookAt = new THREE.Vector3();

  useFrame((state) => {
    const rawOffset = scroll.offset;

    // =========================================
    // NORMAL SCROLL CAMERA
    // =========================================

    const offset =
      rawOffset * rawOffset * (3 - 2 * rawOffset);

    let x;
    let y;
    let z;

    if (offset < 0.25) {
      const t = offset / 0.25;

      x = THREE.MathUtils.lerp(-12, -11, t);
      y = THREE.MathUtils.lerp(2.2, 2.5, t);
      z = THREE.MathUtils.lerp(3.5, 4.5, t);
    } else if (offset < 0.5) {
      const t = (offset - 0.25) / 0.25;

      x = THREE.MathUtils.lerp(-11, -9, t);
      y = THREE.MathUtils.lerp(2.5, 3.2, t);
      z = THREE.MathUtils.lerp(4.5, 6, t);
    } else if (offset < 0.75) {
      const t = (offset - 0.5) / 0.25;

      x = THREE.MathUtils.lerp(-9, -7, t);
      y = THREE.MathUtils.lerp(3.2, 4.5, t);
      z = THREE.MathUtils.lerp(6, 8, t);
    } else {
      const t = (offset - 0.75) / 0.25;

      x = THREE.MathUtils.lerp(-7, -6, t);
      y = THREE.MathUtils.lerp(4.5, 5.5, t);
      z = THREE.MathUtils.lerp(8, 10, t);
    }

    // =========================================
    // SIDEBAR CAMERA POSITIONS
    // =========================================

    if (section === "home") {
      x = -12;
      y = 2.2;
      z = 3.5;
    }

    if (section === "suit") {
      x = -8;
      y = 2.8;
      z = 2.8;
    }

    if (section === "city") {
      x = -4;
      y = 6;
      z = 8;
    }

    if (section === "scenes") {
      x = 2;
      y = 4;
      z = 6;
    }

    // =========================================
    // MOVE CAMERA
    // =========================================

    targetPosition.set(x, y, z);

    state.camera.position.lerp(
      targetPosition,
      0.06
    );

    // =========================================
    // LOOK AT SPIDER-MAN
    // =========================================

    targetLookAt.set(0, 2, 0);

    state.camera.lookAt(targetLookAt);
  });

  return null;
}