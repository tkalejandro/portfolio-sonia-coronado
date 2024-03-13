import React, { useState, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group, Object3DEventMap } from 'three';
import { GroupProps } from '@react-three/fiber';

interface ModelProps extends GroupProps {}
/**
 * Tree spruce
 * Requires light.
 * Created by: Alaric.Baraou
 * [CCO] (https://creativecommons.org/public-domain/cc0/)
 * via Market Pmnd (https://market.pmnd.rs/model/iphone-x)
 */
const TreeSpruce = ({ ...props }: ModelProps) => {
  const [gltfScene, setGltfScene] = useState<Group<Object3DEventMap> | null>(null);
  const { scene } = useGLTF('/models/treeSpruce.gltf');

  useEffect(() => {
    setGltfScene(scene);

    return () => {
      // Clean up if necessary
    };
  }, []);

  // Memoize the component based on both props and the loaded model
  const cachedModel = useMemo(() => {
    if (gltfScene) {
      return (
        <group {...props}>
          <primitive object={gltfScene.clone()} />
        </group>
      );
    } else {
      return null; // Handle the case where the model hasn't loaded yet
    }
  }, [props, gltfScene]);

  return cachedModel;
};

export default TreeSpruce;

// Optionally preload the model
useGLTF.preload('/models/treeSpruce.gltf');
