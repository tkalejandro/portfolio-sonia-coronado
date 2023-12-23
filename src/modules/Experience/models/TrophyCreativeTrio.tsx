import React, { useEffect, useMemo, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group, Object3DEventMap } from 'three';

/**
 * Trophy Model.
 * Requires light.
/* Trophy by CreativeTrio (https://poly.pizza/m/fLy8KmmD1t)
 */
const TrophyCreativeTrio = ({ ...props }) => {
  const [gltfScene, setGltfScene] = useState<Group<Object3DEventMap> | null>(null);
  const { scene } = useGLTF('/models/trophyCreativeTrio.glb');

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

export default TrophyCreativeTrio;

useGLTF.preload('/models/trophyCreativeTrio.glb');
