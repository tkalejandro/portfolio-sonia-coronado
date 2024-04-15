varying vec2 vUv;

void main() {
    float strength = 1.0 - step(0.5, distance(vUv, vec2(0.5)) + 0.25);
    gl_FragColor = vec4(1.0, 0.0, 1.0, strength);
}