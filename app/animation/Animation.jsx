import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import React from "react";

function Character() {
  const { scene, animations } = useGLTF("/models/character.glb");
  const { actions } = useAnimations(animations, scene);

  // voorbeeld: speel eerste animatie automatisch af
  React.useEffect(() => {
    actions[Object.keys(actions)[0]]?.play();
  }, [actions]);

  return <primitive object={scene} />;
}

export default function Animation() {
  return (
    <Canvas>
      <ambientLight />
      <Character />
    </Canvas>
  );
}
