import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group, Object3DEventMap } from 'three';
import { GroupProps } from '@react-three/fiber';

interface ModelProps extends GroupProps {}
/**
 * Wooden Sign
 * Requires light.
 * Created by: iPoly3D
 * [CCO] (https://creativecommons.org/public-domain/cc0/)
 * via Poly Pizza (https://poly.pizza/m/p4TB5SdPsG)
 */
const WoodenSignIPoly3D = forwardRef<Group, ModelProps>((props, ref) => {
  const [gltfScene, setGltfScene] = useState<Group<Object3DEventMap> | null>(null);
  const { scene } = useGLTF('/models/WoodenSign.glb');

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
        <group ref={ref} {...props}>
          <primitive object={gltfScene.clone()} />
        </group>
      );
    } else {
      return null; // Handle the case where the model hasn't loaded yet
    }
  }, [props, gltfScene]);

  return cachedModel;
});

export default WoodenSignIPoly3D;

// Optionally preload the model
useGLTF.preload('/models/WoodenSign.glb');
