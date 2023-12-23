import React, { useRef } from 'react';
import { Color, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useControls } from 'leva';

interface MovingFaceProps {
  scenePositionY: number;
  selectedColor: Color;
}

const MovingFace = ({ scenePositionY, selectedColor }: MovingFaceProps) => {
  const faceRef = useRef<Mesh>(null!);

  const {
    positionIntensityX,
    positionIntensityY,
    rotationIntensityX,
    rotationIntensityY,
    positionY,
  } = useControls('Face', {
    positionIntensityX: { value: 1.1, step: 0.001, min: 0, max: 2 },
    positionIntensityY: { value: 0.5, step: 0.001, min: 0, max: 2 },
    lookAtIntensity: { value: 2, step: 0.001, min: 0, max: 10 },
    positionY: { value: 4 },
    rotationIntensityX: { value: 0.25, step: 0.001, min: 0.001, max: 2 },
    rotationIntensityY: { value: 0.2, step: 0.001, min: 0.001, max: 2 },
  });

  useFrame((state, delta) => {
    // Mouse coordinates from -1 to 1
    const mouse = state.pointer;

    const mouseX = mouse.x;
    const mouseY = mouse.y;

    // Update mesh position based on mouse position
    if (faceRef.current) {
      faceRef.current.position.x = mouseX * positionIntensityX;
      // ScenePositionY is to correct the position of the face.

      faceRef.current.position.y = scenePositionY + positionY + mouseY * positionIntensityY;

      // Make the face look at the mouse
      faceRef.current.rotation.x = -mouseY * rotationIntensityX;
      faceRef.current.rotation.y = mouseX * rotationIntensityY;
      //faceRef.current.lookAt(mouseX * lookAtIntensity, mouseY * lookAtIntensity, 20);
    }
  });

  return (
    <mesh ref={faceRef} position={[0, scenePositionY + positionY, -0.3]}>
      <planeGeometry args={[2, 3.5]} />
      <meshStandardMaterial color={selectedColor} />
    </mesh>
  );
};

export default MovingFace;
