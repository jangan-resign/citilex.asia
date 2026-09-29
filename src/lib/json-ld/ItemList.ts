import { gallerySlides } from "../data";

export const GalleryItemListSchema = {
  "@type": "ItemList",
  "name": "Galeri Produksi CITILEX ASIA",
  "itemListElement": gallerySlides.map((slide, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "ImageObject",
      "url": `https://citilex.asia${slide.image}`,
      "name": slide.title,
      "description": slide.desc
    }
  }))
};
