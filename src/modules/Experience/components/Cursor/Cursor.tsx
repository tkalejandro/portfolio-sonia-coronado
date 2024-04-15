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
import { insideCursorFragmentShader, insideCursorVertexShader } from '../../shaders/cursorShader/insideCursorShader';
import { pointCurserFragmentShader, pointCurserVertexShader } from '../../shaders/cursorShader/pointerCursor';

const Cursor = () => {
    // const circleRef = useRef<THREE.ShaderMaterial>(null)
    // const circleRef = useRef<THREE.Mesh>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { color, hover, text, settings } = useCursor()
    console.log(settings.secret)
    const { viewport } = useThree()
  // viewport = canvas in 3d units (meters)

  const ref = useRef<THREE.Mesh | any>()
  const pointRef = useRef<THREE.Mesh | any>()
  const insideRef = useRef<THREE.Mesh | any>()
  const scroll = useScroll();

  const windMap = new THREE.TextureLoader().load(textureLibrary.wind().map);
  windMap.wrapS = THREE.RepeatWrapping
  windMap.wrapT = THREE.RepeatWrapping
  const faceMap = new THREE.TextureLoader().load(textureLibrary.face().map);
 
  let divide = 3
  
  const planeGeometry = new THREE.PlaneGeometry(1, 1, 16 / (divide + 1), 64 / (divide + 1))
  const circleGeometry = new THREE.CircleGeometry(0.5, 50, 0, Math.PI )
  // const torusGeometry = new THREE.TorusGeometry( 0.05, 3, 16, 100 ) 
  
  const sphereGeometry = new THREE.RingGeometry( 0, 0.08, 64 ); 
  // const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
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
  const circleMesh = new THREE.Mesh(sphereGeometry, planeMaterial)
  // document.body.style.cursor = settings.secret || settings.contact ? "default !important" : "none"
  // document.body.style.cursor = !settings.secret ? 'none' : !settings.contact ? 'none' : 'default !important' 
  
  

  // if(settings.contact) {
  //   document.body.style.cursor = 'default'
  // } else {
  //   document.body.style.cursor = 'none'
  // }
  
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
    // gsap.to(pointRef.current.position, { y: (-value * 30.0) + y, x: x, z: 0, ease: "power2.in", duration: 0.01 })
    // gsap.to(pointRef.current.rotation, { y: 0, x: 0, z:x + (-value * 30.0) + y , ease: "power2.in", duration: 0.1 })
    if(settings.hover) {
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
      // gsap.to(ref.current.position, { y: (-value * 30.0) + y, x: x, ease: "power2.in", duration: 0.01 })
      gsap.to(ref.current.material.uniforms.uTime, { value: elapsedTime } )
    // if(htmlRef.current)
      // document.addEventListener('scroll', () => {
      //   gsap.to(".text", { top:  value, ease: "power2.in", duration: 0.1 })
      // })
      
      
        // document.body.style.cursor = "default"

      if(settings.contact) {
        // document.body.style.cursor = "default"
        // gsap.to(ref.current.position, { y: -2 , x: -2, ease: "power2.in", duration: 1 })
        gsap.to(ref.current.rotation, { y: 0, x: 0, z: 0 , ease: "power2.in", duration: 0.1 })
        gsap.to(insideRef.current.rotation, { y: 0, x: 0, z: 0 , ease: "power2.in", duration: 0.1 })

      } else {
        
        gsap.to(ref.current.position, { y: (-value * 30.0) + y, x: x, z: 0, ease: "power2.in", duration: 0.01 })
        gsap.to(ref.current.rotation, { y: 0, x: 0, z:x + (-value * 30.0) + y , ease: "power2.in", duration: 0.1 })
        gsap.to(insideRef.current.rotation, { y: 0, x: 0, z: -(x + (-value * 30.0) + y) , ease: "power2.in", duration: 0.1 })

      }
    


  })
  
    return(
      <group  
        // position={[0, 0, 0.8]} 
      >
          {/* <mesh ref={pointRef} >
            <planeGeometry args={[0.1, 0.1]} />
            <shaderMaterial
              vertexShader={pointCurserVertexShader}
              fragmentShader={pointCurserFragmentShader}
              transparent={true}
            />
          </mesh> */}
          {/* <primitive ref={pointRef} object={circleMesh} /> */}
         <primitive
          ref={ref}
          object={planeMesh}
          scale={[1 / divide, 1 / divide, 1 / divide]}
          position={[-3, -28.5, 0]}
        >
          {/* <Html ref={htmlRef} className='view' 
          style={{
            // left: `${position.x}px`,
            // top: `${position.y}px`
          }}
          >
            <h1>View</h1>
          </Html> */}
          {settings.contact ? <mesh ref={insideRef} >
            <planeGeometry args={[1, 1, 16 / (divide + 1), 64 / (divide + 1)]}/>
            <shaderMaterial
              vertexShader={insideCursorVertexShader}
              fragmentShader={insideCursorFragmentShader}
              uniforms={{
                uMap: new THREE.Uniform(faceMap)
              }}
              transparent={true}
              // depthWrite={false}
            />
          </mesh>
          : <Text 
            position={[0, 0, 0]}
          ref={insideRef}
          fontSize={0.355}
          font={fontLibrary.montserrat.regular}
          color={theme.colors.primary.main}
          // rotation={[0, 2, 0]}
          // material={new THREE.ShaderMaterial}
          >
            {settings.text}
          </Text>}
        </primitive>

          </group>
        
    )
}

export default Cursor;