import React, { useEffect, useRef, useState } from 'react';
import { Color, useFrame, Vector3 } from '@react-three/fiber';
import { Center, Text } from '@react-three/drei';
import { DangerEffect, InfoEffect, MovingFace, SuccessEffect, WarningEffect } from './components';
import { ThreeDButton } from '../../components';
import { useAppBreakpoints, useAppTheme } from '@/hooks';
import * as THREE from 'three';

import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Glitch,
  Noise,
  Scanline,
  Vignette,
} from '@react-three/postprocessing';
import { Vector2 } from 'three';

interface AboutSceneProps {
  position: Vector3;
  scenePositionY: number;
}

const AboutScene = ({ position, scenePositionY }: AboutSceneProps) => {
  const theme = useAppTheme();
  const { isBigTablet } = useAppBreakpoints();

  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null);

  const primaryColor = theme.colors.primary.main;
  const successColor = theme.colors.success[900];
  const infoColor = theme.colors.info[900];
  const warningColor = theme.colors.warning[900];
  const dangerColor = theme.colors.danger[900];
  const [selectedColor, setSelectedColor] = useState<Color>(primaryColor);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Check if meshRef.current is defined
      meshRef.current.rotation.x += delta;
    }
  });

  const selectButton = (value: Color) => {
    if (value === selectedColor) {
      //Same color was selected
      setSelectedColor(theme.colors.grey);
      return;
    }
    setSelectedColor(value);
  };

  return (
    <>
      <group position={position} scale={0.6}>
        <Center disableX>
          <MovingFace selectedColor={selectedColor} scenePositionY={scenePositionY} />
          <Text fontSize={0.1}>
            Bet on the magic of music: Switch the track, feel the vibe!
            <meshNormalMaterial />
          </Text>
          <group position={[0, -1, 0]}>
            <ThreeDButton
              onClick={() => selectButton(theme.colors.success['900'])}
              position={isBigTablet ? [-1.5, 0.5, 0] : [-0.7, 0.5, 0]}
              text="Succcess"
              color={selectedColor === successColor ? 'success' : 'primary'}
              size="xl"
            />

            <ThreeDButton
              onClick={() => selectButton(theme.colors.warning['900'])}
              position={isBigTablet ? [-0.5, 0.5, 0] : [0.7, 0.5, 0]}
              text="Warning"
              color={selectedColor === warningColor ? 'warning' : 'primary'}
              size="xl"
            />
            <ThreeDButton
              onClick={() => selectButton(theme.colors.danger['900'])}
              position={isBigTablet ? [0.5, 0.5, 0] : [-0.7, 0, 0]}
              text="Danger"
              color={selectedColor === dangerColor ? 'danger' : 'primary'}
              size="xl"
            />
            <ThreeDButton
              onClick={() => selectButton(theme.colors.info['900'])}
              position={isBigTablet ? [1.5, 0.5, 0] : [0.7, 0, 0]}
              text="Info"
              color={selectedColor === infoColor ? 'info' : 'primary'}
              size="xl"
            />
          </group>
        </Center>
      </group>
      {selectedColor !== primaryColor && (
        <mesh position={[0, 0, -1]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="purple" />
        </mesh>
      )}

      {/* FOR SUCCESS  */}
      {selectedColor === successColor && <SuccessEffect />}
      {/* FOR INFO */}
      {selectedColor === infoColor && <InfoEffect />}

      {/* FOR WARNING */}
      {selectedColor === warningColor && <WarningEffect />}

      {/* FOR DANGER */}
      {selectedColor === dangerColor && <DangerEffect />}
    </>
  );
};

export default AboutScene;
