import { EffectComposer, Glitch, Vignette } from '@react-three/postprocessing';
import React from 'react';
import { Vector2 } from 'three';

const DangerEffect = () => {
  return (
    <EffectComposer>
      <Glitch
        delay={new Vector2(0.5, 1.5)} // min and max glitch delay
        duration={new Vector2(0.6, 1.5)} // min and max glitch duration
        strength={new Vector2(0.3, 1.0)} // min and max glitch strength
        active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
        ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
      />
      <Vignette
        offset={0.5} // vignette offset
        darkness={0.5} // vignette darkness
        eskil={false} // Eskil's vignette technique
      />
    </EffectComposer>
  );
};

export default DangerEffect;
