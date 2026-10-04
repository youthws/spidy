import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const TEXTURE_PATH = `${import.meta.env.BASE_URL}textures/Moon.jpg`;

export default function Moon() {
  const texture = useLoader(
    THREE.TextureLoader,
    TEXTURE_PATH
  );

  return (
    <group position={[-20, 10, 20]}>

      {/* MAIN MOON */}
      <mesh>
        <sphereGeometry args={[1.2, 50, 40]} />

        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={0.35}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* SOFT MOON HALO */}
      <mesh scale={1.35}>
        <sphereGeometry args={[1.2, 64, 64]} />

        <meshBasicMaterial
          color="#b9ccff"
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* SECOND VERY SOFT HALO */}
      <mesh scale={1.8}>
        <sphereGeometry args={[1.2, 64, 64]} />

        <meshBasicMaterial
          color="#8faeff"
          transparent
          opacity={0.025}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* MOON LIGHT */}
      <pointLight
        intensity={1.8}
        distance={45}
        decay={2}
        color="#9dbaff"
      />

    </group>
  );
}