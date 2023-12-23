import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

/**
 * Heavy resource Guitar Model.
 * Requires light.
 */
const GuitarModel = ({ ...props }) => {
  const guitarModel = useGLTF('/models/guitar.gltf');

  // Memoize the component based on both props and the loaded model
  const cachedGuitarModel = useMemo(
    () => <primitive object={guitarModel.scene} {...props} />,
    [props, guitarModel],
  );

  return cachedGuitarModel;
};

export default GuitarModel;

useGLTF.preload('/models/guitar.gltf');
