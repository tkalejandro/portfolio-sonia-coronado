import React from 'react';
import { useThree, Vector3 } from '@react-three/fiber';
import { MediaCard } from './components';
import { useAppBreakpoints } from '@/hooks';
import { Box, Flex } from '@react-three/flex';
import { useAspect } from '@react-three/drei';
import { mediaCoverageData } from '@/constants';

interface MediaCoverageSceneProps {
  position: Vector3;
}

const MediaCoverageScene = ({ position }: MediaCoverageSceneProps) => {
  const { isTablet } = useAppBreakpoints();
  const { size } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height);

  return (
    <group position={position}>
      <Flex centerAnchor flexDirection="column" size={[vpWidth, vpHeight, 0]}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          width={'100%'}
          //padding={'10%'}
          //paddingLeft={'10%'}
        >
          {mediaCoverageData.map((i) => (
            <MediaCard title={i.title} description={i.description} image={i.srcImg} url={i.url} />
          ))}
        </Box>
      </Flex>
    </group>
  );
};

export default MediaCoverageScene;
