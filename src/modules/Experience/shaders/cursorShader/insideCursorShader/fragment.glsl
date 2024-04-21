varying vec2 vUv;

uniform sampler2D uMap;

void main() {
    float texture = texture(uMap, vUv).r;

    gl_FragColor = vec4(0.13, 0.02, 0.20, texture);
}