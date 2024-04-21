import { useAppBreakpoints } from '@/hooks';
import { useCursor } from '@/modules/Experience/components/Cursor/CursorManager';
import { TreeSpruce } from '@/modules/Experience/models';
import { useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import { Group } from 'three';

const Wall = () => {
    const { changeSettings } = useCursor()

  return (
    <mesh 
        position={[0, -6, -2]}
        onPointerEnter={() => changeSettings("", false, "", true, false)}
        onPointerLeave={() => changeSettings("", false, "", false, false)}
      >
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial transparent={true} depthWrite={false} opacity={0}/>
      </mesh>
  );
};

export default Wall;
