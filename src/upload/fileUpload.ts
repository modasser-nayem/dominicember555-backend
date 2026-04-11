import multer from "multer";
import AppError from "../errors/AppError";
import { uploadToCloudinary } from "../upload/uploadToCloudinary";

// =========================
//    File Upload
// =========================
// Memory storage configuration
const storage = multer.memoryStorage();

export const uploadFile = multer({
  storage: storage,
  limits: { fileSize: 8 * 1024 * 1024 },
});

// =========================
//    File Upload
// =========================
/**
 * Upload a file using Cloudinary
 * @param file - Express.Multer.File
 * @param fileName - Friendly name for error messages
 * @returns secure_url of uploaded file
 */
export const uploadFileToCloud = async (
  file: Express.Multer.File,
  fileName: string,
) => {
  if (!file) {
    throw new AppError(400, `${fileName} image is required`);
  }

  const result = await uploadToCloudinary(file);
  return result;
};
