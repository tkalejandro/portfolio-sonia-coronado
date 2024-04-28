import React, { useEffect, useRef, useState } from 'react';
import { Color, Props, useFrame, Vector3 } from '@react-three/fiber';
import { Center, Text } from '@react-three/drei';
import { DangerEffect, InfoEffect, MovingFace, SuccessEffect, WarningEffect } from './components';
import { ThreeDButton } from '../../components';
import { useAppBreakpoints, useAppTheme } from '@/hooks';
import * as THREE from 'three';

import { Material, Mesh, MeshBasicMaterial, MeshStandardMaterial, Vector2 } from 'three';
import { fontLibrary } from '@/helpers';
import { ForwardRefComponent } from '@react-three/drei/helpers/ts-utils';

interface AboutSceneProps {
  position: Vector3;
  scenePositionY: number;
}

const AboutScene = ({ position, scenePositionY }: AboutSceneProps) => {
  const theme = useAppTheme();
  const { isBigTablet } = useAppBreakpoints();

  const supportBackgroundRef = useRef<MeshBasicMaterial>(null);
  const textRef = useRef<MeshStandardMaterial>(null);
  const primaryColor = theme.colors.primary.main;
  const successColor = theme.colors.success[900];
  const infoColor = theme.colors.info[900];
  const warningColor = theme.colors.warning[900];
  const dangerColor = theme.colors.danger[900];
  const [selectedColor, setSelectedColor] = useState<Color>(primaryColor);
  const [message, setMessage] = useState<string>(
    'Bet on the magic of music: Switch the track, feel the vibe!',
  );

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (supportBackgroundRef && supportBackgroundRef.current) {
      switch (selectedColor) {
        case successColor: {
          supportBackgroundRef.current.color = new THREE.Color(theme.colors.success[400]);
          break;
        }
        case infoColor: {
          supportBackgroundRef.current.color = new THREE.Color(theme.colors.info[200]);
          break;
        }
        case dangerColor: {
          supportBackgroundRef.current.color = new THREE.Color(theme.colors.danger[800]);
          break;
        }
        case warningColor: {
          supportBackgroundRef.current.color = new THREE.Color(theme.colors.warning[500]);
          break;
        }
        default:
          break;
      }
    }
    if (textRef && textRef.current) {
      switch (selectedColor) {
        case successColor: {
          textRef.current.color = new THREE.Color(theme.colors.success[900]);
          break;
        }
        case infoColor: {
          textRef.current.color = new THREE.Color(theme.colors.primary[100]);
          break;
        }
        case dangerColor: {
          textRef.current.color = new THREE.Color(theme.colors.danger[100]);
          break;
        }
        case warningColor: {
          textRef.current.color = new THREE.Color(theme.colors.danger[900]);
          break;
        }
        default:
          textRef.current.color = new THREE.Color(theme.colors.primary[400]);
          break;
      }
    }
  });

  const selectButton = (value: Color) => {
    if (value === selectedColor) {
      //Same color was selected
      setSelectedColor(primaryColor);
      return;
    }
    setSelectedColor(value);
  };

  useEffect(() => {
    switch (selectedColor) {
      case successColor: {
        setMessage("You've hit the jackpot");
        break;
      }
      case infoColor: {
        setMessage('Uncover the hidden beat:');
        break;
      }
      case dangerColor: {
        setMessage('Alert! Site under attack');
        break;
      }
      case warningColor: {
        setMessage('Approach with caution soldier');
        break;
      }
      default:
        setMessage('Bet on the magic of music: Switch the track, feel the vibe!');
        break;
    }
  }, [selectedColor]);

  return (
    <>
      <group position={position} scale={0.6}>
        <Center disableX>
          <MovingFace selectedColor={selectedColor} scenePositionY={scenePositionY} />
          <Text
            fontSize={0.1}
            font={fontLibrary.montserrat.medium}
            maxWidth={2.5}
            textAlign="center"
          >
            {message}
            <meshStandardMaterial ref={textRef} color={theme.colors.primary[400]} />
          </Text>
          <group position={[0, -1, 0]}>
            <ThreeDButton
              onClick={() => selectButton(successColor)}
              position={isBigTablet ? [-1.5, 0.5, 0] : [-0.7, 0.5, 0]}
              text="Succcess"
              color={selectedColor === successColor ? 'success' : 'primary'}
              size="xl"
            />

            <ThreeDButton
              onClick={() => selectButton(warningColor)}
              position={isBigTablet ? [-0.5, 0.5, 0] : [0.7, 0.5, 0]}
              text="Warning"
              color={selectedColor === warningColor ? 'warning' : 'primary'}
              size="xl"
            />
            <ThreeDButton
              onClick={() => selectButton(dangerColor)}
              position={isBigTablet ? [0.5, 0.5, 0] : [-0.7, 0, 0]}
              text="Danger"
              color={selectedColor === dangerColor ? 'danger' : 'primary'}
              size="xl"
            />
            <ThreeDButton
              onClick={() => selectButton(infoColor)}
              position={isBigTablet ? [1.5, 0.5, 0] : [0.7, 0, 0]}
              text="Info"
              color={selectedColor === infoColor ? 'info' : 'primary'}
              size="xl"
            />
          </group>
        </Center>
      </group>

      <group position={position}>
        {selectedColor !== primaryColor && (
          <mesh position={[0, 0, -1]}>
            <planeGeometry args={[50, 50]} />
            <meshBasicMaterial ref={supportBackgroundRef} />
          </mesh>
        )}
        {/* FOR SUCCESS  */}
        {selectedColor === successColor && <SuccessEffect />}
        {/* FOR INFO */}
        {selectedColor === infoColor && <InfoEffect />}
        {/* FOR WARNING */}
        {selectedColor === warningColor && <WarningEffect />}
        {/* FOR DANGER */}
        {selectedColor === dangerColor && <DangerEffect />}
      </group>
    </>
  );
};

export default AboutScene;
