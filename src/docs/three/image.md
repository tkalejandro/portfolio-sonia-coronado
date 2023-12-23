# Image
In this project, we aim to avoid hardcoded strings and facilitate the reuse of images for a more maintainable codebase.

## Adding new images
To add a new image, navigate to the public public/images folder and add the new image. Ensure that you are using a valid image format, and we recommend using widely supported formats like jpeg or webp. Keep in mind the file size, and consider using compressed formats for optimal performance.

## Image library helper
All images should be reusable, and thus, they need to be added to the imageLibrary inside the helpers folder. This helper initializes an image and makes it easy to find when needed. It also ensures code safety, as developers won't need to change the path every time a new image is used. If the image path changes for any reason, it only needs to be updated in one place.

## Example using an image
Here's a dummy use of an image. Adapt it to your specific circumstances:

```
import { imageLibrary } from '@/helpers';
// ...

const image = imageLibrary.tlou2_1;

const displayImage = () => {
  // Example usage in React component
  // <img src={image} alt="The Last of Us 1" />
};
```