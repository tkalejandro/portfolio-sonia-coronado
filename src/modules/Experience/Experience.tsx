'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import {
  AboutScene,
  AudioLibraryScene,
  ContactScene,
  LoaderScene,
  MediaCoverageScene,
  WelcomeScene,
} from './scenes';
import ProjectsAwardsScene from './scenes/ProjectsAwardsScene/ProjectsAwardsScene';
import { Perf } from 'r3f-perf';
import { useAppSettings, useCamera, useDeveloperSettings } from '@/store';
import { useControls } from 'leva';
import { DebugButton } from './components';
import { MainCamera } from './camera';
import { MainLight } from './lights';
import { Vector3 } from 'three';

/**
 * Heart of the 3D App
 */
const Experience = () => {
  const debugMode = useDeveloperSettings((state) => state.debugMode);
  const navigationLoaded = useAppSettings((state) => state.navigationLoaded);
  const [distance, setDistance] = useState<number>(0);
  const {
    welcomePosition,
    aboutPosition,
    projectsAwardsPosition,
    audioLibraryPosition,
    mediaCoveragePosition,
    contactPosition,
  } = useControls('Layout Location', {
    welcomePosition: { value: [0, 0, 0], step: 0.5 },
    aboutPosition: { value: [0, -3.5, 0], step: 0.5 },
    projectsAwardsPosition: { value: [0, -8, 0], step: 0.5 },
    audioLibraryPosition: { value: [0, -12, 0], step: 0.5 },
    mediaCoveragePosition: { value: [0, -16, 0], step: 0.5 },
    contactPosition: { value: [0, -20, 0], step: 0.5 },
  });

  useEffect(() => {
    if (!navigationLoaded) return;
    setDistance(1);
  }, [navigationLoaded]);

  const scrollControls = useControls('Scroll Controls', {
    pages: { value: 4, step: 0.1 },
    eps: { value: 0.00001, step: 0.00001 },
  });
  return (
    <div id="experience">
      <Canvas flat>
        <ScrollControls pages={scrollControls.pages} distance={distance} eps={scrollControls.eps}>
          <Suspense fallback={<LoaderScene />}>
            <MainCamera />
            <MainLight />
            {debugMode && <Perf position="top-left" />}
            <WelcomeScene position={welcomePosition} />
            <AboutScene
              position={new Vector3(aboutPosition[0], aboutPosition[1], aboutPosition[2])}
            />
            <ProjectsAwardsScene position={projectsAwardsPosition} />
            <AudioLibraryScene position={audioLibraryPosition} />
            <MediaCoverageScene position={mediaCoveragePosition} />
            <ContactScene position={contactPosition} />
          </Suspense>
        </ScrollControls>
      </Canvas>
      <DebugButton />
    </div>
  );
};

export default Experience;
