/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { Readable } from "stream";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

// ----------------------
// Cloudinary Configuration
// ----------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// ----------------------
// Types
// ----------------------
interface UploadResponse {
  secure_url: string;
  public_id: string;
}

interface FileObject {
  originalname: string;
  path?: string;
  buffer?: Buffer;
  mimetype: string;
}

// ----------------------
// Helpers
// ----------------------
const bufferToStream = (buffer: Buffer) => {
  const readable = new Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
};

/**
 * Extract public_id from Cloudinary URL
 */
export const getPublicIdFromUrl = (url: string): string => {
  try {
    const parts = url.split("/");
    const uploadIndex = parts.findIndex((part) => part === "upload");
    if (uploadIndex === -1) throw new Error("Invalid Cloudinary URL");

    let publicIdParts = parts.slice(uploadIndex + 1);

    // Remove version if present (v123456789)
    if (
      publicIdParts[0].startsWith("v") &&
      /^\d+$/.test(publicIdParts[0].slice(1))
    ) {
      publicIdParts = publicIdParts.slice(1);
    }

    // Remove file extension
    const lastPart = publicIdParts.pop()!;
    const fileNameWithoutExt = lastPart.replace(/\.[^/.]+$/, "");
    publicIdParts.push(fileNameWithoutExt);

    return publicIdParts.join("/");
  } catch (error) {
    throw new AppError(400, "Cannot extract public_id from URL");
  }
};

// ----------------------
// Upload Functions
// ----------------------
export const uploadToCloudinary = async (
  file: FileObject,
  folder: string = "uploads",
): Promise<UploadResponse> => {
  try {
    let uploadStream: Readable;

    if (file.path) {
      try {
        await fs.promises.access(file.path, fs.constants.F_OK);
        uploadStream = fs.createReadStream(file.path);
      } catch {
        throw new AppError(400, `File not found at path: ${file.path}`);
      }
    } else if (file.buffer) {
      uploadStream = bufferToStream(file.buffer);
    } else {
      throw new AppError(400, "Neither file path nor buffer is available");
    }

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder }, // dynamic folder
        (error, result) => {
          if (error || !result) {
            console.error("Cloudinary upload error:", error);
            return reject(new AppError(500, "Failed to upload file"));
          }
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        },
      );
      uploadStream.pipe(stream);
    });
  } catch (error) {
    console.error(`Error uploading file: ${file.originalname}`, error);
    throw error;
  }
};

export const uploadPDFBufferToCloudinary = async (
  pdfBuffer: Uint8Array,
  fileName: string,
  folder: string = "pdfs",
): Promise<UploadResponse> => {
  if (!pdfBuffer || pdfBuffer.length === 0) {
    throw new AppError(400, "PDF buffer is empty");
  }

  const stream = bufferToStream(Buffer.from(pdfBuffer));

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw", // for PDF, docs
        folder,
        public_id: fileName.replace(/\s+/g, "_"),
      },
      (error, result) => {
        if (error || !result) {
          console.error("Cloudinary PDF upload error:", error);
          return reject(new AppError(500, "Failed to upload PDF"));
        }
        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );

    stream.pipe(uploadStream);
  });
};

// ----------------------
// Delete Functions
// ----------------------
export const deleteFromCloudinary = async (
  identifier: string,
): Promise<void> => {
  try {
    let publicId = identifier;

    // If URL is passed, extract public_id
    if (identifier.startsWith("http")) {
      publicId = getPublicIdFromUrl(identifier);
    }

    // Detect resource_type
    let resourceType: "image" | "raw" = "image"; // default
    if (identifier.includes("/raw/") || identifier.endsWith(".pdf")) {
      resourceType = "raw";
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    if (result.result !== "ok" && result.result !== "not found") {
      throw new AppError(500, `Cloudinary delete failed: ${result.result}`);
    }

    console.log(`Successfully deleted: ${publicId}`);
  } catch (error: any) {
    console.error(`Error deleting file: ${identifier}`, error);
    throw new AppError(500, `Failed to delete file: ${error?.message}`);
  }
};

export const deleteMultipleFromCloudinary = async (
  identifiers: string[],
): Promise<void> => {
  if (!Array.isArray(identifiers) || identifiers.length === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "No file identifiers provided");
  }

  await Promise.all(identifiers.map((id) => deleteFromCloudinary(id)));
  console.log(`Successfully deleted files: ${identifiers.join(", ")}`);
};
