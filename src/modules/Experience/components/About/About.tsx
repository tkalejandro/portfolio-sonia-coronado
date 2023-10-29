import React, { useRef, useState } from 'react'
import { useFrame, Vector3 } from '@react-three/fiber'
import { Text } from '@react-three/drei';
import { useControls } from 'leva';

interface AboutProps {
  position: Vector3
}

const About = ({ position }: AboutProps) => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState<boolean>(false)
  const [active, setActive] = useState<boolean>(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (meshRef.current) { // Check if meshRef.current is defined
      meshRef.current.rotation.x += delta
    }
  })
  

  return (
    <group
    position={position}
    >
      <mesh     
        ref={meshRef}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
      <Text
        position={[0, -1, 0]}
        scale={0.2}
      >
        Im About
      </Text>
    </group>
  )
}

export default About