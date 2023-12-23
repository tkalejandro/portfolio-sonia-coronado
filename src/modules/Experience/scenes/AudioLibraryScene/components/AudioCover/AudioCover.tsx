import { GroupProps, MeshProps } from '@react-three/fiber';
import React from 'react';

interface AudioCoverProps extends GroupProps {
  // Something goes here
  color: string;
}

/**
 * Generates a standard cover of an Audio
 * Please use this and extend the properties if needed.
 * This is to keep the standard
 */
const AudioCover = ({ color, ...props }: AudioCoverProps) => {
  return (
    <group {...props}>
      <mesh>
        <planeGeometry args={[0.9, 1.6]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

export default AudioCover;
