import { useScroll, Text } from '@react-three/drei';
import * as THREE from 'three'
import gsap from 'gsap';
import { useRef } from 'react';
import { cursorFragmentShader, cursorVertexShader } from '../../shaders/cursorShader';
import { fontLibrary, textureLibrary } from '@/helpers';
import { useFrame, useThree } from '@react-three/fiber';
import { useCursor } from './CursorManager';
import { theme } from '@/theme/theme';
import { insideCursorFragmentShader, insideCursorVertexShader } from '../../shaders/cursorShader/insideCursorShader';

const Cursor = () => {
  const { settings } = useCursor()
  const { viewport } = useThree()
  const scroll = useScroll();

  const ref = useRef<THREE.Mesh | any>()
  const insideRef = useRef<THREE.Mesh | any>()

  const windMap = new THREE.TextureLoader().load(textureLibrary.wind().map);
  windMap.wrapS = THREE.RepeatWrapping
  windMap.wrapT = THREE.RepeatWrapping
  const faceMap = new THREE.TextureLoader().load(textureLibrary.face().map);
  
  const torusGeometry = new THREE.TorusGeometry( 0.01, 1, 1.0, 10 ) 
  const torusMaterial = new THREE.ShaderMaterial({
    vertexShader: cursorVertexShader,
    fragmentShader: cursorFragmentShader,
    uniforms: {
      uTime: new THREE.Uniform(0),
      uPerlinTexture: new THREE.Uniform(windMap),
      uFull: new THREE.Uniform(1990.0)
    },
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false
  })
  const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial)
  
  useFrame((state, delta ) => {
    const elapsedTime = state.clock.getElapsedTime()

    const x = (state.pointer.x * viewport.width) / 2
    const y = (state.pointer.y * viewport.height) / 2
  
    let value = scroll.offset;
    
    if (!isFinite(value)) {
      //Fix the bug when the number is infinity.
      value = 0;
    }

    if(settings.hover) {
      gsap.to(ref.current.material.uniforms.uFull, { value: 2010.5, ease: 'power1.in', duration: 0.2 })
    }
     else {
      gsap.to(ref.current.material.uniforms.uFull, { value: 1990.0, ease: 'power1.out', duration: 0.2 })
    }
    
    if(ref.current)
      gsap.to(ref.current.material.uniforms.uTime, { value: elapsedTime } )

      if(settings.contact) {
        gsap.to(ref.current.rotation, { y: 0, x: 0, z: 0 , ease: "power2.in", duration: 0.1 })
        gsap.to(insideRef.current.rotation, { y: 0, x: 0, z: 0 , ease: "power2.in", duration: 0.1 })

      } else {
        gsap.to(ref.current.position, { y: (-value * 30.0) + y, x: x, z: 0, ease: "power2.in", duration: 0.01 })
        gsap.to(ref.current.rotation, { y: 0, x: 0, z:x + (-value * 30.0) + y , ease: "power2.in", duration: 0.1 })
        gsap.to(insideRef.current.rotation, { y: 0, x: 0, z: -(x + (-value * 30.0) + y) , ease: "power2.in", duration: 0.1 })
      }
    


  })
  
    return(
      <group>
          
        <primitive
          ref={ref}
          object={torusMesh}
          scale={[1 / 3, 1 / 3, 1 / 3]}
          position={[-3, -28.5, 0]}
        >
          
          {settings.contact ? <mesh ref={insideRef} >
            <planeGeometry args={[1, 1, 16 / (3 + 1), 64 / (3 + 1)]}/>
            <shaderMaterial
              vertexShader={insideCursorVertexShader}
              fragmentShader={insideCursorFragmentShader}
              uniforms={{
                uMap: new THREE.Uniform(faceMap)
              }}
              transparent={true}
            />
          </mesh>
          : <Text 
              position={[0, 0, 0]}
              ref={insideRef}
              fontSize={0.355}
              font={fontLibrary.montserrat.regular}
              color={theme.colors.primary.main}
            >
            {settings.text}
            </Text>}
        </primitive>

      </group>
        
    )
}

export default Cursor;