import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function uploadFileToCloudinary(filePath: string, originalName: string) {
    const ext = path.extname(originalName).toLowerCase();
    let resource_type: "image" | "raw" | "auto" = "auto";
    if ([".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"].includes(ext)) {
        resource_type = "image";
    } else if ([".pdf", ".xls", ".xlsx", ".csv"].includes(ext)) {
        resource_type = "raw";
    }
    const result = await cloudinary.uploader.upload(filePath, {
        resource_type,
        public_id: path.parse(originalName).name,
        use_filename: true,
        unique_filename: false,
        overwrite: true
    });
    return result;
}
