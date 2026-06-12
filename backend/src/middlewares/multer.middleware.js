// Frontend/Postman uploads image with key "banner"
// ↓
// Multer receives file
// ↓
// Checks file size
// ↓
// Checks file type
// ↓
// Saves file temporarily in public/temp
// ↓
// Controller uploads that file to Cloudinary
// ↓
// Local temp file gets deleted

import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/temp') // Temporary storage location
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
      cb(null, true);
      return;
    }
        cb(new Error('Only image files are allowed'));
    }
})