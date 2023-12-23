import React from 'react';
import { Vector3 } from '@react-three/fiber';
import { MediaCard } from './components';
import { useAppBreakpoints } from '@/hooks';
interface MediaCoverageSceneProps {
  position: Vector3;
}

const MediaCoverageScene = ({ position }: MediaCoverageSceneProps) => {
  const { isTablet } = useAppBreakpoints()

  const cards = {
    card1: {
      x: -1.22,
      y: 0.85,
      z: 0
    },
    card2: {
      x: 1.22,
      y: 0.85,
      z: 0
    },
    card3: {
      x: -1.22,
      y: -1.1,
      z: 0
    },
    card4: {
      x: 1.22,
      y: -1.1,
      z: 0
    }
  }
  const cardsTablet = {
    card1: {
      x: 0,
      y: 1.9,
      z: 0
    },
    card2: {
      x: 0,
      y: 0.5,
      z: 0
    },
    card3: {
      x: 0,
      y: -0.9,
      z: 0
    },
    card4: {
      x: 0,
      y: -2.3,
      z: 0
    }
  }

  return (
    <group position={position}>
      <MediaCard
        scale={isTablet ? 1 : 0.85}
        position={ isTablet ? [cards.card1.x, cards.card1.y, cards.card1.z] : [cardsTablet.card1.x, cardsTablet.card1.y, cardsTablet.card1.z] }
        title={'title 1'}
        image={'/images/theLastOfUS.jpg'}
      />
      <MediaCard
        scale={isTablet ? 1 : 0.85}
        position={ isTablet ? [cards.card2.x, cards.card2.y, cards.card2.z] : [cardsTablet.card2.x, cardsTablet.card2.y, cardsTablet.card2.z] }
        title={'title 2'}
        image={'/images/theLastOfUS2.jpg'}
      />
      <MediaCard
        scale={isTablet ? 1 : 0.85}
        position={ isTablet ? [cards.card3.x, cards.card3.y, cards.card3.z] : [cardsTablet.card3.x, cardsTablet.card3.y, cardsTablet.card3.z] }
        title={'title 3'}
        image={'/images/theLastOfUS2.jpg'}
      />
      <MediaCard
        scale={isTablet ? 1 : 0.85}
        position={ isTablet ? [cards.card4.x, cards.card4.y, cards.card4.z] : [cardsTablet.card4.x, cardsTablet.card4.y, cardsTablet.card4.z] }
        title={'title 4'}
        image={'/images/theLastOfUS.jpg'}
      />
    </group>
  );
};

export default MediaCoverageScene;
