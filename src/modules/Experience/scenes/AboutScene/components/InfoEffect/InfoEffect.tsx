import { EffectComposer, Scanline } from '@react-three/postprocessing';
import React from 'react';

const InfoEffect = () => {
  return (
    <EffectComposer>
      <Scanline
        //blendFunction={BlendFunction.OVERLAY} // blend mode
        density={1.25} // scanline density
      />
    </EffectComposer>
  );
};

export default InfoEffect;
