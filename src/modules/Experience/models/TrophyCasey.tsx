import React, { useState, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group, Object3DEventMap } from 'three';

/**
 * Trophy Model.
 * Requires light.
 * Trophy by Casey Tumbers
 * [CC-BY] (https://creativecommons.org/licenses/by/3.0/)
 * via Poly Pizza (https://poly.pizza/m/6Xu7mttjodo)
 */
const TrophyCasey = ({ ...props }) => {
  const [gltfScene, setGltfScene] = useState<Group<Object3DEventMap> | null>(null);
  const { scene } = useGLTF('/models/trophyCasey.glb');

  useEffect(() => {
    setGltfScene(scene);

    return () => {
      // Clean up if necessary
    };
  }, []);

  // Memoize the component based on both props and the loaded model
  const cachedModel = useMemo(() => {
    if (gltfScene) {
      return <primitive object={gltfScene.clone()} {...props} />;
    } else {
      return null; // Handle the case where the model hasn't loaded yet
    }
  }, [props, gltfScene]);

  return cachedModel;
};

export default TrophyCasey;

// Optionally preload the model
useGLTF.preload('/models/trophyCasey.glb');
