import React, { useRef, useState } from 'react';
import { Vector3 } from '@react-three/fiber';
import { FirstStand, Gallery, SecondStand } from './components';
import { GameOnHover } from '@/enums/Experience';
import { useAppBreakpoints } from '@/hooks';

interface ProjectAwardsSceneProps {
  position: Vector3;
}

const ProjectsAwardsScene = ({ position }: ProjectAwardsSceneProps) => {
  //This will help with the logic to know what is selected.
  const [gameOnHover, setGameOnHover] = useState<GameOnHover | undefined>();

  const { isDesktop } = useAppBreakpoints();

  const glowOnClick = (value: GameOnHover) => {
    if (isDesktop) return;
    // Remove if there is something similar
    if (gameOnHover != null && gameOnHover === value) {
      setGameOnHover(undefined);
      return;
    }

    setGameOnHover(value);
  };

  return (
    <group position={position}>
      <FirstStand
        setGameOnHover={setGameOnHover}
        glowOnClick={glowOnClick}
        gameOnHover={gameOnHover}
      />
      <SecondStand
        setGameOnHover={setGameOnHover}
        glowOnClick={glowOnClick}
        gameOnHover={gameOnHover}
      />
      <Gallery gameOnHover={gameOnHover} />
    </group>
  );
};

export default ProjectsAwardsScene;
