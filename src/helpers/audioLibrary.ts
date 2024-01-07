/**
 * Library to render fast an Audio.
 */
class AudioLibrary {
  /**
   * Guitar strings that can be mixed with base.
   */
  guitars = () => new Audio('audio/guitars.mp3');

  /**
   * Sound that will be playing when getting near the secret.
   */
  stringsSecretApproach = () => new Audio('audio/stringsSecretApproach.mp3');

  /**
   * Sound that will be add in the project after user close the secret modal.
   */
  synthPostSecret = () => new Audio('audio/synthPostSecret.mp3');

  /**
   * This is the base song for the project.
   */
  synthBase = () => new Audio('audio/synthBase.mp3');
  /**
   * Song that will be located at the Audiolibrary.
   */
  omnisphereExperiment() {
    return new Audio('audio/omnisphereExperiment.wav');
  }
}

const audioLibrary = new AudioLibrary();

export default audioLibrary;
