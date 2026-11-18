import { OrganizationSchema } from "./Organization";
import { LocalBusinessSchema } from "./LocalBusiness";
import { FaqPageSchema } from "./Faq";
import { GalleryItemListSchema } from "./ItemList";
import { KaosProductSchema, PoloProductSchema } from "./Product";

export const getHomePageJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      OrganizationSchema,
      LocalBusinessSchema,
      KaosProductSchema,
      PoloProductSchema,
      FaqPageSchema,
      GalleryItemListSchema
    ]
  };
};
