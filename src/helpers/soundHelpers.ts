import { Dispatch, MutableRefObject, RefObject, SetStateAction } from 'react';

/**
 * Helpers to interact with sounds.
 * If you have a cool function, share it to the world.
 */
class SoundHelpers {
  /**
   * Function that helps to change the volume of a sound in a smooth way in X seconds.
   * To prevent the function been call many times you could use the progress and setProgress params.
   * @param audioElement
   * @param targetVolume
   * @param durationInSeconds
   * @param progress
   * @param setProgress
   */
  smoothVolumeChange = async (
    audioElement: RefObject<HTMLAudioElement>,
    targetVolume: number,
    durationInSeconds: number,
    progress: boolean,
    setProgress: Dispatch<SetStateAction<boolean>>,
  ) => {
    
    if (targetVolume < 0 || targetVolume > 1) {
      throw new Error(
        `Please provide a targetVolume between 0 and 1. You provided: ${audioElement.current?.TEXT_NODE}`,
      );
    }
    if (progress) {
      //console.warn('Opps! Change is in progress');
      return;
    }
    setProgress(true);

    if (!audioElement.current) {
      // Handle the case where audioElement.current is null
      return;
    }

    const framesPerSecond = 60;
    const totalFrames = durationInSeconds * framesPerSecond;
    const frameDuration = 1000 / framesPerSecond;
    const currentVolume = audioElement.current.volume;

    const volumeChangePerFrame = (targetVolume - currentVolume) / totalFrames;

    let currentFrame = 0;

    const intervalId = setInterval(() => {
      currentFrame++;

      // Calculate the new volume for this frame
      const newVolume = currentVolume + volumeChangePerFrame * currentFrame;
      if (audioElement && audioElement.current) {
        // Update the volume (replace this with your actual volume update logic)
        audioElement.current.volume = newVolume;
        //console.log(`Updating volume to: ${newVolume.toFixed(2)}`);

        // Check if the target volume is reached
        if (currentFrame === totalFrames) {
          clearInterval(intervalId);
          //console.log('Volume change complete');
          setProgress(false);
        }
      }
    }, frameDuration);
  };

  /**
   * Function that helps to handle many changes at the same time.
   * @param changes
   */
  async handleManyChanges(changes: Array<() => Promise<void>>): Promise<void> {
    await Promise.all(changes.map((change) => change()));
  }
}

const soundHelpers = new SoundHelpers();

export default soundHelpers;
