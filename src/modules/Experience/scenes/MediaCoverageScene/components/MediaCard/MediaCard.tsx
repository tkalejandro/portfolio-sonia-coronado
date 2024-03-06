import React, { useEffect, useRef, useState } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { mediaCardVertex, mediaCardFragment } from '../../../../shaders/mediaShader';
import * as THREE from 'three';
import { useTexture, Text, shaderMaterial } from '@react-three/drei';
import { Mesh } from 'three';
import { Box, Flex } from '@react-three/flex';
import { fontLibrary } from '@/helpers';
import { useAppBreakpoints, useAppTheme } from '@/hooks';
import { EnhancedGroup } from '@/modules/Experience/components';

interface MediaProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

const MediaCard = ({ title, image, description, url }: MediaProps) => {
  const [hovered, setHover] = useState<boolean>(false);
  const [fixedElapse, setFixedElpase] = useState<number>(0);
  const theme = useAppTheme();
  const { isDesktop } = useAppBreakpoints();
  /**
   * TODO: Fix type issue.
   * - Using type Mesh alone throws
   * an error cuz uTime is type any
   * in line 39.
   */
  const ref = useRef<Mesh | any>(null);
  const time = useRef<number>(0);
  const { viewport, size } = useThree();

  const WaveMaterial = shaderMaterial(
    {
      uTime: 0,
      uTexture: useTexture(image),
      resolution: new THREE.Vector2(),
      pointer: new THREE.Vector2(0.5, 0.5),
    },
    mediaCardVertex,
    mediaCardFragment,
  );
  extend({ WaveMaterial });

  useFrame((state, delta) => {
    hovered || !isDesktop
      ? (ref.current.material.uTime = state.clock.elapsedTime)
      : (ref.current.material.uTime = fixedElapse);
    time.current = state.clock.elapsedTime;
  });

  /**
   * We will save the last elapsed time durring
   * the animation and save it so the image stay
   * fixed when mouving the mouse out of mesh
   * instead of returning to it's initial shape
   */

  useEffect(() => {
    setFixedElpase(time.current);
  }, [hovered]);

  const openNewTab = () => {
    window.open(url, '_blank');
  };

  return (
    <EnhancedGroup onClick={openNewTab}>
      <Box
        centerAnchor
        dir="column"
        margin={0.1}
        scale={0.95}
        justify="flex-start"
        align="flex-start"
      >
        <Box marginBottom={0.05} centerAnchor>
          <Text
            position={[-0.859, 0, 0]}
            textAlign="left"
            maxWidth={20}
            scale={0.12}
            font={fontLibrary.montserrat.bold}
            color={theme.colors.secondary[900]}
          >
            {title}
          </Text>
        </Box>
        <Box centerAnchor>
          <Text
            position={[-0.859, 0, 0]}
            textAlign="left"
            maxWidth={20}
            scale={0.06}
            font={fontLibrary.montserrat.light}
            color={theme.colors.grey}
          >
            {description}
          </Text>
        </Box>
        <Box marginTop={0.75}>
          <mesh
            ref={ref}
            onPointerEnter={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
          >
            <planeGeometry args={[1.8, 1.2, 1]} />
            {
              // TODO: Fix this.
              /* @ts-ignore */
              <waveMaterial
                key={WaveMaterial.key}
                resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
              />
            }
          </mesh>
        </Box>
      </Box>
    </EnhancedGroup>
  );
};

export default MediaCard;
