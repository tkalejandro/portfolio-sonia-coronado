//Plane
varying vec2 vUv;
uniform float uTime; // Uniform variable for time

void main()
{
    // Rotate the position of the plane based on time
    float angle = uTime ; // You can adjust this value to control the rotation speed
    mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    vec2 rotatedPosition = rotationMatrix * position.xy;

    // Set the rotated position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(rotatedPosition, 0.0, 1.0);

    // Pass through the texture coordinates
    vUv = uv;
}
