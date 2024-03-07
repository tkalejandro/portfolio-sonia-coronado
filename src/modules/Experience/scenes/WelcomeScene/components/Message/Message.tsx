import { fontLibrary } from '@/helpers';
import { useAppBreakpoints, useAppTheme } from '@/hooks';
import { useAppSettings } from '@/store';
import { Cloud, Clouds, Text, useAspect } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Flex, Box } from '@react-three/flex';
import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated, config } from '@react-spring/three';
import * as THREE from 'three';
const Message = () => {
  const theme = useAppTheme();
  const { isDesktop } = useAppBreakpoints();
  const { size } = useThree();
  const [vw, vh] = useAspect(size.width, size.height);
  const [opacity, setOpacity] = useState<number>(0);
  const experienceLoaded = useAppSettings((state) => state.experienceLoaded);

  useSpring({
    config: config.gentle,
    // Trick because TS number type problem.
    onChange: (props) => setOpacity(props.value.opacity),
    opacity: experienceLoaded ? 1 : 0,
  });

  const textScale = isDesktop ? 2 : 1;

  /**
   * Creates effect to work as opacity.
   */
  const opacityText = (text: string, font: string, scale: number, color: string) => {
    return (
      <Text maxWidth={18} font={font} scale={scale} color={color}>
        {text}
        <animated.meshPhongMaterial transparent opacity={opacity} />
      </Text>
    );
  };

  return (
    <group>
      <Flex
        centerAnchor
        flexDirection="column"
        justify={'center'}
        align={'flex-start'}
        size={[vw, vh, 1]}
        scale={0.95}
        marginLeft={isDesktop ? 1 : 0}
      >
        <Box centerAnchor marginBottom={0.05}>
          {opacityText(
            'Hello there!',
            fontLibrary.montserrat.regular,
            0.17 * textScale,
            theme.colors.primary.main,
          )}
        </Box>
        <Box centerAnchor marginBottom={0.075}>
          {opacityText(
            'Welcome to my musical world!',
            fontLibrary.montserrat.bold,
            0.105 * textScale,
            theme.colors.secondary[900],
          )}
        </Box>
        <Box centerAnchor marginBottom={0.075}>
          {opacityText(
            'Scroll down and Feel the cool tunes I made for you.',
            fontLibrary.montserrat.thin,
            0.1 * textScale,
            theme.colors.primary.main,
          )}
        </Box>
        <Box centerAnchor marginBottom={0.075}>
          {opacityText(
            'Enjoy the journey,',
            fontLibrary.montserrat.thin,
            0.1 * textScale,
            theme.colors.primary.main,
          )}
        </Box>
        <Box centerAnchor marginTop={0.075}>
          {opacityText(
            'Sonia',
            fontLibrary.montserrat.medium,
            0.1 * textScale,
            theme.colors.primary.main,
          )}
        </Box>
      </Flex>
      <Clouds material={THREE.MeshBasicMaterial}>
        <Cloud
          seed={0.75}
          opacity={opacity}
          //scale={1}
          segments={40}
          bounds={[10, 2, 2]}
          volume={10}
          speed={0.15}
          color={theme.colors.secondary[100]}
        />
        <Cloud
          opacity={opacity}
          seed={1}
          scale={2}
          volume={5}
          speed={0.15}
          color={theme.colors.success[500]}
          fade={100}
        />
      </Clouds>
    </group>
  );
};

export default Message;
