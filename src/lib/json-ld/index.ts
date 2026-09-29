import { OrganizationSchema } from "./Organization";
import { LocalBusinessSchema } from "./LocalBusiness";
import { FaqPageSchema } from "./Faq";
import { GalleryItemListSchema } from "./ItemList";

export const getHomePageJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      OrganizationSchema,
      LocalBusinessSchema,
      FaqPageSchema,
      GalleryItemListSchema
    ]
  };
};
