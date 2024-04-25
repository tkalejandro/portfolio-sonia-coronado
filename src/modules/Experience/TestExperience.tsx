'use client';
import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  Float,
  MeshPortalMaterial,
  OrbitControls,
  PerspectiveCamera,
  useTexture,
  Image,
} from '@react-three/drei';
import {
  AboutScene,
  AddMusicScene,
  AudioLibraryScene,
  ContactScene,
  MediaCoverageScene,
  ProjectsAwardsScene,
  WelcomeScene,
} from './scenes';
import { useSpring, animated, config } from '@react-spring/three';
import { Perf } from 'r3f-perf';
import { useCamera, useDeveloperSettings } from '@/store';
import { DebugButton, ThreeDButton } from './components';
import { MainLight } from './lights';
import * as THREE from 'three';
import { MainCamera } from './camera';
import { Message } from './scenes/WelcomeScene/components';
import { imageLibrary } from '@/helpers';
import { Gallery } from './scenes/ProjectsAwardsScene/components';
import { SoundManager } from './sounds';
import { Mesh } from 'three';
import { Box, Flex } from '@react-three/flex';

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
          <MainLight />
          <ambientLight intensity={0.5} />
          {/* <ProjectsAwardsScene position={[0, 0, 0]} /> */}
          <AboutScene position={[0, 0, 0]} scenePositionY={-4} />
          {/* <Environment preset="sunset" /> */}
          <OrbitControls />
          {/* <animated.group scale={scale} onClick={() => setActive(!active)} ref={myMesh}>
            <animated.mesh>
              <boxGeometry />
              <meshStandardMaterial transparent opacity={o} />
            </animated.mesh>
          </animated.group> */}
          {/* <MediaCoverageScene position={[0, 0, 0]} /> */}
          {/* UNTIL HERE */}
        </Canvas>
      </SoundManager>
      {/* DONT DELETE BUTTON */}
      <DebugButton />
    </div>
  );
};

export default TestExperience;
