import React, { useRef, useState } from 'react';
import { useFrame, Vector3 } from '@react-three/fiber';
import { Center, Float, Text, Text3D, useGLTF } from '@react-three/drei';
import { soniaCoronado } from '@/constants';
import { fontLibrary } from '@/helpers';
import { TreeSpruce, WoodenSignIPoly3D } from '../../models';
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
      <Forest position={[isTablet ? 1.5 : 1, 0, -0.6]} rotation={[0, 0.25, 0]} />
      <group position={[0, -1, 0.75]} scale={0.55} rotation={[0, -0.25, 0]}>
        <WoodenSignIPoly3D />
        <Text scale={0.16} font={fontLibrary.montserrat.extraBold} position={[-0.14, 1.69, 0.025]}>
          LinkedIn
        </Text>
        <group position={[0, -0.03, 0]}>
          <Text scale={0.09} font={fontLibrary.montserrat.extraBold} position={[0.05, 1.37, 0.025]}>
            Sonia Coronado:
          </Text>
          <Text scale={0.05} font={fontLibrary.montserrat.extraBold} position={[0.05, 1.24, 0.025]}>
            {email}
          </Text>
          <Text scale={0.05} font={fontLibrary.montserrat.extraBold} position={[0.05, 1.12, 0.025]}>
            {phone}
          </Text>
        </group>
        <Text scale={0.16} font={fontLibrary.montserrat.extraBold} position={[0.03, 0.76, 0.025]}>
          Resume
        </Text>
      </group>
    </group>
  );
};

export default ContactScene;
