varying vec2 vUv;

uniform float uFull;
uniform sampler2D uPerlinTexture;

vec2 rotate2D(vec2 value, float angle)
{
    float s = sin(angle + 0.5);
    float c = cos(angle + 0.5);
    mat2 m = mat2(c, s, -s, c);
    return m * value;
}

void main() {
    vec3 newPosition = position;

    // Twist
    float twistPerlin = texture(
        uPerlinTexture,
        vec2(0.5, sin(uv.y * 0.2 - uFull * 0.005))
    ).r;
    float angle = twistPerlin * 5.0;
    newPosition.xy = rotate2D(newPosition.xy, angle);

    // Final position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    vUv = uv;
}