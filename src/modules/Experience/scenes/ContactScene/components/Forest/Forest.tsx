import { TreeSpruce } from '@/modules/Experience/models';
import { GroupProps, useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Group } from 'three';

interface ForestProps extends GroupProps {}

const Forest = React.memo(({ ...props }: ForestProps) => {
  const bigTreeRef = useRef<Group>(null);
  const mediumTreeRef = useRef<Group>(null);

  const smallTreeRef = useRef<Group>(null);
  const smallestTreeRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (
      bigTreeRef &&
      bigTreeRef.current &&
      mediumTreeRef &&
      mediumTreeRef.current &&
      smallTreeRef &&
      smallTreeRef.current &&
      smallestTreeRef &&
      smallestTreeRef.current
    ) {
      const time = state.clock.elapsedTime; // Get elapsed time

      // Apply different phase shifts to create variations in rotation speed
      const rotationFactorBig = Math.sin(time * 0.5);
      const rotationFactorMedium = Math.sin(time * 0.7);
      const rotationFactorSmall = Math.sin(time * 0.9);
      const rotationFactorSmallest = Math.sin(time * 1.1);
      // Apply different rotation speeds to each tree
      bigTreeRef.current.rotation.z = rotationFactorBig * 0.01;
      mediumTreeRef.current.rotation.z = rotationFactorMedium * 0.01;
      smallTreeRef.current.rotation.z = rotationFactorSmall * 0.01;
      smallestTreeRef.current.rotation.z = rotationFactorSmallest * 0.01;
    }
  });
  return (
    <group {...props}>
      <TreeSpruce
        ref={bigTreeRef}
        castShadow
        position={[0, -0.98, -0.2]}
        scale={0.12}
        rotation={[0, -0.5, 0]}
      />
      <TreeSpruce ref={mediumTreeRef} castShadow position={[-0.5, -0.98, -1]} scale={0.09} />
      <TreeSpruce
        ref={smallTreeRef}
        castShadow
        position={[0.7, -0.98, -0.75]}
        scale={0.08}
        rotation={[0, -0.5, 0]}
      />
      <TreeSpruce
        ref={smallestTreeRef}
        castShadow
        position={[0.2, -0.98, -1.2]}
        scale={0.06}
        rotation={[0, -1, 0]}
      />
    </group>
  );
});

export default Forest;
