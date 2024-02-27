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
  const [gltfScene, setGltfScene] = useState<Group<Object3DEventMap> | null>(null);
  const [gltfScene1, setGltfScene1] = useState<Group<Object3DEventMap> | null>(null);

  const { scene } = useGLTF('/models/head-3.glb');
  const { scene1 } = useGLTF('/models/cone.glb')

  useEffect(() => {
    setGltfScene(scene);
    setGltfScene1(scene1)
  }, []);
  const cachedModel = useMemo(() => {
    // if (gltfScene) {
    //   /**
    //    * Model created by @Hicham2012 and
    //    * inspired from this tutorial ↓
    //    * https://youtu.be/AlPPYkZg9D4?si=L_chsWglPCB2DAGk
    //    */
    //   // Let's ignore the issue for now
    //   // @ts-ignore
    //   const head = gltfScene.children[0].geometry.clone();
    //   return (
    //     <group {...props}>
    //       <PointsLoader
    //         model={head}
    //         selectedColor={selectedColor}
    //         map={map}
    //         mousemove={mousemove}
    //       />
    //     </group>
    //   );
    // } else {
    //   return null;
    // }
    if (gltfScene1) {
      const head = gltfScene1.children[0].geometry.clone();
      return (
        <group {...props}>
          <PointsLoader
            model={head}
            selectedColor={selectedColor}
            map={map}
            mousemove={mousemove}
          />
        </group>
      );
    } else {
      return null;
    }
  }, [props, gltfScene1]);

  return cachedModel;
};

export default HeadModel;

useGLTF.preload('/models/head-3.glb');
