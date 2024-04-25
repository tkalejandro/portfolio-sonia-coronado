import { EffectComposer, Noise } from '@react-three/postprocessing';
import React from 'react';

const WarningEffect = () => {
  return (
    <EffectComposer>
      <Noise
        premultiply // enables or disables noise premultiplication
        //blendFunction={BlendFunction.ADD} // blend mode
      />
    </EffectComposer>
  );
};

export default WarningEffect;
