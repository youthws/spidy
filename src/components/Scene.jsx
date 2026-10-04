      
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import CameraController from "./CameraController";

import WorldEnvironment from "./Environment";
import Spider from "./Spider";
import Moon from "./Moon";
import Skyline from "./Skyline";
import Helipad from "./Helipad";

export default function Scene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.25]}
      gl={{
        antialias: true,
        toneMappingExposure: 1.15,
      }}

      // ==========================================
      // CAMERA — START IN FRONT OF SPIDER-MAN
      // ==========================================
     camera={{
  position: [3, 2.2, 0.2],
  fov: 40,
  near: 0.1,
  far: 1000,
}}
    >

      {/* ================= NIGHT BACKGROUND ================= */}

      <color attach="background" args={["#02030a"]} />

      {/* ================= HDR ENVIRONMENT ================= */}

      <WorldEnvironment />

      {/* ================= NIGHT LIGHTING ================= */}

      <ambientLight intensity={0.55} />

      <directionalLight
        position={[0, 10, 10]}
        intensity={3.5}
        color="#d6e4ff"
        castShadow
      />

      <directionalLight
        position={[-8, 6, 6]}
        intensity={1.4}
        color="#7896c4"
      />

      <directionalLight
        position={[8, 6, 6]}
        intensity={1.4}
        color="#7896c4"
      />

      <directionalLight
        position={[0, 15, -15]}
        intensity={2}
        color="#9bbcff"
      />

      {/* ================= STARS ================= */}

      <Stars
        radius={300}
        depth={120}
        count={5000}
        factor={2.5}
        saturation={0}
        fade
        speed={0.15}
      />

      {/* ================= CITY ================= */}

      <Skyline />

      {/* ================= MOON ================= */}

      <Moon />

      {/* ================= HELIPAD ================= */}

      <Helipad />

      {/* ================= SPIDER-MAN ================= */}

      <Spider />

      {/* ================= CAMERA CONTROLLER ================= */}

      <CameraController />
     
      
   
<OrbitControls
  makeDefault

  enableRotate={true}
  enableZoom={false}
  enablePan={true}

  target={[-12, 1.5, -0.4]}

  // Vertical viewing
  minPolarAngle={Math.PI / 2.2}
  maxPolarAngle={Math.PI / 1.8}

  // Full 360°
  minAzimuthAngle={-Infinity}
  maxAzimuthAngle={Infinity}

  // Zoom
  minDistance={1.5}
  maxDistance={15}

  // Controls speed
  rotateSpeed={0.5}
  zoomSpeed={1.2}

  // Smoothness
  enableDamping={true}
  dampingFactor={0.08}
/>
    
  </Canvas>
  );
}