const catchAsync = require("../utils/catchAync");
const AppError = require("../utils/appError");
const Product = require("../Models/Product");

/* ===============================
   GET FEATURED PRODUCTS
================================ */
const showFeaturedProduct = catchAsync(async (req, res, next) => {
  const products = await Product.find({ isFeatured: true }).populate("images");

  res.status(200).json({
    status: "success",
    results: products.length,
    data: { products }
  });
});

/* ===============================
   GET NEW ARRIVAL PRODUCTS
================================ */
const showNewArrivalProducts = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10; // optional query param
  const products = await Product.find()
    .sort({ createdAt: -1 }) // newest first
    .limit(limit)
    .populate("images");

  res.status(200).json({
    status: "success",
    results: products.length,
    data: { products }
  });
});

/* ===============================
   GET ON DEAL PRODUCTS
================================ */
const showOnDealProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ isOnDeal: true }).populate("images");

  res.status(200).json({
    status: "success",
    results: products.length,
    data: { products }
  });
});

/* ===============================
   GET PRODUCTS BY CATEGORY
================================ */
const showCategoryProducts = catchAsync(async (req, res, next) => {
  const { category } = req.params;

  const products = await Product.find({ category }).populate("images");

  res.status(200).json({
    status: "success",
    results: products.length,
    data: { products }
  });
});

module.exports = {
  showFeaturedProduct,
  showNewArrivalProducts,
  showOnDealProducts,
  showCategoryProducts
};
