import React, { useRef, useState } from 'react';
import { Vector3 } from '@react-three/fiber';
import { FirstStand, Gallery, SecondStand } from './components';

interface ProjectAwardsSceneProps {
  position: Vector3;
}

const ProjectsAwardsScene = ({ position }: ProjectAwardsSceneProps) => {
  // This reference will give us direct access to the mesh

  return (
    <group position={position}>
      <FirstStand />
      <SecondStand />
      <Gallery />
    </group>
  );
};

export default ProjectsAwardsScene;
