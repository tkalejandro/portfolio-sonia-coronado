import React, { useEffect, useRef, useState } from 'react';
import { useFrame, Vector3 } from '@react-three/fiber';
import { Center, Float, Html, useProgress, useScroll } from '@react-three/drei';
import { GuitarModel, Headphone } from '../../models';
import { Group, ShaderMaterial } from 'three';
import { Message } from './components';
import { Button } from '@chakra-ui/react';
import { ChakraHtml, ThreeDButton } from '../../components';
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

  const buttonRef = useRef<Group>(null!);
  const loaderShaderRef = useRef<ShaderMaterial>(null!);

  const [opacity, setOpacity] = useState<number>(1);
  const [action, setAction] = useState<Phase>(Phase.Ready);
  const [messageOpen, setMessageOpen] = useState<boolean>(false);

  // This trick works because this scene doest need to render again.
  // Normal react this is criminal but we are in R3F.
  let time = 0;

  const mainSound = audioLibrary.synthBase();
  const guitarSound = audioLibrary.guitars();
  useEffect(() => {
    if (!distanceFactor) return;
    setDistanceFactor(undefined);
  }, []);

  const playButton = () => {
    mainSound.currentTime = 0;
    mainSound.volume = 1;
    mainSound.loop = true;

    guitarSound.currentTime = 0;
    guitarSound.volume = 1;
    guitarSound.loop = true;

    mainSound.play();
    guitarSound.play();
    // Music experience starts
    setAction(Phase.Playing);
  };

  useFrame((state, delta) => {
    if (action === Phase.Playing) {
      if (time > 2) {
        setMessageOpen(true);
        return;
      }
      const s = delta;
      time += s * 1.3;
    }
  });

  useScroll();

  // If the loaderShaderRef and buttonRef
  // are loaded
  if (loaderShaderRef.current && buttonRef.current) {
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
      {messageOpen ? (
        <Message />
      ) : (
        <group position={position} ref={buttonRef}>
          <ThreeDButton text="Play" size="lg" onClick={playButton} color="primary" />
        </group>
      )}
    </>
  );
};

export default WelcomeScene;
