import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import uploadOnCloudinary from '../utils/cloudinary.js';
import Blog from '../schema/Blog.js';
import User from '../schema/User.js';

// Normalise EditorJS content — accept { blocks: [] } or bare []
const normalizeContent = (content) => {
    if (!content) return { blocks: [] };
    if (Array.isArray(content)) return { blocks: content };
    if (content.blocks && Array.isArray(content.blocks)) return content;
    return { blocks: [] };
};

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

    return res.status(201).json(new ApiResponse(201, { blog_id: blog.blog_id }, 'Blog published successfully'))

})

// GET ALL BLOGS
const getAllBlogs = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({ draft: false })
        .populate('author', 'personal_info.fullname personal_info.username personal_info.profile_img')
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('blog_id title des banner tags activity publishedAt');

    const totalDocs = await Blog.countDocuments({ draft: false });

    return res.status(200).json(
        new ApiResponse(200, {
            blogs,
            totalDocs,
            page,
            hasMore: skip + blogs.length < totalDocs
        }, 'Blogs fetched successfully')
    );
});

// GET SINGLE BLOG
const getBlogById = asyncHandler(async (req, res) => {
    const { blog_id } = req.params;

    // Find first — reject drafts before touching read count
    const existing = await Blog.findOne({ blog_id });
    if (!existing) throw new ApiError(404, 'Blog not found');
    if (existing.draft) throw new ApiError(403, 'This blog is not published yet');

    const blog = await Blog.findOneAndUpdate(
        { blog_id, draft: false },
        { $inc: { 'activity.total_reads': 1 } },
        { new: true }
    ).populate('author', 'personal_info.fullname personal_info.username personal_info.profile_img personal_info.bio');

    // Also increment author's total_reads
    await User.findByIdAndUpdate(blog.author._id, {
        $inc: { 'account_info.total_reads': 1 }
    });

    return res.status(200).json(new ApiResponse(200, { blog }, 'Blog fetched successfully'));
});

// UPDATE BLOG
const updateBlog = asyncHandler(async (req, res) => {
    const { blog_id } = req.params;
    const { title, des, banner, content, tags, draft } = req.body;

    const blog = await Blog.findOne({ blog_id });
    if (!blog) throw new ApiError(404, 'Blog not found');

    if (blog.author.toString() !== req.user._id.toString()) {
        throw new ApiError(403, 'You are not authorized to edit this blog');
    }

    if (title !== undefined) blog.title = title;
    if (des !== undefined) blog.des = des;
    if (banner !== undefined) blog.banner = banner;
    if (content !== undefined) blog.content = normalizeContent(content);
    if (tags !== undefined) blog.tags = tags;
    if (draft !== undefined) blog.draft = draft;

    await blog.save();

    return res.status(200).json(new ApiResponse(200, { blog }, 'Blog updated successfully'));
});

// DELETE BLOG
const deleteBlog = asyncHandler(async (req, res) => {
    const { blog_id } = req.params;

    const blog = await Blog.findOne({ blog_id });
    if (!blog) throw new ApiError(404, 'Blog not found');

    if (blog.author.toString() !== req.user._id.toString()) {
        throw new ApiError(403, 'You are not authorized to delete this blog');
    }

    await Blog.deleteOne({ blog_id });
    await User.findByIdAndUpdate(req.user._id, {
        $pull: { blogs: blog._id },
        $inc: { 'account_info.total_posts': blog.draft ? 0 : -1 }
    });

    return res.status(200).json(new ApiResponse(200, {}, 'Blog deleted successfully'));
});

export { uploadBanner, createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };
