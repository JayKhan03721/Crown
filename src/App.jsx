import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  PresentationControls,
  ContactShadows,
  Float,
  Html,
  SoftShadows,
} from "@react-three/drei";
import { Suspense } from "react";

function CrownModel(props) {
  const { scene } = useGLTF("/Crown.glb");
  return <primitive object={scene} {...props} />;
}

function App() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 40, position: [4, 2, 6] }}
      style={{ position: "absolute", inset: 0, backgroundColor: "#0a0a0a" }}
    >
      {/* Smooth soft shadows for realism */}
      <SoftShadows size={20} samples={16} focus={1} />

      {/* Background */}
      <color attach="background" args={["#0a0a0a"]} />

      {/* Spotlight for that clean showroom glow */}
      <spotLight
        position={[5, 10, 5]}
        angle={0.35}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Fallback loader */}
      <Suspense fallback={<Html>Loading Toyota Crown...</Html>}>
        {/* Interaction controls */}
        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[0, 0]} // locks vertical rotation
          azimuth={[-Math.PI, Math.PI]} // full horizontal 360°
          config={{ mass: 2, tension: 200 }}
          snap
        >
          {/* Subtle float for elegance, with adjusted scale */}
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
            {/* Increase scale here to make the model larger */}
            <CrownModel scale={1} position={[0, -0.5, 0]} />
          </Float>
        </PresentationControls>

        {/* Soft floor shadow */}
        <ContactShadows
          position={[0, -0.7, 0]}
          opacity={0.55}
          scale={12}
          blur={2.5}
          far={1.6}
        />

        {/* Environment for reflection + realism */}
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
}

export default App;
