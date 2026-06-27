import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import ApiError from './ApiError.js';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        // No file to upload
        if (!localFilePath) {
            return null; 
        }

         // upload the file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'image', 
            folder: 'blognest/banners',
        })

        fs.unlinkSync(localFilePath); // Delete the local file from server after upload

        return response;
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Delete the local file if it exists
        }
        // Wrap raw Cloudinary errors so the global error handler returns a consistent response
        throw new ApiError(500, error?.message || 'Cloudinary upload failed');
    }
}

export default uploadOnCloudinary;