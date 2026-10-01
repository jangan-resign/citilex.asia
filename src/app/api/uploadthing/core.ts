import { createUploadthing, type FileRouter } from "uploadthing/next";
import { prisma } from "../../../lib/prisma";
import { compileKarinaContext } from "../../../actions/playbook";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  assetUploader: f({ image: { maxFileSize: "32MB" }, pdf: { maxFileSize: "64MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      return { userId: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // Simpan metadata ke DB agar tidak hilang meskipun client crash
      const asset = await prisma.asset.create({
        data: {
          name: file.name,
          type: file.type.startsWith("image/") ? "image" : "pdf",
          url: file.url,
          size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        },
      });

      // Auto-compile context Karina agar tahu ada aset baru
      await compileKarinaContext();

      console.log("Asset saved to DB:", asset.id, "for userId:", metadata.userId);
      return { assetId: asset.id };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

