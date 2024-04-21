import { GroupProps } from '@react-three/fiber';
import React, { ReactNode } from 'react';

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

  return (
    <group
      onPointerEnter={() => {
        document.body.style.cursor = 'pointer';
        
      }}
      onPointerLeave={() => {
        document.body.style.cursor = 'default';
      }}
      {...props}
    >
      {children}
    </group>
  );
};

export default EnhancedGroup;
