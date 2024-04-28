'use client';
import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useSpring, config } from '@react-spring/three';
import { Perf } from 'r3f-perf';
import { useCamera, useDeveloperSettings } from '@/store';
import { DebugButton } from './components';
import { SoundManager } from './sounds';

/**
 * Welcome to the TEST PAGE. Useful to build a 3D scene isolated from the project.
 * Once you finish, make sure it works in the real Experience.
 * Clean the TestExperience when finish.
 */
const TestExperience = () => {
  // ****** DONT DELETE
  const debugMode = useDeveloperSettings((state) => state.debugMode);
  const cameraPosition = useCamera((state) => state.cameraPosition);
  // ******************
  const [active, setActive] = useState<boolean>(false);
  const [o, setO] = useState<number>(0.2);
  const { scale } = useSpring({
    config: config.wobbly,
    scale: active ? 1.5 : 1,
    onChange: (props) => setO(props.value.opacity),
    opacity: active ? 1 : 0.2,
  });
  const myMesh = useRef(null);

  return (
    <div id="experience">
      <SoundManager>
        <Canvas shadows>
          {debugMode && <Perf position="top-left" />}
          <PerspectiveCamera
            position={cameraPosition}
            makeDefault
            fov={90}
            aspect={1}
            near={0.1}
            far={4}
          />
          {/* ADD YOUR SCENE CONTROLS OR LIGHTS HERE */}

          {/* UNTIL HERE */}
        </Canvas>
      </SoundManager>
      {/* DONT DELETE BUTTON */}
      <DebugButton />
    </div>
  );
};

export default TestExperience;
