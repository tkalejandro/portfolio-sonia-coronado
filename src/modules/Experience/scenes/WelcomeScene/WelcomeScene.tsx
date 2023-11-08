import React, { useState } from 'react';
import { Vector3 } from '@react-three/fiber';
import { Center, Html, Text, useGLTF } from '@react-three/drei';
import { GuitarModel } from '../../models';

interface WelcomeSceneProps {
  position: Vector3;
}

const WelcomeScene = ({ position }: WelcomeSceneProps) => {
  return (
    <group position={position}>
      <Center>
        <Html occlude wrapperClass="play-button" position={[0, -0.75, 0]} scale={0}>
          Play
        </Html>
        <GuitarModel />
      </Center>
    </group>
  );
};

export default WelcomeScene;