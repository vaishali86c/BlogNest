import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import uploadBanner from '../controllers/blog.controller.js';


const router = Router()

router.post('/upload-banner', verifyToken, upload.single('banner'), uploadBanner);

export default router;