import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { useAsset } from "use-asset";
import useStore from "../../store";
import { Center, Plane, shaderMaterial } from "@react-three/drei";
import { vertexShader, fragmentShader } from "./shader";

// import { createAudio, startAudio } from "./utils";

const NoiseMaterial = shaderMaterial(
  {
    scale: 1.5,
    size: 0.2,
    density: 4.0,
    time: 0.0,
    bg: new THREE.Color("#000"),
    yellow: new THREE.Color("#cc0fe0"),
    orange: new THREE.Color("#fff"),
  },
  vertexShader,
  fragmentShader
);

extend({ NoiseMaterial });

function Data() {
  const material = useRef();

  useFrame(({ clock }) => {
    material.current.uniforms.time.value = Math.sin(
      (2 * Math.PI * clock.getElapsedTime()) / 360
    );
  });

  return (
    <Plane args={[13, 16]}>
      <noiseMaterial ref={material} side={THREE.DoubleSide} />
    </Plane>
  );
}
function Zoom() {
  // This will *not* re-create a new audio source, suspense is always cached,
  // so this will just access (or create and then cache) the source according to the url
  // const { data } = useAsset(() => createAudio(url), url);
  const { drums } = useStore((state) => state.audio);
  return useFrame((state) => {
    // Set the cameras field of view according to the frequency average
    if (!drums) {
      return;
    }
    state.camera.fov = 25 - drums.avg / 15;
    state.camera.updateProjectionMatrix();
  });
}

const Scene = () => {
  return (
    <Canvas
      dpr={window.devicePixelRatio}
      camera={{ position: new THREE.Vector3(0, 0, 15) }}
    >
      <Center>
        <Data />
        <Zoom />
      </Center>
    </Canvas>
  );
};

export default Scene;
