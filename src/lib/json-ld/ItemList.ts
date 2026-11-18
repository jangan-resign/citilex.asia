import { gallerySlides, portfolioItems } from "../data";
import { OrganizationSchema } from "./Organization";

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

export const PortfolioItemListSchema = {
  "@type": "ItemList",
  "@id": "https://citilex.asia/portofolio#itemlist",
  "name": "Portofolio Produksi Kaos & Polo Shirt CITILEX ASIA",
  "numberOfItems": portfolioItems.length,
  "itemListElement": portfolioItems.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "CreativeWork",
      "name": item.title,
      "description": `${item.category} untuk ${item.client} (${item.year}) - Jumlah: ${item.qty}, Teknik: ${item.technique}.`,
      "image": `https://citilex.asia${item.image}`,
      "dateCreated": item.year,
      "creator": {
        "@id": OrganizationSchema["@id"]
      }
    }
  }))
};
