import React, { useEffect, useRef, useState } from 'react';
import { Color, useFrame, Vector3 } from '@react-three/fiber';
import { Center, Text } from '@react-three/drei';
import { DangerEffect, InfoEffect, MovingFace, SuccessEffect, WarningEffect } from './components';
import { ThreeDButton } from '../../components';
import { useAppBreakpoints, useAppTheme } from '@/hooks';
import * as THREE from 'three';

import { Material, Mesh, MeshBasicMaterial, MeshStandardMaterial, Vector2 } from 'three';
import { fontLibrary } from '@/helpers';

interface AboutSceneProps {
  position: Vector3;
  scenePositionY: number;
}

const AboutScene = ({ position, scenePositionY }: AboutSceneProps) => {
  const theme = useAppTheme();
  const { isBigTablet } = useAppBreakpoints();

  const supportBackgroundRef = useRef<MeshBasicMaterial>(null);
  const primaryColor = theme.colors.primary.main;
  const successColor = theme.colors.success[900];
  const infoColor = theme.colors.info[900];
  const warningColor = theme.colors.warning[900];
  const dangerColor = theme.colors.danger[900];
  const [selectedColor, setSelectedColor] = useState<Color>(primaryColor);
  const [message, setMessage] = useState<string>(
    'Bet on the magic of music: Switch the track, feel the vibe!',
  );
  const [bgColor, setBgColor] = useState<Color>(theme.colors.background);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (supportBackgroundRef && supportBackgroundRef.current) {
      switch (selectedColor) {
        case successColor: {
          supportBackgroundRef.current.color = new THREE.Color(theme.colors.success[400]);
          break;
        }
        case infoColor: {
          console.log('I happen');
          supportBackgroundRef.current.color = new THREE.Color(theme.colors.info[200]);
          break;
        }
        case dangerColor: {
          supportBackgroundRef.current.color = new THREE.Color(theme.colors.danger[800]);
          break;
        }
        case warningColor: {
          setBgColor(theme.colors.background);
          supportBackgroundRef.current.color = new THREE.Color(theme.colors.warning[400]);
          break;
        }
        default:
          setBgColor(theme.colors.background);
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
    console.log(selectedColor);
    switch (selectedColor) {
      case successColor: {
        setMessage("You've hit the jackpot");
        setBgColor(theme.colors.success[900]);
        break;
      }
      case infoColor: {
        setMessage('Uncover the hidden beat:');
        setBgColor(theme.colors.background);
        break;
      }
      case dangerColor: {
        setMessage('Alert! Site under attack');
        setBgColor(theme.colors.primary.main);
        break;
      }
      case warningColor: {
        setMessage('Approach with caution soldier');
        setBgColor(theme.colors.background);
        break;
      }
      default:
        setMessage('Bet on the magic of music: Switch the track, feel the vibe!');
        setBgColor(theme.colors.background);
        break;
    }
  }, [selectedColor]);

  return (
    <>
      <group position={position} scale={0.6}>
        <Center disableX>
          <MovingFace selectedColor={selectedColor} scenePositionY={scenePositionY} />
          <Text fontSize={0.1} font={fontLibrary.montserrat.medium}>
            {message}
            <meshNormalMaterial />
          </Text>
          <group position={[0, -1, 0]}>
            <ThreeDButton
              onClick={() => selectButton(theme.colors.success['900'])}
              position={isBigTablet ? [-1.5, 0.5, 0] : [-0.7, 0.5, 0]}
              text="Succcess"
              color={selectedColor === successColor ? 'success' : 'primary'}
              size="xl"
            />

            <ThreeDButton
              onClick={() => selectButton(theme.colors.warning['900'])}
              position={isBigTablet ? [-0.5, 0.5, 0] : [0.7, 0.5, 0]}
              text="Warning"
              color={selectedColor === warningColor ? 'warning' : 'primary'}
              size="xl"
            />
            <ThreeDButton
              onClick={() => selectButton(theme.colors.danger['900'])}
              position={isBigTablet ? [0.5, 0.5, 0] : [-0.7, 0, 0]}
              text="Danger"
              color={selectedColor === dangerColor ? 'danger' : 'primary'}
              size="xl"
            />
            <ThreeDButton
              onClick={() => selectButton(theme.colors.info['900'])}
              position={isBigTablet ? [1.5, 0.5, 0] : [0.7, 0, 0]}
              text="Info"
              color={selectedColor === infoColor ? 'info' : 'primary'}
              size="xl"
            />
          </group>
        </Center>
      </group>
      {selectedColor !== primaryColor && (
        <mesh position={[0, 0, -1]}>
          <planeGeometry args={[50, 50]} />
          <meshBasicMaterial color={bgColor} ref={supportBackgroundRef} />
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
    </>
  );
};

export default AboutScene;
