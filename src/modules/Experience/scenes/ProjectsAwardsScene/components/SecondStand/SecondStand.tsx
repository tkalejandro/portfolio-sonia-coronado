import React, { useRef, useState } from 'react';
import { useFrame, Vector3 } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useControls } from 'leva';
import { TrophyCasey, TrophyCreativeTrio, TrophyJeremy } from '@/modules/Experience/models';
import { useAppBreakpoints } from '@/hooks';

const SecondStand = () => {
  // This reference will give us direct access to the mesh
  const trophyStand = useRef<THREE.Mesh>(null);
  const { isBigTablet } = useAppBreakpoints();
  const standControls = useControls('Trophy Second Stand', {
    standRotation: { value: [-0.1, -0.4, 0], step: 0.05 },
    standPosition: { value: [0.0, -1, 0], step: 0.05 },
  });
  return (
    <group
      position={isBigTablet ? [1, -1.3, 0] : standControls.standPosition}
      rotation={isBigTablet ? [0, -0.2, 0] : standControls.standRotation}
    >
      <TrophyCasey position={[-0.26, 0.305, 0]} />
      <TrophyJeremy position={[0.36, 0.05, 0]} scale={0.055} rotation={[0, Math.PI / 2, 0]} />
      <mesh ref={trophyStand}>
        <boxGeometry args={[1.6, 0.1, 0.7]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  );
};

export default SecondStand;
