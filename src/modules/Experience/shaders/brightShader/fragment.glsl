// We get this from the vertex vUv
varying vec2 vUv;

void main()
{
    float angle = atan(vUv.x - 0.5, vUv.y - 0.5) / (3.141592653589793 * 2.0) + 0.5;
    float strength = mod(angle * 50.0, 1.0);

    // Determine the color based on the strength
    vec3 color;
    if (strength < 0.5) {
        color = vec3(0.0); // Bright color 1
    } else {
        color = vec3(0.7); // Bright color 2
    }

    // Mix with a darker shade of gray instead of black for softer borders
    vec3 darkGray = vec3(0.15); // Adjust the darkness of gray as needed
    vec3 finalColor = mix(color, darkGray, 0.9); // Adjust the mixing factor as needed

    // Set the alpha channel to control transparency
    float alpha = 0.15; // Adjust the transparency level as needed
    gl_FragColor = vec4(finalColor, alpha);
}
