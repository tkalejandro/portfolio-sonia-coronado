import { Phase } from '@/enums/Experience';
import { threeHelpers } from '@/helpers';
import { useAppTheme } from '@/hooks';

import { useCursor } from '@/modules/Experience/components/Cursor/CursorManager';

import { ChakraHtml, FakeGlowMaterial } from '@/modules/Experience/components';
import { IFakeGlowMaterial } from '@/modules/Experience/components/FakeGlowMaterial/FakeGlowMaterial';

import { useSoundManagerContext } from '@/modules/Experience/sounds/SoundManager/SoundManager';
import { useAppSettings } from '@/store';
import { ElementTransform } from '@/types/ExperienceTypes';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useState } from 'react';
import { Mesh } from 'three';

interface SecretButtonProps {
  element: ElementTransform;
}

const speed = 3.5;
const maxMinRange = 0.3;

const ScretButton = ({ element }: SecretButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSecretVisible, onSecretNotVisible, onSecretFound } = useSoundManagerContext();
  const [isSecretReveal, setIsSecretReveal] = useState<boolean>(false);
  const [secretAppearFirstTime, setSecretAppearFirstTime] = useState(false);
  const phase = useAppSettings((state) => state.phase);
  const secretRef = useRef<Mesh>(null!);
  const glowRef = useRef<IFakeGlowMaterial | null>(null!);

  const { camera } = useThree();
  const theme = useAppTheme();
  const { changeSettings } = useCursor()
  const openSecret = async() => {
    await onOpen();
    await setIsSecretReveal(true);
  };

  const closeSecret = async() => {
    await onSecretFound();
    await onClose();
    await changeSettings("", false, "", false, false)
  };

  useFrame((state) => {
    const clock = state.clock;

    if (isSecretReveal || phase !== Phase.Playing || !camera || !secretRef.current) {
      return;
    }

    // Calculate if the mesh is within the camera's frustum
    const isMeshVisible = threeHelpers.isObjectInFrustum(secretRef.current, camera);

    if (isMeshVisible) {
      if (!isSecretReveal && glowRef && glowRef.current) {
        //Give the color intensity
        glowRef.current.uniforms.glowSharpness.value =
          Math.sin(clock.elapsedTime * speed) * maxMinRange;
        // Changes the radius
        glowRef.current.uniforms.glowInternalRadius.value =
          Math.sin(-clock.elapsedTime * speed) * maxMinRange;
        console.log('I Happen');
      } else {
        if (glowRef && glowRef.current) {
          glowRef.current.uniforms.glowSharpness.value = -0.25;
          glowRef.current.uniforms.glowInternalRadius.value = 1;
        }
      }

      //Sound callback
      onSecretVisible();

      if (!secretAppearFirstTime) {
        setSecretAppearFirstTime(true);
      }
    } else if (secretAppearFirstTime) {
      // This event only starts when the secret is on the screen.
      // Sound callback
      onSecretNotVisible();
    }
  });

  return (
    <>
      <mesh
        ref={secretRef}
        position={element.position}
        onPointerEnter={() => {
          changeSettings("", true, "Click", false, true)
          document.body.style.cursor = "none"

        }}
        onPointerLeave={() => {
          changeSettings("", false, "", false, false)
          document.body.style.cursor = "default"
        }}
        onClick={openSecret}
      >
        <boxGeometry args={[...element.scale, 0.125]} />
        <FakeGlowMaterial
          ref={glowRef}
          glowInternalRadius={1}
          glowSharpness={-0.25}
          falloff={1.75}
          glowColor={theme.colors.primary.main}
        />
      </mesh>
      <ChakraHtml >
        <ButtonGroup>
        <Modal isCentered isOpen={isOpen} onClose={closeSecret} size="xl">
          <ModalOverlay  />
          <mesh>
          <planeGeometry args={element.scale} />
          <meshStandardMaterial color="purple" />
          </mesh>
          <ModalContent margin={4} >
            <ModalHeader fontSize="medium" color={theme.colors.primary.main}>
              {'You found me!'}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody fontWeight={300}>
              <Text fontSize="small">
                Music, like a hidden key, unlocks emotions and transforms perception, turning
                ordinary moments into extraordinary discoveries.
              </Text>
              <Text fontSize="small" my={4}>
                Thanks to this magic, I've been honored with the following awards:
              </Text>
              <UnorderedList fontSize="small">
                <ListItem fontStyle="italic" mb={4}>
                  <strong>MPSE Golden Reel Award </strong>for Outstanding Achievement in{' '}
                  <strong>Sound Editing for Computer Cinematic</strong>. As a music editor for{' '}
                  <strong>COD</strong> (2020) and <strong>TLOU2</strong> (2021).
                </ListItem>
                <ListItem fontStyle="italic">
                  <strong> MPSE Golden Reel Award </strong>for Outstanding Achievement in{' '}
                  <strong>Sound Editing for Computer Interactive Gameplay </strong>. As a music
                  editor for <strong>COD</strong> (2020) and <strong>TLOU2</strong> (2021).
                </ListItem>
                <ListItem fontStyle="italic">
                  Outstanding Achievement in{' '}
                  <strong>Music Editing – Game Music As a supervising music editor</strong> for{' '}
                  <strong>GOWR</strong> (2023).
                </ListItem>
              </UnorderedList>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={closeSecret}>
                Feelin' it!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </ButtonGroup>
      </ChakraHtml>
    </>
  );
};

export default ScretButton;
