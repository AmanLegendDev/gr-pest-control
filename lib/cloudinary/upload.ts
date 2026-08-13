import { UploadApiResponse } from "cloudinary";

import cloudinary from "@/lib/cloudinary/cloudinary";

export async function uploadImage(
  file: File,
  folder: string,
): Promise<UploadApiResponse> {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<UploadApiResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary upload returned no result."));
          return;
        }

        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
}