import { useAppTheme } from '@/hooks';
import { Shadow, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Noise } from '@react-three/postprocessing';
import React, { useRef } from 'react';
import { Mesh } from 'three';

const animationDuration = 10; // Duration of animation in seconds
const totalDistance = 1.4; /* Calculate the total distance to cover */
const speed = totalDistance / animationDuration;

const Sphere = ({ size = 1, amount = 50, color = 'white', ...props }) => {
  const sphereRef = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (sphereRef && sphereRef.current) {
      if (sphereRef.current.position.z > 1.4) {
        return;
      }
      sphereRef.current.position.z += speed * delta;
    }
    console.log(sphereRef.current?.position);
  });
  return (
    <mesh ref={sphereRef} {...props}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshPhysicalMaterial roughness={0} color={color} emissive={color} envMapIntensity={0.2} />
      <Sparkles count={amount} scale={size * 2} size={10 * size} speed={0.4} />
      <Shadow
        rotation={[-Math.PI / 2, 0, 0]}
        scale={size * 1.5}
        position={[0, -size, 0]}
        color="black"
        opacity={1}
      />
    </mesh>
  );
};

const WarningEffect = () => {
  const theme = useAppTheme();

  return (
    <>
      <Sphere color={theme.colors.danger[900]} size={0.15} amount={10} position={[-0.4, 0, -0.1]} />
      <Sphere color={theme.colors.warning[900]} size={0.15} amount={10} position={[0, 0, 0.2]} />
      <Sphere color={theme.colors.primary[900]} size={0.15} amount={10} position={[0.4, 0, -0.1]} />

      <EffectComposer>
        <Noise
          premultiply // enables or disables noise premultiplication
          //blendFunction={BlendFunction.ADD} // blend mode
        />
      </EffectComposer>
    </>
  );
};

export default WarningEffect;
