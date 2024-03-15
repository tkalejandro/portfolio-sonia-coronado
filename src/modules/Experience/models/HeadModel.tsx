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
  // const [gltfScene1, setGltfScene1] = useState<Group<Object3DEventMap> | null>(null);

  const { scene } = useGLTF('/models/head-4.glb');
  // const head = useGLTF('/models/cone.glb')
  // console.log(gltfScene)

  useEffect(() => {
    setGltfScene(scene);
    // setGltfScene1(scene1)
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
      // console.log(selectedColor)
      const incrementHexColor = (hexColor: any, increment: any) => {
        // Remove the '#' from the beginning of the hex color
        hexColor = hexColor.replace('#', '');
        
        // Convert the hexadecimal color to decimal
        var decimalColor = parseInt(hexColor, 16);
        
        // Increment the decimal color by the specified increment
        decimalColor += increment;
        
        // Ensure the color does not exceed the maximum value (FFFFFF)
        decimalColor = Math.min(decimalColor, parseInt('FFFFFF', 16));
        
        // Convert the incremented decimal color back to hexadecimal
        var incrementedHexColor = decimalColor.toString(16);
        
        // Add leading zeros if necessary
        incrementedHexColor = '#' + '0'.repeat(6 - incrementedHexColor.length) + incrementedHexColor;
        
        return incrementedHexColor;
    }

      return (
        <group {...props}>
          <PointsLoader
            model={head}
            selectedColor={selectedColor}
            map={map}
            mousemove={mousemove}
          />
          <PointsLoader
            model={eyes}
            selectedColor={selectedColor}
            map={map}
            mousemove={mousemove}
          />
          <PointsLoader
            model={hair}
            selectedColor={selectedColor}
            map={map}
            mousemove={mousemove}
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
