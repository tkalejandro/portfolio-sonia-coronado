'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  AboutScene,
  AudioLibraryScene,
  ContactScene,
  LoaderScene,
  MediaCoverageScene,
  WelcomeScene,
} from './scenes';

import { Perf } from 'r3f-perf';
import { useDeveloperSettings } from '@/store';
import { DebugButton } from './components';

/**
 * Welcome to the TEST PAGE. Useful to build a 3D scene isolated from the project.
 * Once you finish, make sure it works in the real Experience.
 * Clean the TestExperience when finish.
 */
const TestExperience = () => {
  // ****** DONT DELETE
  const debugMode = useDeveloperSettings((state) => state.debugMode);
  // ******************

  return (
    <div id="experience">
      <Canvas>
        {debugMode && <Perf position="top-left" />}
        {/* ADD YOUR SCENE CONTROLS OR LIGHTS HERE */}

        <OrbitControls />
        <ambientLight />
        <AboutScene position={[0, 0, 0]} />

        {/* UNTIL HERE */}
      </Canvas>
      {/* DONT DELETE BUTTON */}
      <DebugButton />
    </div>
  );
};

export default TestExperience;