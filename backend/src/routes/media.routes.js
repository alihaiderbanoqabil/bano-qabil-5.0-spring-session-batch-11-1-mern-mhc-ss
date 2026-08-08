const express = require("express");
const router = express.Router();
const cloudinaryUpload = require("../middlewares/cloudinaryUpload");
const {
    uploadMedia,
    uploadMultipleMedia,
    deleteMedia,
    updateMedia,
} = require("../controllers/media.controller");
const { authenticate } = require("../middlewares");

router.post("/upload", authenticate, cloudinaryUpload.single("file"), uploadMedia);

router.post("/upload-multiple", authenticate, cloudinaryUpload.array("files", 5), uploadMultipleMedia);

router.put("/upload/:id", authenticate, cloudinaryUpload.single("file"), updateMedia);

router.delete("/upload/:id", authenticate, deleteMedia);

module.exports = router;
