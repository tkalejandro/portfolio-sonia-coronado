precision mediump float;

varying vec2 vUv;
varying float vWave;
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 pointer;

const float radius = 0.6;
const float strength = 1.1;

vec2 bulge(vec2 uv, vec2 center) {
  uv -= center;
  
  float dist = length(uv) / radius; // distance from UVs divided by radius
  float distPow = pow(dist, 2.); // exponential
  float strengthAmount = strength / (1.0 + distPow); // Invert bulge and add a minimum of 1)
  uv *= strengthAmount; 
  
  uv += center;

  return uv;
}

void main() {
  float wave = vWave ;
  vec2 center = vec2(0.5, 0.5);
  vec2 bulgeUV = bulge(vUv, pointer);
  vec3 texture = texture2D(uTexture, vUv + wave).rgb;
  gl_FragColor = vec4(texture, 1.);
}