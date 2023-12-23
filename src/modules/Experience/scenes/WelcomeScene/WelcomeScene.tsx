import React, { useEffect, useRef, useState } from 'react';
import { useFrame, Vector3 } from '@react-three/fiber';
import { Center, Float, Html, useProgress, useScroll } from '@react-three/drei';
import { GuitarModel } from '../../models';
import { Group, ShaderMaterial } from 'three';
import { Navigation } from './components';
import { Button } from '@chakra-ui/react';
import { ChakraHtml } from '../../components';
import { Phase } from '@/enums/Experience';
import { audioLibrary } from '@/helpers';
import gsap from 'gsap';
import { loaderFragmentShader, loaderVertexShader } from '../../shaders/loaderShader';
import { useAppTheme } from '@/hooks';

interface WelcomeSceneProps {
  position: Vector3;
}

const WelcomeScene = ({ position }: WelcomeSceneProps) => {
  //Tweek! to keep distance factor and solve bug of button
  // 10 is default
  const [distanceFactor, setDistanceFactor] = useState<undefined | number>(10);

  const theme = useAppTheme();

  const guitarRef = useRef<Group>(null!);
  const htmlRef = useRef<HTMLDivElement>(null!);
  const loaderShaderRef = useRef<ShaderMaterial>(null!);

  const [opacity, setOpacity] = useState<number>(1);
  const [action, setAction] = useState<Phase>(Phase.Ready);
  const [navigationOpen, setNavigationOpen] = useState<boolean>(false);

  const mainSound = audioLibrary.omnisphereExperiment();

  useEffect(() => {
    if (!distanceFactor) return;
    setDistanceFactor(undefined);
  }, []);

  const playButton = () => {
    mainSound.currentTime = 0;
    mainSound.volume = 1;
    mainSound.loop = true;

    mainSound.play();
    // Lets animate the guitar
    setAction(Phase.Playing);
  };

  useFrame((state, delta) => {
    // Rotate the guitar over time
    if (guitarRef.current == null) return;
    if (action === Phase.Playing) {
      if (htmlRef.current != null) {
        if (opacity !== 0) {
          // If user clicks the navigation lets dissapear the button quickly
          const targetOpacity = 0;
          const speed = 3;
          setOpacity((prevOpacity) => {
            const newOpacity = Math.max(prevOpacity - delta * speed, targetOpacity);
            htmlRef.current.style.opacity = newOpacity.toString();
            return newOpacity;
          });
        }
      }

      // This rotates 360 max
      if (guitarRef.current.rotation.y >= 6.24) {
        // This means just a little inclination to the left
        if (guitarRef.current.rotation.z >= 0.1) {
          // Our animation finished lets open the navigation
          if (navigationOpen) return;
          setNavigationOpen(true);
          return;
        }
        guitarRef.current.position.x -= delta * 0.1;
        guitarRef.current.rotation.z += delta * 0.1;
        return;
      }
      guitarRef.current.position.z -= delta * 0.09;
      guitarRef.current.position.x -= delta * 0.09;
      guitarRef.current.rotation.y += delta * 3.5;
    }
  });

  useScroll();

  // If the loaderShaderRef and HtmlRef
  // are loaded
  if (loaderShaderRef.current && htmlRef.current) {
    let animation = gsap.timeline();
    animation.to(loaderShaderRef.current.uniforms.uFull, {
      value: 1.01,
      duration: 1,
      ease: 'back.inOut',
    });
  }

  return (
    <>
      <mesh scale={5} position={[0, 0, 1]}>
        <planeGeometry />
        <shaderMaterial
          ref={loaderShaderRef}
          vertexShader={loaderVertexShader}
          fragmentShader={loaderFragmentShader}
          uniforms={{
            uFull: { value: -1.01 },
            uColor: { value: theme.colors.primary.main.replace('#', '0x') },
          }}
        />
      </mesh>

      <Center>
        <group position={position} scale={2}>
          <Float
            speed={2}
            rotationIntensity={navigationOpen ? 0.1 : 0}
            floatIntensity={navigationOpen ? 0.05 : 0}
            floatingRange={[-0.1, 0.1]}
          >
            <group ref={guitarRef}>
              <GuitarModel />
            </group>
          </Float>
          {navigationOpen ? (
            <>
              <Navigation />
            </>
          ) : (
            <>
              <ChakraHtml ref={htmlRef} occlude="blending" prepend center position={[0, -0.8, 0]}>
                <Button colorScheme="primary" onClick={playButton} size="lg" variant="solid">
                  Play
                </Button>
              </ChakraHtml>
            </>
          )}
        </group>
      </Center>
    </>
  );
};

export default WelcomeScene;
