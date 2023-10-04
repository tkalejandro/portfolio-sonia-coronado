"use client"
import React from 'react'
import { Canvas } from '@react-three/fiber'
import Box from './components/Box'


const Experience = () => {
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
        </Canvas>
    )
}

export default Experience