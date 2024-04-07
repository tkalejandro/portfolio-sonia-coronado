// import '@/theme/globals.css';
import { Html } from '@react-three/drei';
import './cursor.css'
import * as THREE from 'three'
import gsap from 'gsap';
import { easeInOut } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cursorFragmentShader, cursorVertexShader } from '../../shaders/cursorShader';
import { textureLibrary } from '@/helpers';
import { NormalBufferAttributes } from 'three';
import { useFrame } from '@react-three/fiber';
import { useColor } from './CursorManager';

const Cursor = () => {
    // const circleRef = useRef<THREE.ShaderMaterial>(null)
    // const circleRef = useRef<THREE.Mesh>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { color } = useColor()
    useEffect(() => {
        const handleMouseMove = (event: { clientX: number; clientY: number; }) => {
          setPosition({ x: (event.clientX ) - 0.5, y: (event.clientY ) - 0.5 });
        };
    
        // Add event listener when component mounts
        document.addEventListener('mousemove', handleMouseMove);
    
        // Clean up event listener when component unmounts
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
        };
      }, []);
       // Only run effect once when component mounts
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
        // <mesh ref={circleRef} position={[position.x, position.y, 0]}>
        //     <circleGeometry args={[0.1, 50, 0, Math.PI * 2]} />
        //     <shaderMaterial
                
        //         vertexShader={cursorVertexShader}
        //         fragmentShader={cursorFragmentShader}
        //         uniforms={{
        //             note: { value: musicNoteMap }
        //         }}
        //     />
        // </mesh>
        // <Html style={{
        //     position: 'fixed',
        //     left: position.x,
        //     top: position.y,
        // }}>
            <div className='cursor' style={{
              position: 'absolute',
              left: position.x + 2 + 'px',
              top: position.y + 2 + 'px',
              zIndex: 1,
              backgroundColor: color
            }}>
                {/* <h3>20</h3> */}
            </div>
        // </Html>
    )
}

export default Cursor;