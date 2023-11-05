// TO DO - To think about this
import { TextureMaps } from '@/types/ExperienceTypes';

/**
 * Library to import quickly textures.
 */
class TextureLibrary {
  /**
   * Stones, useful for a floor, mimic arid zones, bright and more.
   */
  pavingStones() {
    return {
      map: 'textures/pavingStones1K/pavingStones_color.png',
      // displacementMap: 'textures/pavingStones1K/pavingStones_displacement.png',
      normalMap: 'textures/pavingStones1K/pavingStones_normalGL.png',
      roughnessMap: 'textures/pavingStones1K/pavingStones_roughness.png',
      aoMap: 'textures/pavingStones1K/pavingStones_ambientOcclusion.png',
    };
  }
}

const textureLibrary = new TextureLibrary();

export default textureLibrary;
