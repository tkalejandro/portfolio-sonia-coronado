'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, ScrollControls } from '@react-three/drei';
import {
  AboutScene,
  AddMusicScene,
  AudioLibraryScene,
  ContactScene,
  MediaCoverageScene,
  WelcomeScene,
} from './scenes';
import ProjectsAwardsScene from './scenes/ProjectsAwardsScene/ProjectsAwardsScene';
import { Perf } from 'r3f-perf';
import { useAppSettings, useDeveloperSettings } from '@/store';
import { useControls } from 'leva';
import { DebugButton } from './components';
import { MainCamera } from './camera';
import { MainLight } from './lights';
import { SoundManager } from './sounds';
import { Loader } from './loader';

/**
 * Heart of the 3D App
 */
const Experience = () => {
  const debugMode = useDeveloperSettings((state) => state.debugMode);
  const navigationLoaded = useAppSettings((state) => state.experienceLoaded);
  const [distance, setDistance] = useState<number>(0);
  const [dpr, setDpr] = useState(1.5);
  const {
    welcomePosition,
    addMusicPosition,
    aboutPosition,
    projectsAwardsPosition,
    audioLibraryPosition,
    mediaCoveragePosition,
    contactPosition,
  } = useControls('Layout Location', {
    welcomePosition: { value: [0, 0, 0], step: 0.5 },
    addMusicPosition: { value: [0, -3.5, 0], step: 0.5 },
    aboutPosition: { value: [0, -6.5, 0], step: 0.5 },
    projectsAwardsPosition: { value: [0, -12, 0], step: 0.5 },
    audioLibraryPosition: { value: [0, -18, 0], step: 0.5 },
    mediaCoveragePosition: { value: [0, -22, 0], step: 0.5 },
    contactPosition: { value: [0, -30, 0], step: 0.5 },
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
    <>
      <div id="experience">
        <SoundManager>
          <Suspense fallback={<Loader />}>
            <Canvas flat dpr={dpr}>
              <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}>
                <ScrollControls
                  pages={scrollControls.pages}
                  distance={distance}
                  eps={scrollControls.eps}
                >
                  <MainCamera />
                  <MainLight />
                  {debugMode && <Perf position="top-left" />}
                  <WelcomeScene position={welcomePosition} />
                  <AddMusicScene position={addMusicPosition} />
                  <AboutScene
                    position={aboutPosition}
                    //We need the sum of all scenesY for the face.
                    scenePositionY={welcomePosition[1] + addMusicPosition[1]}
                  />
                  <ProjectsAwardsScene position={projectsAwardsPosition} />
                  <AudioLibraryScene position={audioLibraryPosition} />
                  <MediaCoverageScene position={mediaCoveragePosition} />
                  <ContactScene position={contactPosition} />
                </ScrollControls>
              </PerformanceMonitor>
            </Canvas>
          </Suspense>
        </SoundManager>
        <DebugButton />
      </div>
    </>
  );
};

export default Experience;
