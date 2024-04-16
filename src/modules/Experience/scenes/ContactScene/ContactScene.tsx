import React, { useRef } from 'react';
import { Vector3 } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { soniaCoronado } from '@/constants';
import { fontLibrary } from '@/helpers';
import { WoodenSignIPoly3D } from '../../models';
import { useAppBreakpoints, useAppTheme } from '@/hooks';
import { Forest, Land, Trees, Wall } from './components';
import { useRouter } from 'next/navigation';
import { EnhancedGroup, InvisibleMesh } from '../../components';

interface ContactSceneProps {
  position: Vector3;
}

/**
 * Shows the contact information
 */
const ContactScene = ({ position }: ContactSceneProps) => {
  const { email, phone, linkedin } = soniaCoronado;
  const router = useRouter();
  const theme = useAppTheme();
  const { isTablet, isBigTablet } = useAppBreakpoints();
  
  const linkdinRef = useRef()
  const emailRef = useRef()
  const numRef = useRef()
  const resumeRef = useRef()

  const openLinkedIn = () => {
    window.open(linkedin, '_blank');
  };

  const openResume = () => {
    router.push('/resume');
  };

  const openEmail = () => {
    const mailtoLink = `mailto:${email}?subject=Contact Request - Portfolio Sonia Coronado`;
    //Open external Mail App
    window.location.href = mailtoLink;
  };

  const openPhone = () => {
    const phoneto = `tel:${phone}`;
    window.location.href = phoneto;
  };

  return (
    <group
      position={position}
      
    >
      <Wall />
      <Land />
      <Trees />
      <Forest position={[isTablet ? 1.5 : 1, 0, -0.6]} rotation={[0, 0.25, 0]} />
      {isTablet && (
        <>
          <Forest position={[isTablet ? 3.75 : 1, 0, -0.6]} rotation={[0, 2, 0]} />
          <Forest position={[isTablet ? 6 : 1, 0, -0.6]} rotation={[0, 3, 0]} />
          <Forest position={[isTablet ? -2.75 : 1, 0, -1]} rotation={[0, -2, 0]} />
          <Forest position={[isTablet ? -6 : 1, 0, -0.6]} rotation={[0, 0.1, 0]} />
        </>
      )}

      <group position={[0, -1, 0.75]} scale={0.55} rotation={[0, -0.25, 0]}>
        <WoodenSignIPoly3D />
        <EnhancedGroup onClick={openLinkedIn}>
          <Text
          ref={linkdinRef}
            scale={0.12}
            font={fontLibrary.montserrat.extraBold}
            position={[-0.14, 1.69, 0.025]}
            onPointerEnter={() => {
              if(linkdinRef.current)
                // @ts-ignore
                linkdinRef.current.color = theme.colors.primary.main
            }}
            onPointerLeave={() => {
              if(linkdinRef.current)
                // @ts-ignore
                linkdinRef.current.color = "white"
            }}
          >
            LinkedIn
          </Text>
        </EnhancedGroup>
        <group position={[0, -0.03, 0]}>
          <Text scale={0.09} font={fontLibrary.montserrat.extraBold} position={[0.05, 1.37, 0.025]}>
            Sonia Coronado:
          </Text>
          <EnhancedGroup
            onClick={openEmail}
          >
            <Text
              ref={emailRef}
              scale={0.05}
              font={fontLibrary.montserrat.extraBold}
              position={[0.05, 1.24, 0.025]}
              onPointerEnter={() => {
                if(emailRef.current)
                  // @ts-ignore
                  emailRef.current.color = theme.colors.primary.main
              }}
              onPointerLeave={() => {
                if(emailRef.current)
                  // @ts-ignore
                  emailRef.current.color = "white"
              }}
            >
              {email}
            </Text>
          </EnhancedGroup>
          <EnhancedGroup onClick={openPhone}>
            <Text
              ref={numRef}
              scale={0.05}
              font={fontLibrary.montserrat.extraBold}
              position={[0.05, 1.12, 0.025]}
              onPointerEnter={() => {
                if(numRef.current)
                  // @ts-ignore
                  numRef.current.color = theme.colors.primary.main
              }}
              onPointerLeave={() => {
                if(numRef.current)
                  // @ts-ignore
                  numRef.current.color = "white"
              }}
            >
              {phone}
            </Text>
          </EnhancedGroup>
        </group>
        <EnhancedGroup onClick={openResume}>
          <Text
            ref={resumeRef}
            scale={0.12}
            font={fontLibrary.montserrat.extraBold}
            position={[0.03, 0.76, 0.025]}
            onPointerEnter={() => {
              if(resumeRef.current)
                // @ts-ignore
                resumeRef.current.color = theme.colors.primary.main
            }}
            onPointerLeave={() => {
              if(resumeRef.current)
                // @ts-ignore
                resumeRef.current.color = "white"
            }}
          >
            Resume
          </Text>
        </EnhancedGroup>
      </group>
    </group>
  );
};

export default ContactScene;
