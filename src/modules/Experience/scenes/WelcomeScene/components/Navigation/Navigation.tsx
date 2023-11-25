import { ChakraHtml } from '@/modules/Experience/components';
import { Button, Flex, useTheme } from '@chakra-ui/react';
import { Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useState } from 'react';

const Navigation = () => {
  const theme = useTheme();

  const htmlRef = useRef<HTMLDivElement>(null!);
  const [opacity, setOpacity] = useState<number>(0);

  useFrame((state, delta) => {
    if (opacity >= 0.99) {
      // Finish!
      return;
    }
    const targetOpacity = 1; // Target opacity value
    const speed = 1.5; // Adjust the speed of the transition

    setOpacity((prevOpacity) => {
      const newOpacity = prevOpacity + (targetOpacity - prevOpacity) * delta * speed;
      htmlRef.current.style.opacity = newOpacity.toString();

      return newOpacity;
    });
  });

  return (
    <>
      <Sparkles
        size={6}
        scale={[2, 1, 2]} // Scale of the area
        position-y={0}
        speed={0.2}
        color={theme.colors.primary.secondary}
        count={30}
      />
      <ChakraHtml ref={htmlRef} position={[0, 0.1, 0]}>
        <Flex minH="300px" height="30vh" justify="space-around" direction="column">
          <Button size="sm">About</Button>
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
