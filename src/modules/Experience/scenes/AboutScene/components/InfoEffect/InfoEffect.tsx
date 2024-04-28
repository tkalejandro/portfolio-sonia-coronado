import { useAppTheme } from '@/hooks';
import { FakeGlowMaterial } from '@/modules/Experience/components';
import { EffectComposer, Scanline } from '@react-three/postprocessing';
import React, { useRef } from 'react';
import { IFakeGlowMaterial } from '@/modules/Experience/components/FakeGlowMaterial/FakeGlowMaterial';
import { useFrame } from '@react-three/fiber';

const speed = 3.5;
const maxMinRange = 0.3;

const InfoEffect = () => {
  const theme = useAppTheme();
  const glowRef = useRef<IFakeGlowMaterial | null>(null!);

  useFrame((state) => {
    const clock = state.clock;

    if (glowRef && glowRef.current) {
      //Give the color intensity
      glowRef.current.uniforms.glowSharpness.value =
        Math.sin(clock.elapsedTime * speed) * maxMinRange;
      // Changes the radius
      glowRef.current.uniforms.glowInternalRadius.value =
        Math.sin(-clock.elapsedTime * speed) * maxMinRange;
    }
  });
  return (
    <>
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[1, 0.5, 0.125]} />
        <FakeGlowMaterial
          ref={glowRef}
          glowInternalRadius={1}
          glowSharpness={1.25}
          falloff={1.75}
          glowColor={theme.colors.primary.main}
        />
      </mesh>
      <EffectComposer>
        <Scanline
          density={2.25} // scanline density
        />
      </EffectComposer>
    </>
  );
};

export default InfoEffect;
