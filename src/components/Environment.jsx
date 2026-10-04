import { Environment } from "@react-three/drei";

export default function WorldEnvironment() {
  return (
    <Environment
      files={"hdr/night_clouds.hdr"}
      background
      environmentIntensity={-0.50}
      backgroundIntensity={-0.10}
    />
  );
}