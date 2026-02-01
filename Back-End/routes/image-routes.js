const express = require("express");
const authMiddleware  = require("../Middlewares/auth-middleware");
const restrictTo = require("../Middlewares/role-base-access-middleware");
const uploadMiddleware = require("../Middlewares/upload-middleware");
const {uploadImage,deleteImage}= require("../Controller/image-controller")

const router = express.Router();

router.post("/upload-image/:productId",authMiddleware,restrictTo('admin'),uploadMiddleware.single("image",5),uploadImage);
router.delete("/delete-image/:id",authMiddleware,restrictTo('admin'),deleteImage)

module.exports = router;