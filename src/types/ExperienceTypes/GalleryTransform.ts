import ElementTransform from './ElementTransform';

/**
 * Interface representing the transformation properties for gallery elements.
 */
interface GalleryTransform {
  /**
   * The Last of Us 1 image transformation properties.
   */
  tlou2_1: ElementTransform;

  /**
   * Call of Duty 2 image transformation properties.
   */
  cod_2: ElementTransform;

  /**
   * The Last of Us 2 image transformation properties.
   */
  tlou2_2: ElementTransform;

  /**
   * God of War 1 image transformation properties.
   */
  god_1: ElementTransform;

  /**
   * Call of Duty 1 image transformation properties.
   */
  cod_1: ElementTransform;

  /**
   * Secret image transformation properties.
   */
  secret: ElementTransform;
}

export default GalleryTransform;
