// import '@/theme/globals.css';
import { Html, shaderMaterial, useScroll, Text } from '@react-three/drei';
import './cursor.css'
import * as THREE from 'three'
import gsap from 'gsap';
import { easeIn, easeInOut } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cursorFragmentShader, cursorVertexShader } from '../../shaders/cursorShader';
import { fontLibrary, textureLibrary } from '@/helpers';
import { NormalBufferAttributes } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useCursor } from './CursorManager';
import { theme } from '@/theme/theme';

const Cursor = () => {
    // const circleRef = useRef<THREE.ShaderMaterial>(null)
    // const circleRef = useRef<THREE.Mesh>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { color, hover, text } = useCursor()
    console.log(hover)
    const { viewport } = useThree()
  // viewport = canvas in 3d units (meters)

  const ref = useRef<THREE.Mesh | any>()
  const textRef = useRef<THREE.Mesh | any>()
  const scroll = useScroll();

  const windMap = new THREE.TextureLoader().load(textureLibrary.wind().map);
  windMap.wrapS = THREE.RepeatWrapping
  windMap.wrapT = THREE.RepeatWrapping

  let divide = 3
  
  const planeGeometry = new THREE.PlaneGeometry(1, 1, 16 / (divide + 1), 64 / (divide + 1))
  // const circleGeometry = new THREE.CircleGeometry(0.5, 50, 0, Math.PI )
  // const torusGeometry = new THREE.TorusGeometry( 0.05, 3, 16, 100 ) 
  const torusGeometry = new THREE.TorusGeometry( 0.01, 1, 1.0, 10 ) 

  const planeMaterial = new THREE.ShaderMaterial({
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
  const planeMesh = new THREE.Mesh(torusGeometry, planeMaterial)

  if(ref.current) {
    // @ts-ignore
    ref.current.position.z = 0.5
    // console.log(ref.current)
    
  }
  
  useFrame((state, delta ) => {
    const elapsedTime = state.clock.getElapsedTime()

    const x = (state.pointer.x * viewport.width) / 2
    const y = (state.pointer.y * viewport.height) / 2
    // setPosition({x:x, y:y})
    // @ts-ignore
    // ref.current.position.setX(x)
    
    let value = scroll.offset;
    if (!isFinite(value)) {
      //Fix the bug when the number is infinity.
      value = 0;
    }
    // @ts-ignore
    // ref.current.position.y = (-value * 30.0) + y

    if(hover) {
      gsap.to(ref.current.material.uniforms.uFull, { value: 2010.5, ease: 'power1.in', duration: 0.2 })
      // console.log('hover')
      // gsap.to(ref.current.position, { z: 0.5, ease: 'power1.in', duration: 0.01 })
      // ref.current.position.z = 0.5
      
    }
     else {
      // gsap.to(ref.current.position, { z: 0, ease: 'power1.in', duration: 0.01 })
      // ref.current.position.z = 0
      gsap.to(ref.current.material.uniforms.uFull, { value: 1990.0, ease: 'power1.out', duration: 0.2 })
      // console.log('not hover')
    }
    
    if(ref.current)
      // gsap.to(".view", { left:  (-value * 30.0) + y, top: x, ease: "power2.in", duration: 0.1 })
    gsap.to(ref.current.position, { y: (-value * 30.0) + y, x: x, ease: "power2.in", duration: 0.01 })
    // gsap.to(textRef.current.position, { y: (-value * 30.0) + y, x: x, ease: "power2.in", duration: 0.01 })
    gsap.to(textRef.current.rotation, { y: 0, x: 0, z: -(x + (-value * 30.0) + y) , ease: "power2.in", duration: 0.1 })
      gsap.to(ref.current.rotation, { y: 0, x: 0, z:x + (-value * 30.0) + y , ease: "power2.in", duration: 0.1 })
      gsap.to(ref.current.material.uniforms.uTime, { value: elapsedTime } )
    // if(htmlRef.current)
      // document.addEventListener('scroll', () => {
      //   gsap.to(".text", { top:  value, ease: "power2.in", duration: 0.1 })
      // })
    


  })
  
    return(
      <group  
        // position={[0, 0, 0.8]} 
      >

         <primitive
          ref={ref}
          object={planeMesh}
          scale={[1 / divide, 1 / divide, 1 / divide]}
          
        >
          {/* <Html ref={htmlRef} className='view' 
          style={{
            // left: `${position.x}px`,
            // top: `${position.y}px`
          }}
          >
            <h1>View</h1>
          </Html> */}
          {/* <mesh ref={textRef} rotation={[0, 0, 0]}>
            <planeGeometry args={[1, 1, 16 / (divide + 1), 64 / (divide + 1)]}/>
            <meshBasicMaterial color={color} />
          </mesh> */}
          <Text 
            position={[0, 0, 0]}
          ref={textRef}
          fontSize={0.355}
          font={fontLibrary.montserrat.regular}
          color={theme.colors.primary.main}
          // material={new THREE.ShaderMaterial}
          >
            {text ? "View" : ""}
          </Text>
        </primitive>

          </group>
        
    )
}

export default Cursor;