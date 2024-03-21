import React, { useRef, useState } from 'react';
import { Vector3 } from '@react-three/fiber';
import { FirstStand, Gallery, SecondStand } from './components';
import { GameOnHover } from '@/enums/Experience';

interface ProjectAwardsSceneProps {
  position: Vector3;
}

const ProjectsAwardsScene = ({ position }: ProjectAwardsSceneProps) => {
  //This will help with the logic to know what is selected.
  const [gameOnHover, setGameOnHover] = useState<GameOnHover | undefined>();
  return (
    <group position={position}>
      <FirstStand setGameOnHover={setGameOnHover} />
      <SecondStand setGameOnHover={setGameOnHover} />
      <Gallery gameOnHover={gameOnHover} />
    </group>
  );
};

export default ProjectsAwardsScene;
