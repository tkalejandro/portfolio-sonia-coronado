import React, { useEffect, useRef, useState } from 'react';
import { extend, useFrame, useThree, Vector3 } from '@react-three/fiber'
import { mediaCardVertex, mediaCardFragment } from '../../../../shaders/mediaShader'
import * as THREE from 'three'
import { useTexture, Text, shaderMaterial } from '@react-three/drei';
import { Mesh } from 'three';

interface MediaProps {
  scale: Vector3;
  position: Vector3;
  title: string;
  image: string;
}


const MediaCard = ({scale, position, title, image}: MediaProps) => {
  const [hovered, setHover] = useState<boolean>(false)
  const [fixedElapse, setFixedElpase] = useState<number>(0)
  /**
   * TODO: Fix type issue.
   * - Using type Mesh alone throws
   * an error cuz uTime is type any
   * in line 39.
   */
  const ref = useRef<Mesh | any>(null!)
  const time = useRef<number>(0)
  const { viewport, size } = useThree()

  const WaveMaterial = shaderMaterial(
    {
      uTime: 0,
      uTexture: useTexture(image),
      resolution: new THREE.Vector2(),
      pointer: new THREE.Vector2(0.5, 0.5)
    },
    mediaCardVertex,
    mediaCardFragment
  )
  extend({ WaveMaterial })

  useFrame((state, delta) => {
    hovered ? ref.current.material.uTime = (state.clock.elapsedTime) : ref.current.material.uTime = fixedElapse
    time.current = state.clock.elapsedTime
  })

  /**
   * We will save the last elapsed time durring
   * the animation and save it so the image stay
   * fixed when mouving the mouse out of mesh
   * instead of returning to it's initial shape
   */

  useEffect(() => {
    setFixedElpase(time.current)
  }, [hovered])

  return (
    <group scale={scale} position={position}>
      <Text position={[-0.5, 0.75, 0] } scale={0.4} color={'red'}>{title}</Text>
      <mesh
        ref={ref}
        scale={[2, 1.2, 1]}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
      >
        <planeGeometry />
        {
          // TODO: Fix this.
          /* @ts-ignore */
          <waveMaterial
            key={WaveMaterial.key}
            resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
          />
        }
      </mesh>
    </group>

  )
}

export default MediaCard;