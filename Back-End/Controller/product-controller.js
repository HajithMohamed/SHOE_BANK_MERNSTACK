const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Product = require("../Models/Product");
const Image = require("../Models/Image");
const cloudinary = require("../Config/cloudinary-config");

/* ===============================
   ADD PRODUCT
================================ */

const addProduct = catchAsync(async (req, res, next) => {
  const { artNo, brand, price, category, color, stock, sizes } = req.body;

  // Required field check
  if (!artNo || !brand || !price || !category || !sizes?.length) {
    return next(new AppError("Missing required fields", 400));
  }

  // Check if product already exists
  const existingProduct = await Product.findOne({ artNo });
  if (existingProduct) {
    return next(new AppError("This product already exists", 409));
  }

  // Create product
  const newProduct = await Product.create({
    artNo,
    brand,
    price,
    category,
    color,
    stock,
    sizes
  });

  // Handle images if uploaded
  if (req.files && req.files.length > 0) {
    const imagePromises = req.files.map(async (file) => {
      const { url, publicId } = await uploadToCloudinary(file.path);
      return Image.create({
        url,
        publicId,
        uploadedBy: req.userInfo.userId,
        productId: newProduct._id
      });
    });
    await Promise.all(imagePromises);
  }

  // Populate images in the response
  const productWithImages = await Product.findById(newProduct._id).populate("images");

  res.status(201).json({
    status: "success",
    message: "Product added successfully",
    data: { product: productWithImages }
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
   UPDATE PRODUCT (SAFE FIELDS)
================================ */
const updateProduct = catchAsync(async (req, res, next) => {
  const allowedFields = [
    "price",
    "stock",
    "color",
    "sizes",
    "category"
  ];

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
   DELETE PRODUCT + IMAGES
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
   FILTER + SEARCH + SORT
================================ */
const filterSearch = catchAsync(async (req, res, next) => {
  const {
    sizes,
    brand,
    category,
    color,
    minPrice,
    maxPrice,
    search,
    sort
  } = req.query;

  const queryObj = {};

  if (sizes) {
    queryObj.sizes = {
      $in: sizes.split(",").map(Number)
    };
  }

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

  const sortBy = sort || "-createdAt";

  const products = await Product
    .find(queryObj)
    .sort(sortBy)
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
