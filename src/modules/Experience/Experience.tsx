'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, Vector3 } from '@react-three/fiber';
import { PerformanceMonitor, ScrollControls } from '@react-three/drei';
import {
  AboutScene,
  AddMusicScene,
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
import { useAppBreakpoints } from '@/hooks';

/**
 * Heart of the 3D App
 */
const Experience = () => {
  const debugMode = useDeveloperSettings((state) => state.debugMode);
  const experienceLoaded = useAppSettings((state) => state.experienceLoaded);
  const [distance, setDistance] = useState<number>(0);
  const [dpr, setDpr] = useState(1.5);
  const { isBigTablet } = useAppBreakpoints();
  // const {
  //   //welcomePosition,
  //   //addMusicPosition,
  //   //aboutPosition,
  //   //projectsAwardsPosition,
  //   //mediaCoveragePosition,
  //   //contactPosition,
  // } = useControls('Layout Location', {
  //   welcomePosition: { value: [0, 0, 0], step: 0.5 },
  //   addMusicPosition: { value: [0, -3.5, 0], step: 0.5 },
  //   aboutPosition: { value: [0, -6.5, 0], step: 0.5 },
  //   projectsAwardsPosition: { value: [0, -12, 0], step: 0.5 },
  //   //audioLibraryPosition: { value: [0, -18, 0], step: 0.5 },
  //   mediaCoveragePosition: { value: [0, -18, 0], step: 0.5 },
  //   contactPosition: { value: [0, isBigTablet ? -25 : -30, 0], step: 0.5 },
  // });

  const welcomePosition: Vector3 = [0, 0, 0];
  const addMusicPosition: Vector3 = [0, isBigTablet ? -4 : -3.5, 0];
  const aboutPosition: Vector3 = [0, isBigTablet ? -8 : -6.5, 0];
  const projectsAwardsPosition: Vector3 = [0, isBigTablet ? -14 : -12, 0];
  const mediaCoveragePosition: Vector3 = [0, isBigTablet ? -20 : -18, 0];
  const contactPosition: Vector3 = [0, isBigTablet ? -30 : -30, 0];

  useEffect(() => {
    if (!experienceLoaded) return;
    setDistance(2);
  }, [experienceLoaded]);

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
                  pages={isBigTablet ? 4 : 6}
                  distance={distance}
                  eps={0.00001}
                  enabled={experienceLoaded}
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
                  {/* <AudioLibraryScene position={audioLibraryPosition} /> */}
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
