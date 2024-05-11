/**
 * Library to render fast an Audio.
 */
class AudioLibrary {
  /**
   * Guitar strings that can be mixed with base.
   */
  guitars = () => 'audio/guitars.mp3';

  /**
   * Sound that will be playing when getting near the secret.
   */
  stringsSecretApproach = () => 'audio/stringsSecretApproach.mp3';

  /**
   * Sound that will be add in the project after user close the secret modal.
   */
  synthPostSecret = () => 'audio/synthPostSecret.mp3';

  /**
   * This is the base song for the project.
   */
  synthBase = () => 'audio/synthBase.mp3';

  /**
   * Song that will be located at the Audiolibrary.
   */
  omnisphereExperiment = () => 'audio/omnisphereExperiment.wav';

  /**
   * Song that plays when info is selected
   */
  infoMusic = () => 'audio/dramaticreveal.mp3'

  /**
   * Song that plays when warning is selected
   */
   warningMusic = () => 'audio/dramaticreveal.mp3'

   /**
   * Song that plays when success is selected
   */
  successMusic = () => 'audio/dramaticreveal.mp3'

  /**
   * Song that plays when danger is selected
   */
   dangerMusic = () => 'audio/dramaticreveal.mp3'
}

const audioLibrary = new AudioLibrary();

export default audioLibrary;
