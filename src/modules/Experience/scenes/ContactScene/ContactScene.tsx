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
import { Forest, Land, Trees } from './components';

interface ContactSceneProps {
  position: Vector3;
}

/**
 * Shows the contact information
 */
const ContactScene = ({ position }: ContactSceneProps) => {
  const { email, phone } = soniaCoronado;
  const theme = useAppTheme();
  const { isTablet, isBigTablet } = useAppBreakpoints();

  return (
    <group position={position}>
      <Land />
      <Trees />
      <Forest position={[isTablet ? 1.5 : 1, 0, -0.7]} rotation={[0, 0.25, 0]} />
    </group>
  );
};

export default ContactScene;
