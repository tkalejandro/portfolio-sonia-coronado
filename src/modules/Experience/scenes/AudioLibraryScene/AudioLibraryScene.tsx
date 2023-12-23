import React, { useRef, useState } from 'react';
import { useFrame, Vector3 } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { AudioCover } from './components';
import { useAppBreakpoints, useAppTheme } from '@/hooks';

interface AudioLibrarySceneProps {
  position: Vector3;
}

const AudioLibraryScene = ({ position }: AudioLibrarySceneProps) => {
  const theme = useAppTheme();

  // The hook is reactive
  const { isTablet } = useAppBreakpoints();

  let margin = 1;
  switch (true) {
    case isTablet: {
      margin = 2;
      break;
    }
    default:
      margin = 1;
  }

  return (
    <group position={position}>
      <AudioCover position={[-1 * margin, 0, -1]} color={theme.colors.secondary[500]} />
      <AudioCover position={[-0.5 * margin, 0, -0.5]} color={theme.colors.primary[300]} />
      <AudioCover position={[0 * margin, 0, 0]} color={theme.colors.warning[300]} />
      <AudioCover position={[0.5 * margin, 0, -0.5]} color={theme.colors.danger[300]} />
      <AudioCover position={[1 * margin, 0, -1]} color={theme.colors.success[400]} />

      {/* //TODO - Should be a blender model?? */}
      <Text position={[0, -1.1, 0]} scale={0.2} color={theme.colors.primary.main}>
        Play
      </Text>
    </group>
  );
};

export default AudioLibraryScene;
