import React, { useEffect, useRef, useState } from 'react';
import { GroupProps } from '@react-three/fiber';
import { Group, Mesh } from 'three';
import { RoundedBox, Text } from '@react-three/drei';
import { ThreeColor, ThreeSize } from '@/types/ExperienceTypes';
import { useAppTheme } from '@/hooks';
import { fontLibrary } from '@/helpers';
import { useCursor } from '../Cursor/CursorManager';

interface ThreeDButtonProps extends GroupProps {
  /**
   * Size of the button
   */
  size?: ThreeSize;
  /**
   * Color of the button. Only theme are allow
   */
  color?: ThreeColor;

  /**
   * Text of the button
   */
  text: string;

  /**
   * Color will change if is selected
   */
  isSelected?: boolean;
}



const ThreeDButton = ({
  size = 'md',
  isSelected = false,
  color,
  text,
  ...props
}: ThreeDButtonProps) => {
  const theme = useAppTheme();

  const buttonRef = useRef<Mesh>(null);
  const textRef = useRef<Group>(null);
  const [buttonScale, setButtonScale] = useState<number | null>(null);
  const [buttonColor, setButtonColor] = useState<string>();
  const [textColor, setTextColor] = useState<string>();
  
  const { changeColor, changeHover } = useCursor()

  useEffect(() => {
    colorToUse();
    scaleToUse();
  }, [size, color, isSelected]);

  const scaleToUse = (): void => {
    switch (size) {
      case 'xs':
        setButtonScale(0.4);
        break;
      case 'sm':
        setButtonScale(0.7);
        break;
      case 'md':
        setButtonScale(1);
        break;
      case 'lg':
        setButtonScale(1.3);
        break;
      case 'xl':
        setButtonScale(1.6);
        break;
      default:
        setButtonScale(null);
    }
  };

  const colorToUse = (): void => {
    const shade = 900;
    switch (color) {
      case 'primary':
        setButtonColor(isSelected ? theme.colors.primary[shade] : theme.colors.primary.main);
        setTextColor(theme.colors.primary.contrastText);
        break;
      case 'secondary':
        setButtonColor(isSelected ? theme.colors.secondary[shade] : theme.colors.secondary.main);
        setTextColor(theme.colors.secondary.contrastText);
        break;
      case 'warning':
        setButtonColor(isSelected ? theme.colors.warning[shade] : theme.colors.warning.main);
        setTextColor(theme.colors.warning.contrastText);
        break;
      case 'info':
        setButtonColor(isSelected ? theme.colors.info[shade] : theme.colors.info.main);
        setTextColor(theme.colors.info.contrastText);
        break;
      case 'danger':
        setButtonColor(isSelected ? theme.colors.danger[shade] : theme.colors.danger.main);
        setTextColor(theme.colors.danger.contrastText);
        break;
      case 'success':
        setButtonColor(isSelected ? theme.colors.success[shade] : theme.colors.success.main);
        setTextColor(theme.colors.success.contrastText);
        break;
      case 'black':
        setButtonColor(theme.colors.black);
        setTextColor(theme.colors.white);
        break;
      case 'white':
        setButtonColor(theme.colors.white);
        setTextColor(theme.colors.black);
        break;
      default:
        // Handle any other cases or set a default color
        setButtonColor(theme.colors.grey);
        setTextColor(theme.colors.black);
    }
  };
  if (!buttonScale) return null;
  return (
    <group
      {...props}
      scale={props.scale ?? [buttonScale, buttonScale, 1]}
      onPointerEnter={() => changeHover(true)}
      onPointerLeave={() => changeHover(false)}
      // onPointerDown={() => changeHover(true)}
      >
      {/* Button */}

      <RoundedBox
        ref={buttonRef}
        position={[0, 0, 0]}
        radius={0.015}
        smoothness={2}
        bevelSegments={4}
        creaseAngle={0.1}
        scale={[1, 1, 0.1]}
        args={[0.4, 0.14, 1]} // Width, height, depth
      >
        <meshPhysicalMaterial
          transparent
          roughness={0.1}
          clearcoat={0.1}
          reflectivity={0.9}
          metalness={0.1}
          color={buttonColor}
        />
      </RoundedBox>

      {/* Text */}
      <Text
        position={[0, 0.004, 0.051]}
        ref={textRef}
        fontSize={0.055}
        font={fontLibrary.montserrat.regular}
        color={textColor}
      >
        {text}
      </Text>
    </group>
  );
};

export default ThreeDButton;
