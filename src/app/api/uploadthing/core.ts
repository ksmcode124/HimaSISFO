import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import {prisma} from "@/lib/prisma";


const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .onUploadComplete(async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("file url", file);

      await prisma.anggota.create({
      data: {  
        nama_anggota: file.name,
        jabatan: file.name,
        foto_anggota: file.ufsUrl, 
        id_departemen: 1,},
    });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
