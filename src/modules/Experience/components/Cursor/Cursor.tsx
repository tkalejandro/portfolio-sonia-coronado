// import '@/theme/globals.css';
import { Html, useScroll } from '@react-three/drei';
import './cursor.css'
import * as THREE from 'three'
import gsap from 'gsap';
import { easeInOut } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cursorFragmentShader, cursorVertexShader } from '../../shaders/cursorShader';
import { textureLibrary } from '@/helpers';
import { NormalBufferAttributes } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useColor } from './CursorManager';

const Cursor = () => {
    // const circleRef = useRef<THREE.ShaderMaterial>(null)
    // const circleRef = useRef<THREE.Mesh>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { color } = useColor()
    const { viewport } = useThree()
  // viewport = canvas in 3d units (meters)

  const ref = useRef<THREE.Mesh | any>()
  let initialY = 0;

  useEffect(() => {
    // Store the initial y position
    initialY = ref.current.position.y;

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    // Calculate the new y position based on scroll position
    // const newY = initialY + window.scrollY;
    initialY = window.scrollY

    // Update the y position of the object
    // ref.current.position.setY(newY);
  };
  const scroll = useScroll();
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2
    const y = (mouse.y * viewport.height) / 2
    // @ts-ignore
    ref.current.position.setX(x)

    let value = scroll.offset;
    if (!isFinite(value)) {
      //Fix the bug when the number is infinity.
      value = 0;
    }
    // @ts-ignore
    ref.current.position.y = (-value * 30.0) + y
    // ref.current.rotation.y = -value * 30.0
    // window.addEventListener('mousemove', () => {
    //   // @ts-ignore
    //   ref.current.position.set(x, value += y, 0)
    // })
  })
  // effect once when component mounts
    // const [ length, setLength ] = useState({
    //     value: 6.283185307179586
    // })
    // let xS = 6.283185307179586
    // const sphereGeometry = new THREE.CircleGeometry(1, 50, 0, -2)
    // const sphereMaterial = new THREE.ShaderMaterial({})
    // const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    // console.log(sphereMesh)
    // gsap.to(length, {value: 0, duration: 0.2})
    
    // if(circleRef.current)
    //     console.log(circleRef.current)  
    // const musicNoteMap = new THREE.TextureLoader().load(textureLibrary.musicNote().map);

    // useFrame((state, delta) => {
    //     // if(!mousemove) {
    //     //     return
    //     //   }
    //       const cursor = state.pointer
    //       const cursorX = (cursor.x ) * 2;
    //       const cursorY = (cursor.y ) * 2;
      
    //     //   circ.value.set(cursorX, cursorY, 0)
    //     circleRef.current?.position.set(cursorX, cursorY, 0)
        
    // })

    // use
    
    return(
        <mesh ref={ref}>
            {/* <circleGeometry args={[0.1, 50, 0, Math.PI * 2]} /> */}
            <boxGeometry />
            {/* <shaderMaterial
                vertexShader={cursorVertexShader}
                fragmentShader={cursorFragmentShader}
                uniforms={{
                    note: { value: musicNoteMap }
                }}
            /> */}
            <meshBasicMaterial color={'red'} />

        </mesh>
        // <Html style={{
        //     position: 'fixed',
        //     left: position.x,
        //     top: position.y,
        // }}>
            // <div className='cursor' style={{
            //   position: 'absolute',
            //   left: position.x + 2 + 'px',
            //   top: position.y + 2 + 'px',
            //   zIndex: 1,
            //   backgroundColor: color
            // }}>
               
            // </div>
        // </Html>
    )
}

export default Cursor;