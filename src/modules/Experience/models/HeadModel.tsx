import { useGLTF } from '@react-three/drei';
import { PointsLoader } from '../components';
import { GroupProps } from '@react-three/fiber';
import { Group, Object3DEventMap, Texture } from 'three';
import { Color } from '@react-three/fiber';
import { useEffect, useMemo, useState } from 'react';

interface HeadModelProps extends GroupProps {
  selectedColor: Color;
  map: Texture;
  mousemove?: boolean;
}

const HeadModel = ({ selectedColor, map, mousemove = true, ...props }: HeadModelProps) => {
  const [ gltfScene, setGltfScene ] = useState<Group<Object3DEventMap> | null>(null);

  const { scene } = useGLTF('/models/head-4.glb');

  useEffect(() => {
    setGltfScene(scene);
  }, []);
  const cachedModel = useMemo(() => {
    if (gltfScene) {
      /**
       * Model created by @Hicham and
       * inspired from this tutorial ↓
       * https://youtu.be/AlPPYkZg9D4?si=L_chsWglPCB2DAGk
       */
      // Let's ignore the issue for now
      // @ts-ignore
      const head = gltfScene.children[0].geometry.clone();
      // @ts-ignore
      const eyes = gltfScene.children[2].geometry.clone();
      // @ts-ignore
      const hair = gltfScene.children[1].geometry.clone();
      
      return (
        <group
          {...props} 
        >
          <PointsLoader
            model={head}
            selectedColor={selectedColor}
            map={map}

          />
          <PointsLoader
            model={eyes}
            selectedColor={selectedColor}
            map={map}

          />
          <PointsLoader
            model={hair}
            selectedColor={selectedColor}
            map={map}
          />
        </group>
      );
    } else {
      return null;
    }
  }, [props, gltfScene]);

  return cachedModel;
};

export default HeadModel;

useGLTF.preload('/models/head-3.glb');
