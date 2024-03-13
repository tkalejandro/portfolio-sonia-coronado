import React, { useRef, useState } from 'react';
import { useFrame, Vector3 } from '@react-three/fiber';
import { Center, Float, Text, Text3D, useGLTF } from '@react-three/drei';
import { soniaCoronado } from '@/constants';
import { fontLibrary } from '@/helpers';
import { TreeSpruce } from '../../models';
import { useControls } from 'leva';
import { useAppBreakpoints, useAppTheme } from '@/hooks';
import { Group, Mesh, PlaneGeometry } from 'three';
import * as THREE from 'three';

interface ContactSceneProps {
  position: Vector3;
}

/**
 * Shows the contact information
 * Refer this link for some help:
 * https://codesandbox.io/p/sandbox/text3d-alignment-x6obrb?file=%2Fsrc%2FApp.js
 * https://gero3.github.io/facetype.js/
 * https://threejs.org/docs/index.html?q=textg#examples/en/geometries/TextGeometry
 *
 */
const ContactScene = ({ position }: ContactSceneProps) => {
  const { email, phone } = soniaCoronado;
  const theme = useAppTheme();
  const { isTablet, isBigTablet } = useAppBreakpoints();

  const Land = () => {
    const fogRef = useRef<Mesh>(null);

    useFrame(({ scene }) => {
      // Manipulate fog properties
      scene.fog = new THREE.FogExp2(0x000000, 0.05); // Color, Density
    });

    return (
      <mesh
        receiveShadow
        castShadow
        ref={fogRef}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        position={[0, -1, 0]}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={theme.colors.success[500]} />
      </mesh>
    );
  };

  const Trees = () => {
    const bigTreeRef = useRef<Group>(null);
    const mediumTreeRef = useRef<Group>(null);

    useFrame((state, delta) => {
      if (bigTreeRef && bigTreeRef.current) {
        console.log('I happen??');
        bigTreeRef.current.position.x += 10;
      }
    });
    return (
      <group>
        <TreeSpruce
          ref={bigTreeRef}
          castShadow
          position={[isBigTablet ? -1.25 : isTablet ? -1 : -0.5, -0.98, 0]}
          scale={0.1}
          rotation={[0, -0.5, 0]}
        />
        <TreeSpruce
          ref={mediumTreeRef}
          castShadow
          position={[isBigTablet ? -0.3 : isTablet ? -0.2 : -0.1, -0.98, -1]}
          scale={0.1}
        />
      </group>
    );
  };
  return (
    <group position={position}>
      <Land />
      <Trees />
    </group>
  );
};

export default ContactScene;
