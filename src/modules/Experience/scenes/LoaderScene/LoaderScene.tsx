import { Html, shaderMaterial, useProgress } from '@react-three/drei';
import React from 'react';
import { ChakraHtml } from '../../components';
import { Text } from '@chakra-ui/react';
import { loaderFragmentShader, loaderVertexShader } from '../../shaders/loaderShader';
import { useAppTheme } from '@/hooks';
/**
 * First Thing to appear :-)
 * This might dissapear in the future.
 * @returns
 */
const LoaderScene = () => {
  const { active, progress, errors, item, loaded, total } = useProgress();
  const theme = useAppTheme();

  return (
    <>
      <ChakraHtml center>
        <Text color={theme.colors.white}>{progress.toFixed(0)} % loaded</Text>
      </ChakraHtml>
      <mesh scale={20}>
        <planeGeometry />
        <meshBasicMaterial color={theme.colors.primary.main} />
      </mesh>
    </>
  );
};

export default LoaderScene;
