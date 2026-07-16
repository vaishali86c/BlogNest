import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { uploadBanner, createBlog, getAllBlogs, getBlogById, deleteBlog, updateBlog } from '../controllers/blog.controller.js';


const router = Router()

router.post('/upload-banner', verifyToken, upload.single('banner'), uploadBanner);
router.post('/create', verifyToken, createBlog);
router.get('/', getAllBlogs);
router.get('/:blog_id', getBlogById);
router.put('/:blog_id', verifyToken, updateBlog);
router.delete('/:blog_id', verifyToken, deleteBlog);

export default router;