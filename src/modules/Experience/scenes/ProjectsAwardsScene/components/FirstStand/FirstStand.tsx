import React, { useRef, useState } from 'react';
import { useFrame, Vector3 } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useControls } from 'leva';
import { TrophyCasey, TrophyCreativeTrio } from '@/modules/Experience/models';
import { useAppBreakpoints } from '@/hooks';

const FirstStand = () => {
  // This reference will give us direct access to the mesh
  const trophyStand = useRef<THREE.Mesh>(null);

  const { isBigTablet } = useAppBreakpoints();
  const standControls = useControls('Trophy First Stand', {
    standRotation: { value: [-0.05, 0.4, 0], step: 0.05 },
    standPosition: { value: [0, 0.3, 0], step: 0.05 },
  });

  return (
    <group
      position={isBigTablet ? [-1, -1.3, 0] : standControls.standPosition}
      rotation={isBigTablet ? [0, 0.2, 0] : standControls.standRotation}
    >
      <TrophyCreativeTrio position={[-0.6, 0.05, 0.14]} scale={1.8} />
      <TrophyCreativeTrio position={[-0.1, 0.05, 0.14]} scale={1.8} />

      <TrophyCasey position={[0.52, 0.305, 0]} rotation={[0, Math.PI / 2, 0]} />
      <mesh ref={trophyStand}>
        <boxGeometry args={[1.6, 0.1, 0.7]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  );
};

export default FirstStand;
