'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import {
  AboutScene,
  AudioLibraryScene,
  ContactScene,
  LoaderScene,
  MediaCoverageScene,
  ProjectsAwardsScene,
  WelcomeScene,
} from './scenes';

import { Perf } from 'r3f-perf';
import { useCamera, useDeveloperSettings } from '@/store';
import { DebugButton } from './components';
import { MainLight } from './lights';
import { Vector3 } from 'three';
import { MainCamera } from './camera';

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

  return (
    <div id="experience">
      <Canvas>
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
        {/* <MainLight />
        <OrbitControls /> */}

        {/* UNTIL HERE */}
      </Canvas>
      {/* DONT DELETE BUTTON */}
      <DebugButton />
    </div>
  );
};

export default TestExperience;
