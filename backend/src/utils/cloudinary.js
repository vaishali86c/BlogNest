import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';  


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
        throw error; // Rethrow the error to be handled by the caller
    }
}

export default uploadOnCloudinary;