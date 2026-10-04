
import { useGLTF } from "@react-three/drei";

const MODEL_PATH = `${import.meta.env.BASE_URL}models/skyline.glb`;

export default function Skyline() {
  const { scene } = useGLTF(MODEL_PATH);

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child.material) {
        child.material = child.material.clone();

        // Night-time brightness
        // 0.70 = darker, but still keeps building details visible
        child.material.color.multiplyScalar(0.70);

        child.material.roughness = 0.9;
        child.material.metalness = 0;

        child.material.needsUpdate = true;
      }
    }
  });

  return (
    <primitive
      object={scene}
      position={[2.2, -12, -1]}
      rotation={[0, 0, 0]}
      scale={2}
    />
  );
}

useGLTF.preload(MODEL_PATH);