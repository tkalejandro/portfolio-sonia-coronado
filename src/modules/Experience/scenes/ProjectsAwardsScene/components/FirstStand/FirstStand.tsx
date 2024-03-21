import React, { useRef, useState } from 'react';

import { useControls } from 'leva';
import { TrophyCasey, TrophyCreativeTrio } from '@/modules/Experience/models';
import { useAppBreakpoints } from '@/hooks';
import { GameOnHover } from '@/enums/Experience';

interface FirstStandProps {
  setGameOnHover: (value: GameOnHover | undefined) => void;
}

const FirstStand = ({ setGameOnHover }: FirstStandProps) => {
  // This reference will give us direct access to the mesh
  const trophyStand = useRef<THREE.Mesh>(null);

  const { isBigTablet } = useAppBreakpoints();
  const standControls = useControls('Trophy First Stand', {
    standRotation: { value: [-0.05, 0.4, 0], step: 0.05 },
    standPosition: { value: [0, 0.3, 0], step: 0.05 },
  });

  return (
    <group
      position={isBigTablet ? [-1, -2, 0] : standControls.standPosition}
      rotation={isBigTablet ? [0, 0.2, 0] : standControls.standRotation}
    >
      <TrophyCreativeTrio
        position={[-0.6, 0.05, 0.14]}
        scale={1.8}
        glowOnHover
        onPointerEnter={() => setGameOnHover(GameOnHover.TLOU2_1)}
        onPointerLeave={() => setGameOnHover(undefined)}
      />
      <TrophyCreativeTrio
        position={[-0.1, 0.05, 0.14]}
        scale={1.8}
        glowOnHover
        onPointerEnter={() => setGameOnHover(GameOnHover.TLOU2_2)}
        onPointerLeave={() => setGameOnHover(undefined)}
      />

      <TrophyCasey
        position={[0.52, 0.305, 0]}
        rotation={[0, Math.PI / 2, 0]}
        glowOnHover
        onPointerEnter={() => setGameOnHover(GameOnHover.COD_1)}
        onPointerLeave={() => setGameOnHover(undefined)}
      />
      <mesh ref={trophyStand}>
        <boxGeometry args={[1.6, 0.1, 0.7]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  );
};

export default FirstStand;
