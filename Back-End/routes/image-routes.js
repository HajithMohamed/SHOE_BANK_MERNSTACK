const express = require("express");
const authMiddleware  = require("../Middlewares/auth-middleware");
const adminMiddleware = require("../Middlewares/admin-middleware");
const uploadMiddleware = require("../Middlewares/upload-middleware");
const {uploadImage}= require("../Controller/image-controller")

const router = express.Router();

router.post("/upload-image",authMiddleware,adminMiddleware,uploadMiddleware.array("images",5),uploadImage);

module.exports = router;