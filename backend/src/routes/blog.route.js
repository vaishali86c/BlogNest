import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { uploadBanner, createBlog } from '../controllers/blog.controller.js';


const router = Router()

router.post('/upload-banner', verifyToken, upload.single('banner'), uploadBanner);
router.post('/create', verifyToken, createBlog);

export default router;