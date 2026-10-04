
import { useGLTF } from "@react-three/drei";

const MODEL_PATH = `${import.meta.env.BASE_URL}models/helipad.glb`;

export default function Helipad() {
  const { scene } = useGLTF(MODEL_PATH);

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child.material) {
        child.material = child.material.clone();

        // Night-time darkness
        child.material.color.multiplyScalar(0.8);

        child.material.roughness = 0.9;
        child.material.metalness = 0;

        child.material.needsUpdate = true;
      }
    }
  });

  return (
    <primitive
      object={scene}
      position={[-12, -0.9, -0.50]}
      rotation={[0, 0, 0]}
      scale={0.14}
    />
  );
}

useGLTF.preload(MODEL_PATH);
