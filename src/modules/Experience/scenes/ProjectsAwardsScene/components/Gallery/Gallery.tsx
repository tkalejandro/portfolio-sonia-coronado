import { imageLibrary } from '@/helpers';
import { useAppBreakpoints } from '@/hooks';
import { GalleryTransform } from '@/types/ExperienceTypes';
import { Image } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import THREE, { Vector3 } from 'three';

const Gallery = () => {
  const [galleryContainerScale, setGalleryContainerScale] = useState<number>(1);
  const [galleryTransform, setGalleryTransform] = useState<GalleryTransform | null>(null);
  const { isBase, isTablet, isBigTablet, isMobile } = useAppBreakpoints();

  useEffect(() => {
    if (isBigTablet) {
      // This makes the gallery match the items correctly
      setGalleryContainerScale((s) => (s = 0.75));
      setGalleryTransform({
        tlou2_1: { scale: [1.8, 4], position: new Vector3(-4, 0.5, 0) },
        cod_2: { scale: [1.8, 4], position: new Vector3(-2, 0, 0) },
        god_1: { scale: [1.8, 4], position: new Vector3(0.0, 0.5, 0) },
        tlou2_2: { scale: [1.8, 4], position: new Vector3(2, 0, 0) },
        cod_1: { scale: [1.8, 4], position: new Vector3(4, 0.5, 0) },
        secret: { scale: [1.8, 0.5], position: new Vector3(0, -1.95, 0) },
      });
      return;
    }

    if (isTablet) {
      console.log(isBigTablet);
      setGalleryTransform({
        tlou2_1: { scale: [2, 1.7], position: new Vector3(-1.125, 2, 0) },
        cod_2: { scale: [2, 1.7], position: new Vector3(1.03, 2, 0) },
        god_1: { scale: [3, 1.7], position: new Vector3(-0.63, 0.15, 0) },
        secret: { scale: [1, 1.7], position: new Vector3(1.53, 0.15, 0) },
        tlou2_2: { scale: [2, 1.7], position: new Vector3(-1.125, -1.7, 0) },

        cod_1: { scale: [2, 1.7], position: new Vector3(1.03, -1.7, 0) },
      });
      return;
    }

    //I dont think we need isBase but I leave the message in case is broken in a really small phone
    if (isBase || isMobile) {
      setGalleryTransform({
        tlou2_1: { scale: [1.53, 1.2], position: new Vector3(-0.56, 2, 0) },
        cod_2: { scale: [1.05, 1.2], position: new Vector3(0.8, 2, 0) },
        tlou2_2: { scale: [2.65, 1], position: new Vector3(0, 0.83, 0) },
        god_1: { scale: [2.65, 1.5], position: new Vector3(0, -0.49, 0) },
        cod_1: { scale: [1.53, 1.2], position: new Vector3(0.56, -1.91, 0) },
        secret: { scale: [1, 1.2], position: new Vector3(-0.8, -1.91, 0) },
      });
    }
  }, [isBase, isTablet, isMobile, isBigTablet]);

  if (!galleryTransform) {
    return null;
  }

  const { tlou2_1, tlou2_2, god_1, cod_1, cod_2, secret } = galleryTransform;
  return (
    <group position={[0, 0, -1]}>
      <group scale={galleryContainerScale}>
        <Image url={imageLibrary.tlou2_1()} scale={tlou2_1.scale} position={tlou2_1.position} />
        <Image url={imageLibrary.cod_2()} scale={cod_2.scale} position={cod_2.position} />
        <Image url={imageLibrary.tlou2_2()} scale={tlou2_2.scale} position={tlou2_2.position} />
        <Image url={imageLibrary.god_1()} scale={god_1.scale} position={god_1.position} />
        <Image url={imageLibrary.cod_1()} scale={cod_1.scale} position={cod_1.position} />
        <mesh position={secret.position}>
          <planeGeometry args={secret.scale} />
          <meshStandardMaterial color="purple" />
        </mesh>
      </group>
      {/* TODO - This could be an interactive hidden treasure that open more information */}
    </group>
  );
};

export default Gallery;
