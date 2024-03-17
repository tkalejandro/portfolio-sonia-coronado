import { useAppBreakpoints } from '@/hooks';
import { TreeSpruce } from '@/modules/Experience/models';
import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import { Group } from 'three';

const Trees = () => {
  const bigTreeRef = useRef<Group>(null);
  const mediumTreeRef = useRef<Group>(null);
  const { isBigTablet, isTablet } = useAppBreakpoints();
  useFrame((state, delta) => {
    if (bigTreeRef && bigTreeRef.current && mediumTreeRef && mediumTreeRef.current) {
      const time = state.clock.elapsedTime; // Get elapsed time

      const rotationFactorBig = Math.sin(time * 0.7);
      const rotationFactorMedium = Math.sin(time * 0.9);

      bigTreeRef.current.rotation.z = rotationFactorBig * 0.015;
      mediumTreeRef.current.rotation.z = rotationFactorMedium * 0.02;
    }
  });

  return (
    <group>
      <TreeSpruce
        ref={bigTreeRef}
        castShadow
        receiveShadow
        position={[isBigTablet ? -1.25 : isTablet ? -1 : -0.5, -0.98, 0]}
        scale={0.1}
        rotation={[0, -0.5, 0]}
      />
      <TreeSpruce
        ref={mediumTreeRef}
        castShadow
        receiveShadow
        position={[isBigTablet ? -0.3 : isTablet ? -0.2 : -0.1, -0.98, -1]}
        scale={0.1}
      />
    </group>
  );
};

export default Trees;
