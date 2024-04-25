import { EffectComposer, Glitch, Vignette } from '@react-three/postprocessing';
import React from 'react';
import { Vector2 } from 'three';

const DangerEffect = () => {
  return (
    <EffectComposer>
      {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
      {/* <Bloom luminanceThreshold={1} luminanceSmoothing={0.1} height={300} /> */}
      {/* <Noise opacity={0.02} /> */}
      {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}

      <Glitch
        delay={new Vector2(0.5, 1.5)} // min and max glitch delay
        duration={new Vector2(0.6, 1.5)} // min and max glitch duration
        strength={new Vector2(0.3, 1.0)} // min and max glitch strength
        //mode={GlitchMode.SPORADIC} // glitch mode
        active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
        ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
      />
      <Vignette
        offset={0.5} // vignette offset
        darkness={0.5} // vignette darkness
        eskil={false} // Eskil's vignette technique
        //blendFunction={BlendFunction.NORMAL} // blend mode
      />
    </EffectComposer>
  );
};

export default DangerEffect;
