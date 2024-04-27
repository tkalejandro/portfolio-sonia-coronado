import { brightFragment, brightVertex } from '@/modules/Experience/shaders/brightShader';
import { useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import React, { useRef } from 'react';
import { ShaderMaterial } from 'three';

interface SucccessEffectProps {
  scenePositionY: number;
}

const SuccessEffect = ({ scenePositionY }: SucccessEffectProps) => {
  const brightShaderRef = useRef<ShaderMaterial>(null);

  useFrame((state, delta) => {
    if (brightShaderRef && brightShaderRef.current) {
      brightShaderRef.current.uniforms.uTime.value += delta * 0.25;
    }
  });

  return (
    <>
      <mesh scale={10} position={[0, 0, -0.5]}>
        <planeGeometry />
        <shaderMaterial
          ref={brightShaderRef}
          vertexShader={brightVertex}
          fragmentShader={brightFragment}
          transparent={true} // Enable transparency
          uniforms={{
            uTime: { value: 0 },
          }}
        />
      </mesh>

      <EffectComposer>
        <Bloom
          intensity={1.0} // The bloom intensity.
          blurPass={undefined} // A blur pass.
          luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
          mipmapBlur={false} // Enables or disables mipmap blur.
        />
      </EffectComposer>
    </>
  );
};

export default SuccessEffect;
