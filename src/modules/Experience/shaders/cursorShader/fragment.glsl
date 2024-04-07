varying vec2 vUv;
uniform sampler2D note;

void main() {
    float map = texture(note, vUv).r;
    gl_FragColor = vec4(map, map, map, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}