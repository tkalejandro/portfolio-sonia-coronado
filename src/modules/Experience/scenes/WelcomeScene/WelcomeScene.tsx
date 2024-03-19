import React, { useEffect, useRef, useState } from 'react';
import { useFrame, Vector3 } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { Group, ShaderMaterial } from 'three';
import { Message } from './components';
import { ThreeDButton } from '../../components';
import { Phase } from '@/enums/Experience';
import gsap from 'gsap';
import { loaderFragmentShader, loaderVertexShader } from '../../shaders/loaderShader';
import { useAppBreakpoints, useAppTheme } from '@/hooks';
import { useAppSettings } from '@/store';

interface WelcomeSceneProps {
  position: Vector3;
}

const WelcomeScene = ({ position }: WelcomeSceneProps) => {
  //Tweek! to keep distance factor and solve bug of button
  // 10 is default
  const [distanceFactor, setDistanceFactor] = useState<undefined | number>(10);
  const { isBigTablet, isTablet } = useAppBreakpoints();
  const theme = useAppTheme();

  const buttonRef = useRef<Group>(null!);
  const loaderShaderRef = useRef<ShaderMaterial>(null!);

  const phase = useAppSettings((state) => state.phase);
  const setPhase = useAppSettings((state) => state.setPhase);
  const setExperienceLoaded = useAppSettings((state) => state.setExperienceLoaded);

  // This trick works because this scene doest need to render again.
  // Normal react this is criminal but we are in R3F.
  let time = 0;

  useEffect(() => {
    if (!distanceFactor) return;
    setDistanceFactor(undefined);
  }, []);

  const playButton = () => {
    // Music experience starts at SoundManager
    setPhase(Phase.Playing);
  };

  useFrame((state, delta) => {
    if (phase === Phase.Playing) {
      if (time > 1) {
        setExperienceLoaded(true);
        return;
      }
      const s = delta * 1.3;

      time += s;
      if (buttonRef.current && buttonRef.current.scale != null) {
        // Additional null check to ensure buttonRef.current.scale is not null
        if (
          //buttonRef.current.scale.x >= 0 ||
          buttonRef.current.scale.y >= 0 ||
          buttonRef.current.scale.z >= 0
        ) {
          //buttonRef.current.scale.x -= s;
          buttonRef.current.scale.y -= s * 1.01;
          buttonRef.current.scale.z -= s;

          return;
        }

        buttonRef.current.scale.x = 0;
        buttonRef.current.scale.y = 0;
        buttonRef.current.scale.z = 0;
      }
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
      {/* Appears after some seconds */}
      <Message />
      <group position={position} ref={buttonRef}>
        <ThreeDButton
          text="Play"
          size="lg"
          onClick={playButton}
          color="primary"
          scale={isBigTablet ? [1.5, 1.5, 1] : [1.8, 1.8, 1]}
        />
      </group>
    </>
  );
};

export default WelcomeScene;
