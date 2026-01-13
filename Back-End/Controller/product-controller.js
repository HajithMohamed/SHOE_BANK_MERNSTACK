const catchAsync = require("../utils/catchAync");
const AppError = require("../utils/appError");
const Product = require("../Models/Product");
const Image = require("../Models/Image");
const cloudinary = require("../Config/cloudinary-config");

/* ===============================
   ADD PRODUCT
================================ */
const addProduct = catchAsync(async (req, res, next) => {
  const { artNo, brand, price, category, color, stock, size } = req.body;

  if (!artNo || !brand || !price || !category || !size) {
    return next(new AppError("Missing required fields", 400));
  }

  const existingProduct = await Product.findOne({ artNo });
  if (existingProduct) {
    return next(new AppError("This product already exists", 409));
  }

  const product = await Product.create({
    artNo,
    brand,
    price,
    category,
    color,
    stock,
    size
  });

  res.status(201).json({
    status: "success",
    message: "Product added successfully",
    data: { product }
  });
});

/* ===============================
   GET ALL PRODUCTS (PAGINATED)
================================ */
const getAllProduct = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    results: res.paginatedResults.results.length,
    data: res.paginatedResults
  });
});

/* ===============================
   GET PRODUCT BY ID (WITH IMAGES)
================================ */
const getProductById = catchAsync(async (req, res, next) => {
  const product = await Product
    .findById(req.params.id)
    .populate("images");

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { product }
  });
});

/* ===============================
   UPDATE PRODUCT (SAFE)
================================ */
const updateProduct = catchAsync(async (req, res, next) => {
  const allowedFields = ["price", "stock", "color", "size", "category"];

  const filteredBody = {};
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      filteredBody[field] = req.body[field];
    }
  });

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
    data: { product: updatedProduct }
  });
});

/* ===============================
   DELETE PRODUCT (WITH IMAGES)
================================ */
const deleteProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  const images = await Image.find({ productId });

  for (const img of images) {
    await cloudinary.uploader.destroy(img.publicId);
  }

  await Image.deleteMany({ productId });
  await Product.findByIdAndDelete(productId);

  res.status(200).json({
    status: "success",
    message: "Product and related images deleted successfully"
  });
});

/* ===============================
   FILTER + SEARCH PRODUCTS
================================ */
const filterSearch = catchAsync(async (req, res, next) => {
  const {
    size,
    brand,
    category,
    color,
    minPrice,
    maxPrice,
    search
  } = req.query;

  const queryObj = {};

  if (size) queryObj.size = { $in: size.split(",") };
  if (brand) queryObj.brand = brand;
  if (category) queryObj.category = category;
  if (color) queryObj.color = color;

  if (minPrice || maxPrice) {
    queryObj.price = {};
    if (minPrice) queryObj.price.$gte = Number(minPrice);
    if (maxPrice) queryObj.price.$lte = Number(maxPrice);
  }

  if (search) {
    queryObj.$or = [
      { artNo: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } }
    ];
  }

  const products = await Product
    .find(queryObj)
    .populate("images");

  res.status(200).json({
    status: "success",
    results: products.length,
    data: { products }
  });
});

module.exports = {
  addProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  filterSearch
};
