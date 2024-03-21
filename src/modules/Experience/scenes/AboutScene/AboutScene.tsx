import React, { useRef, useState } from 'react';
import { Color, useFrame, Vector3 } from '@react-three/fiber';
import { Center, Text } from '@react-three/drei';
import { MovingFace } from './components';
import { ThreeDButton } from '../../components';
import { useAppBreakpoints, useAppTheme } from '@/hooks';

interface AboutSceneProps {
  position: Vector3;
  scenePositionY: number;
}

const AboutScene = ({ position, scenePositionY }: AboutSceneProps) => {
  const theme = useAppTheme();
  const { isBigTablet } = useAppBreakpoints();

  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null);
  const [selectedColor, setSelectedColor] = useState<Color>(theme.colors.primary.main);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Check if meshRef.current is defined
      meshRef.current.rotation.x += delta;
    }
  });

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
        <MovingFace selectedColor={selectedColor} scenePositionY={scenePositionY} />
        <Text fontSize={0.1}>
          Bet on the magic of music: Switch the track, feel the vibe!
          <meshNormalMaterial />
        </Text>
        <group position={[0, -1, 0]}>
          <ThreeDButton
            onClick={() => selectButton(theme.colors.success["900"])}
            position={isBigTablet ? [-1.5, 0.5, 0] : [-0.7, 0.5, 0]}
            text="Succcess"
            color={selectedColor === theme.colors.success.main ? 'success' : 'primary'}
            size="xl"
          />

          <ThreeDButton
            onClick={() => selectButton(theme.colors.warning["900"])}
            position={isBigTablet ? [-0.5, 0.5, 0] : [0.7, 0.5, 0]}
            text="Warning"
            color={selectedColor === theme.colors.warning.main ? 'warning' : 'primary'}
            size="xl"
          />
          <ThreeDButton
            onClick={() => selectButton(theme.colors.danger["900"])}
            position={isBigTablet ? [0.5, 0.5, 0] : [-0.7, 0, 0]}
            text="Danger"
            color={selectedColor === theme.colors.danger.main ? 'danger' : 'primary'}
            size="xl"
          />
          <ThreeDButton
            onClick={() => selectButton(theme.colors.info["900"])}
            position={isBigTablet ? [1.5, 0.5, 0] : [0.7, 0, 0]}
            text="Info"
            color={selectedColor === theme.colors.info.main ? 'info' : 'primary'}
            size="xl"
          />
        </group>
      </Center>
    </group>
  );
};

export default AboutScene;
