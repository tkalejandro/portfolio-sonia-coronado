import React from 'react';
import { useThree, Vector3 } from '@react-three/fiber';
import { MediaCard } from './components';
import { useAppBreakpoints, useAppTheme } from '@/hooks';
import { Box, Flex } from '@react-three/flex';
import { useAspect, Text } from '@react-three/drei';
import { mediaCoverageData } from '@/constants';
import { fontLibrary } from '@/helpers';

interface MediaCoverageSceneProps {
  position: Vector3;
}

const MediaCoverageScene = ({ position }: MediaCoverageSceneProps) => {
  const { isBigTablet, isDesktop } = useAppBreakpoints();
  const { size } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height);
  const textScale = isDesktop ? 1.8 : 1;

  const theme = useAppTheme();
  return (
    <group position={position}>
      <group position={[-0.05, 1.25, 0]}>
        <Text
          position={[0, 0.15, 0]}
          textAlign="center"
          maxWidth={15}
          font={fontLibrary.montserrat.thin}
          scale={0.15 * textScale}
          color={theme.colors.primary.main}
        >
          Media Coverage
        </Text>

        <Text
          position={[0, isBigTablet ? -0.35 : -0.15, 0]}
          textAlign="center"
          maxWidth={17}
          font={fontLibrary.montserrat.bold}
          scale={0.085 * textScale}
          color={theme.colors.primary.main}
        >
          From noteworthy events to headline worthy achievements
        </Text>
      </group>
      <Flex
        centerAnchor
        flexDirection="column"
        size={[vpWidth, vpHeight, 0]}
        position={isBigTablet ? [0, -0.5, 0] : undefined}
      >
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
