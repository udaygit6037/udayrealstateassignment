import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a LOCAL FILE to Cloudinary
export async function uploadLocalImageToCloudinary(filePath, folder = "realtrust-projects") {
  try {
    const isSvg = filePath.endsWith(".svg");

    const options = {
      folder,
      resource_type: "image",
    };

    if (!isSvg) {
      options.transformation = [
        { width: 800, height: 600, crop: "fill", quality: "auto" },
      ];
    }

    const result = await cloudinary.uploader.upload(filePath, options);
    return result.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error.message);
    throw error;
  }
}

export default cloudinary;
