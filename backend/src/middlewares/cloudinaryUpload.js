const multer = require("multer");
// connects multer directly to Cloudinary, so files go straight to Cloudinary instead of being saved locally first
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "bano-qabil-ecommerce-backend",           // Cloudinary folder name
        allowed_formats: ["jpg", "png", "jpeg", "webp", "mp4"],
        resource_type: "auto", // lets Cloudinary detect image/video/raw automatically
    
    },
});

const cloudinaryUpload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit, adjust as needed
});

module.exports = cloudinaryUpload;