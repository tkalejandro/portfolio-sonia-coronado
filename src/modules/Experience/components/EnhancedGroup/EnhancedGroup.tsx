import { GroupProps } from '@react-three/fiber';
import React, { ReactNode } from 'react';
import { useCursor } from '../Cursor/CursorManager';

interface EnhancedGroupProps extends GroupProps {
  children: ReactNode;
}
/**
 * It provides a better Group Type, benefits:
 * - Provide a cursor pointer when hover
 * - add more...
 * @returns
 */
const EnhancedGroup = ({ children, ...props }: EnhancedGroupProps) => {
  const { changeColor } = useCursor()

  return (
    <group
      onPointerEnter={() => {
        // document.body.style.cursor = 'pointer !important';
        // changeColor("red")
        
      }}
      onPointerLeave={() => {
        // document.body.style.cursor = 'default !important';
        // changeColor("blue")
      }}
      {...props}
    >
      {children}
    </group>
  );
};

export default EnhancedGroup;
