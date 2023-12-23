import { useAppTheme } from '@/hooks';
import { ChakraHtml } from '@/modules/Experience/components';
import { useAppSettings } from '@/store';
import { Button, Flex } from '@chakra-ui/react';
import { Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';

const Navigation = () => {
  const theme = useAppTheme();

  const navigationRef = useRef<HTMLDivElement>(null!);
  const [opacity, setOpacity] = useState<number>(0);
  const navigationLoaded = useAppSettings((state) => state.navigationLoaded);
  const setNavigationLoaded = useAppSettings((state) => state.setNavigationLoaded);

  useFrame((state, delta) => {
    if (opacity >= 0.99) {
      // Finish!;
      return;
    }

    const targetOpacity = 1; // Target opacity value
    const speed = 1.5; // Adjust the speed of the transition

    setOpacity((prevOpacity) => {
      const newOpacity = prevOpacity + (targetOpacity - prevOpacity) * delta * speed;
      navigationRef.current.style.opacity = newOpacity.toString();

      return newOpacity;
    });
  });

  useEffect(() => {
    if (!navigationLoaded) {
      setTimeout(() => {
        setNavigationLoaded(true);
      }, 250);
    }
  }, []);

  return (
    <>
      <Sparkles
        size={6}
        scale={[2, 1, 2]} // Scale of the area
        position-y={0}
        speed={0.2}
        color={theme.colors.secondary[100]}
        count={30}
      />
      <ChakraHtml ref={navigationRef} position={[0, 0.1, 0]}>
        <Flex minH="300px" height="30vh" justify="space-around" direction="column">
          <Button size="sm" colorScheme="primary">
            About
          </Button>
          <Button size="sm">Project and Awards</Button>
          <Button size="sm">Media Cover</Button>
          <Button size="sm">Audio Library</Button>
          <Button size="sm" colorScheme="secondary">
            Contact
          </Button>
        </Flex>
      </ChakraHtml>
    </>
  );
};

export default Navigation;
