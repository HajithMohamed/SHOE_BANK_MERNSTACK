const catchAsync = require("../utils/catchAync");
const AppError = require("../utils/appError");
const Product = require("../Models/Product");

/* ===============================
   HOME DATA (ALL IN ONE)
================================ */
const getHomeData = catchAsync(async (req, res, next) => {
  // Featured products
  const featured = await Product.find({ isFeatured: true })
    .limit(10)
    .populate("images");

  // New arrival products (latest)
  const newArrivals = await Product.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate("images");

  // On deal products
  const onDeal = await Product.find({ isOnDeal: true })
    .limit(10)
    .populate("images");

  // Products grouped by categories
  const categories = ["Gents", "Ladies", "Kids", "Boys", "Girls"];
  const categoryProducts = {};

  for (const category of categories) {
    categoryProducts[category] = await Product.find({ category })
      .limit(10)
      .populate("images");
  }

  res.status(200).json({
    status: "success",
    data: {
      featured,
      newArrivals,
      onDeal,
      categoryProducts
    }
  });
});

module.exports = {
  getHomeData
};
