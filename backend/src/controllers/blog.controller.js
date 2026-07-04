import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import Blog from '../schema/Blog.js';
import User from '../schema/User.js';

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

// CREATE BLOG
const createBlog = asyncHandler(async (req, res) => {
    const { title, des, banner, content, tags, draft } = req.body;
    const authorId = req.user._id // from verifyToken middleware

    if (!title) {
        throw new ApiError(400, 'Title is required')
    }

    // Generate unique blog_id from title + timestamp

    const blog_id = title
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase()
        .slice(0, 50) + '-' +
        Date.now();

    const blog = await Blog.create({
        blog_id,
        title,
        des,
        banner,
        content,
        tags,
        author: authorId,
        draft: draft ?? false
    });

    // Update user's blog count
    await User.findByIdAndUpdate(authorId, {
        $inc: {
            'account_info.total_posts': draft ? 0 : 1
        },
        $push: {
            blogs: blog._id
        }
    })

    return res.status(201).json(new ApiResponse(201, { blog_id: blog.blog_id }, 'Blog published scccessfully'))

})


export { uploadBanner, createBlog };
