const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Product = require("../Models/Product");
const Image = require("../Models/Image");
const cloudinary = require("../Config/cloudinary-config");
const filterObj = require("../utils/filter-object");

/* =====================================
   ADD PRODUCT (ADMIN)
===================================== */
exports.addProduct = catchAsync(async (req, res, next) => {

  const filteredBody = filterObj(
    req.body,
    "artNo",
    "brand",
    "category",
    "color",
    "inrCost",
    "discountPercent",
    "currencyRate",
    "sizeFrom",
    "sizeTo",
    "setWeightInGrams",
    "clearanceCostPerKg"
  );

  const existing = await Product.findOne({ artNo: filteredBody.artNo });
  if (existing) {
    return next(new AppError("Product already exists", 409));
  }

  // Generate sizes automatically
  let sizes = [];
  for (let i = filteredBody.sizeFrom; i <= filteredBody.sizeTo; i++) {
    sizes.push(i);
  }
  filteredBody.sizes = sizes;

  // XL logic
  if (
    (filteredBody.category === "Gents" && filteredBody.sizeFrom >= 11) ||
    (filteredBody.category === "Ladies" && filteredBody.sizeFrom >= 10)
  ) {
    filteredBody.isXL = true;
  }

  const newProduct = await Product.create(filteredBody);

  res.status(201).json({
    status: "success",
    data: newProduct
  });
});


/* =====================================
   UPDATE PRODUCT (ADMIN)
===================================== */
exports.updateProduct = catchAsync(async (req, res, next) => {

  const filteredBody = filterObj(
    req.body,
    "brand",
    "category",
    "color",
    "inrCost",
    "discountPercent",
    "currencyRate",
    "sizeFrom",
    "sizeTo",
    "setWeightInGrams",
    "clearanceCostPerKg"
  );

  if (filteredBody.sizeFrom && filteredBody.sizeTo) {
    let sizes = [];
    for (let i = filteredBody.sizeFrom; i <= filteredBody.sizeTo; i++) {
      sizes.push(i);
    }
    filteredBody.sizes = sizes;
  }

  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    { new: true, runValidators: true }
  );

  if (!updated) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: updated
  });
});


/* =====================================
   DELETE PRODUCT (ADMIN)
===================================== */
exports.deleteProduct = catchAsync(async (req, res, next) => {

  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  const images = await Image.find({ productId: product._id });

  for (const img of images) {
    await cloudinary.uploader.destroy(img.publicId);
  }

  await Image.deleteMany({ productId: product._id });
  await Product.findByIdAndDelete(product._id);

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully"
  });
});


/* =====================================
   GET ALL PRODUCTS (ADMIN VIEW)
   (Shows cost fields)
===================================== */
eexports.getAllProductsAdmin = catchAsync(async (req, res) => {

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

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

  // Size filter
  if (sizes) {
    queryObj.sizes = { $in: sizes.split(",").map(Number) };
  }

  // Basic filters
  if (brand) queryObj.brand = brand;
  if (category) queryObj.category = category;
  if (color) queryObj.color = color;

  // Price filter
  if (minPrice || maxPrice) {
    queryObj.finalPrice = {};
    if (minPrice) queryObj.finalPrice.$gte = Number(minPrice);
    if (maxPrice) queryObj.finalPrice.$lte = Number(maxPrice);
  }

  // Search
  if (search) {
    queryObj.$or = [
      { artNo: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } }
    ];
  }

  const sortBy = sort || "-createdAt";

  const products = await Product.find(queryObj)
    .select("+inrCost +currencyRate +clearanceCostPerKg")
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .populate("images");

  const total = await Product.countDocuments(queryObj);

  res.status(200).json({
    status: "success",
    total,
    page,
    results: products.length,
    data: products
  });
});

exports.getSingleProductAdmin = catchAsync(async (req, res, next) => {

  const productId = req.params.id;

  const product = await Product
    .findById(productId)
    .select("+inrCost +currencyRate +clearanceCostPerKg")
    .populate("images");

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Product retrieved successfully",
    data: product
  });

});
