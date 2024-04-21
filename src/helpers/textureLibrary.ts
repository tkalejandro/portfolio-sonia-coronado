// TO DO - To think about this Standarize some textures formats
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
  /**
   * Music note used for PointerLoader
   */
  musicNote() {
    return {
      map: '/textures/musicNote/note_map.png',
    };
  }

  wind() {
    return {
      map: '/textures/wind/wind.png'
    }
  }

  face() {
    return {
      map: '/textures/insideCursor/face.png'
    }
  }
}

const textureLibrary = new TextureLibrary();

export default textureLibrary;
