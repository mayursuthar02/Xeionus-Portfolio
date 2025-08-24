import { Artwork } from "../types/artwork";

// Import all images from two folders
const xeionusImages = import.meta.glob("../assets/Xeionus/*.{jpg,png,webp}", { eager: true });
const shadowArtImages = import.meta.glob("../assets/ShadowArt/*.{jpg,png,webp}", { eager: true });

// Merge both folder images into one array
const rawImages: string[] = [
  ...Object.values(xeionusImages).map((img: any) => img.default),
  ...Object.values(shadowArtImages).map((img: any) => img.default),
];

// Finally create artworks array with id + imageUrl
export const artworks: Artwork[] = rawImages.map((image, index) => ({
  id: index + 1,
  imageUrl: image,
}));
