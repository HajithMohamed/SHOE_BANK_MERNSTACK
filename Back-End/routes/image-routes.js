const express = require("express");
const authMiddleware  = require("../Middlewares/auth-middleware");
const adminMiddleware = require("../Middlewares/admin-middleware");
const uploadMiddleware = require("../Middlewares/upload-middleware");
const {uploadImage}= require("../Controller/image-controller")

const router = express.Router();

router.post("/upload-imag",authMiddleware,adminMiddleware,uploadMiddleware,uploadImage);

module.exports = router;