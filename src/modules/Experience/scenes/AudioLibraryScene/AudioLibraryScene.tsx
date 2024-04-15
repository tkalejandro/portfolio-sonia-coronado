import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useThree, Vector3 as VectorR3f } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { AudioCover } from './components';
import { useAppBreakpoints, useAppTheme } from '@/hooks';
import { Group, Vector3 } from 'three';
import { InvisibleMesh } from '../../components';

interface AudioLibrarySceneProps {
  position: VectorR3f;
}

const zPoint = 1.0;

const AudioLibraryScene = ({ position }: AudioLibrarySceneProps) => {
  const theme = useAppTheme();
  const [isTouchEnabled, setIsTouchEnabled] = useState(false);
  const { isBigTablet, isDesktop } = useAppBreakpoints();
  const audioListRef = useRef<Group>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 });
  const [cameraRotation, setCameraRotation] = useState({ x: 0, y: 0 });

  const { size } = useThree();
  const screenWidth = size.width / 100;

  useEffect(() => {
    const disableTouch = (event: any) => {
      event.preventDefault();
    };
    // Trick to make possible to simulate touch in mobile.
    if (!isDesktop && isTouchEnabled) {
      document.addEventListener('touchmove', disableTouch, { passive: false });
      return () => {
        document.removeEventListener('touchmove', disableTouch);
      };
    }
  }, [isDesktop, isTouchEnabled]);

  const handlePointerDown = (event: {
    stopPropagation: () => void;
    clientX: any;
    clientY: any;
  }) => {
    event.stopPropagation();
    setIsDragging(true);
    setInitialMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handlePointerMove = (event: { clientX: number; clientY: number }) => {
    if (!isDragging || !isTouchEnabled) return;

    const deltaX = event.clientX - initialMousePosition.x;
    const deltaY = event.clientY - initialMousePosition.y;

    setCameraRotation({
      x: cameraRotation.x + deltaY * 0.005,
      y: cameraRotation.y + deltaX * -0.005,
    });

    setInitialMousePosition({ x: event.clientX, y: event.clientY });
  };

  const dragFalse = () => {
    setIsDragging(false);
  };

  const handlePointerLeave = () => {
    setIsDragging(false);

    // document.body.style.cursor = 'default';
  };
  const handlePointerEnter = () => {
    document.body.style.cursor = 'grab';
  };

  const xRadius = isDesktop ? 1.75 : isBigTablet ? 1.5 : 1;
  const zRadius = isDesktop ? 0.75 : isBigTablet ? 0.65 : 1.8;
  const calculateCoverPositions = (numCovers: number, rotationAngle: number) => {
    const positions = [];
    const angleIncrement = (2 * Math.PI) / numCovers;

    for (let i = 0; i < numCovers; i++) {
      const angle = rotationAngle + i * angleIncrement;
      // Currently not a perfect circle but ellipsis.
      const x = Math.cos(angle) * zPoint * xRadius;
      const z = Math.sin(angle) * zPoint * zRadius;
      positions.push(new Vector3(x, 0, z));
    }

    return positions;
  };

  const audioCovers = [
    {
      name: 'Omnissphere Experiment',
      description: 'Some description',
      color: theme.colors.secondary.main,
    },
    {
      name: 'Omnissphere Experiment',
      description: 'Some description',
      color: theme.colors.danger.main,
    },
    {
      name: 'Omnissphere Experiment',
      description: 'Some description',
      color: theme.colors.success.main,
    },
    {
      name: 'Omnissphere Experiment',
      description: 'Some description',
      color: theme.colors.grey,
    },
    {
      name: 'Omnissphere Experiment',
      description: 'Some description',
      color: theme.colors.warning.main,
    },
  ];

  const rotationAngle = Math.PI / 2 + cameraRotation.y; // Adjusting for initial rotation
  const coverPositions = calculateCoverPositions(audioCovers.length, rotationAngle);

  return (
    <group position={position}>
      {/* Render audio covers with dynamic positions */}
      <InvisibleMesh
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={dragFalse}
        onPointerLeave={handlePointerLeave}
        // onPointerEnter={handlePointerEnter}
        invisibleSize={[screenWidth, 1.3, 0]}
        invisiblePosition={[0, 0, 0.85]}
      >
        <group position={[0, 0, -zPoint]} ref={audioListRef}>
          {audioCovers.map((cover, index) => (
            <AudioCover
              key={index}
              position={coverPositions[index].toArray()}
              name={cover.name}
              description={cover.description}
              color={cover.color}
            />
          ))}
        </group>
      </InvisibleMesh>

      {/* Text */}
      <Text
        position={[0, -1.1, 0]}
        scale={0.2}
        color={theme.colors.primary.main}
        onClick={() => {
          setIsTouchEnabled(!isTouchEnabled);
        }}
      >
        Play
      </Text>
    </group>
  );
};

export default AudioLibraryScene;
