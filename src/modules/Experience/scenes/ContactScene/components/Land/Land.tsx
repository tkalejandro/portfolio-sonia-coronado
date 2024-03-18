import { useAppTheme } from '@/hooks';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const Land = () => {
  const fogRef = useRef<THREE.Mesh>(null);
  const theme = useAppTheme();
  useFrame(({ scene }) => {
    // Manipulate fog properties
    scene.fog = new THREE.FogExp2(Number(theme.colors.grey.replace('#', '0x')), 0.15); // Color, Density
  });

  return (
    <mesh
      receiveShadow
      castShadow
      ref={fogRef}
      rotation={[-Math.PI / 2, 0, Math.PI]}
      position={[0, -1, 0]}
    >
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color={theme.colors.success[500]} />
    </mesh>
  );
};

export default Land;
