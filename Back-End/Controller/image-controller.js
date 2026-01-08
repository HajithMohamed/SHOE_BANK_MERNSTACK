const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAync");
const Image = require("../Models/Image");
const uploadToCloudinary = require("../Helper/cloudinary-helper")

const uploadImage = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("File is required", 400));
  }

  const { productId } = req.body;
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

  res.status(201).json({
    status: "success",
    data: {
      image
    }
  });
});


module.exports={
    uploadImage,
}