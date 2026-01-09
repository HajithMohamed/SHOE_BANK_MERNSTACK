const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAync");
const Image = require("../Models/Image");
const uploadToCloudinary = require("../Helper/cloudinary-helper")
const fs = require("fs")
const cloudinary = require("../Config/cloudinary-config")

const uploadImage = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("File is required", 400));
  }

  const { productId } = req.params;
  if (!productId) {
    return next(new AppError("Product ID is required", 400));
  }

  const { url, publicId } = await uploadToCloudinary(req.file.path);

  const image = await Image.create({
    url,
    publicId,
    uploadedBy: req.userInfo.userId,
    productId
  });

  fs.unlinkSync(req.file.path)

  res.status(201).json({
    status: "success",
    data: {
      image
    }
  });
});

const deleteImage = catchAsync(async (req, res, next) => {
  const { id: imageId } = req.params;
  const { productId } = req.body;

  // 1️⃣ Validate input
  if (!productId) {
    return next(new AppError("Product ID is required", 400));
  }

  // 2️⃣ Find image
  const image = await Image.findById(imageId);
  if (!image) {
    return next(new AppError("Image not found", 404));
  }

  // 3️⃣ Check product ownership
  if (image.productId.toString() !== productId) {
    return next(new AppError("Image does not belong to this product", 403));
  }

  // 4️⃣ Delete from Cloudinary
  await cloudinary.uploader.destroy(image.publicId);

  // 5️⃣ Delete from DB
  await Image.findByIdAndDelete(imageId);

  // 6️⃣ Send response
  res.status(200).json({
    status: "success",
    message: "Image deleted successfully"
  });
});

module.exports={
    uploadImage,
    deleteImage
}