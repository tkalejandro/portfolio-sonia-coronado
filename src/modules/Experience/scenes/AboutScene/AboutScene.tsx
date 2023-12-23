import React, { useRef, useState } from 'react';
import { Color, useFrame } from '@react-three/fiber';
import { Center, Text } from '@react-three/drei';
import { MovingFace } from './components';
import { ThreeDButton } from '../../components';
import { useAppBreakpoints, useAppTheme } from '@/hooks';
import { Vector3 } from 'three';

interface AboutSceneProps {
  position: Vector3;
}

const AboutScene = ({ position }: AboutSceneProps) => {
  const theme = useAppTheme();
  const { isBigTablet } = useAppBreakpoints();

  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null);
  const [selectedColor, setSelectedColor] = useState<Color>(theme.colors.grey);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Check if meshRef.current is defined
      meshRef.current.rotation.x += delta;
    }
  });

  // const hitSound = audioLibrary.hit();
  // const dummyAudio = () => {
  //   hitSound.currentTime = 0;
  //   hitSound.volume = 1;
  //   hitSound.play();
  // };

  const selectButton = (value: Color) => {
    if (value === selectedColor) {
      //Same color was selected
      setSelectedColor(theme.colors.grey);
      return;
    }
    setSelectedColor(value);
  };
  return (
    <group position={position} scale={0.6}>
      <Center disableX>
        <MovingFace selectedColor={selectedColor} scenePositionY={position.y} />
        <Text fontSize={0.1}>
          Bet on the magic of music: Switch the track, feel the vibe!
          <meshNormalMaterial />
        </Text>
        <group position={[0, -1, 0]}>
          <ThreeDButton
            onClick={() => selectButton(theme.colors.success.main)}
            isSelected={selectedColor === theme.colors.success.main}
            position={isBigTablet ? [-1.5, 0.5, 0] : [-0.7, 0.5, 0]}
            text="Succcess"
            color="primary"
            size="xl"
          />

          <ThreeDButton
            onClick={() => selectButton(theme.colors.warning.main)}
            isSelected={selectedColor === theme.colors.warning.main}
            position={isBigTablet ? [-0.5, 0.5, 0] : [0.7, 0.5, 0]}
            text="Warning"
            color="primary"
            size="xl"
          />
          <ThreeDButton
            onClick={() => selectButton(theme.colors.danger.main)}
            isSelected={selectedColor === theme.colors.danger.main}
            position={isBigTablet ? [0.5, 0.5, 0] : [-0.7, 0, 0]}
            text="Danger"
            color="primary"
            size="xl"
          />
          <ThreeDButton
            onClick={() => selectButton(theme.colors.info.main)}
            isSelected={selectedColor === theme.colors.info.main}
            position={isBigTablet ? [1.5, 0.5, 0] : [0.7, 0, 0]}
            text="Info"
            color="primary"
            size="xl"
          />
        </group>
      </Center>
    </group>
  );
};

export default AboutScene;
