import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
// import { upload } from '../middlewares/multer.middleware.js';

const uploadBanner = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new ApiError(400, 'No file uploaded');
    }

    const uploadedImage = await uploadOnCloudinary(req.file.path)

    if (!uploadedImage?.secure_url) {
        throw new ApiError(500, 'Failed to upload banner image');
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                bannerUrl: uploadedImage.secure_url,
                publicId: uploadedImage.public_id
            },
            'Banner uploaded successfully'
        )
    );
})

export default uploadBanner
