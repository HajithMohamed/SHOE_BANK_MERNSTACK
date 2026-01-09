const express = require("express");
const authMiddleware  = require("../Middlewares/auth-middleware");
const adminMiddleware = require("../Middlewares/admin-middleware");
const uploadMiddleware = require("../Middlewares/upload-middleware");
const {uploadImage,deleteImage}= require("../Controller/image-controller")

const router = express.Router();

router.post("/upload-image/:productId",authMiddleware,adminMiddleware,uploadMiddleware.single("image",5),uploadImage);
router.delete("/delete-image/:id",authMiddleware,adminMiddleware,deleteImage)

module.exports = router;