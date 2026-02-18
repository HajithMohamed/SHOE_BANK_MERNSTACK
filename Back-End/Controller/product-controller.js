const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Product = require("../Models/Product");

/* =====================================
   GET ALL PRODUCTS (PUBLIC)
===================================== */
exports.getAllProducts = catchAsync(async (req, res) => {

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

  if (sizes) {
    queryObj.sizes = { $in: sizes.split(",").map(Number) };
  }

  if (brand) queryObj.brand = brand;
  if (category) queryObj.category = category;
  if (color) queryObj.color = color;

  if (minPrice || maxPrice) {
    queryObj.finalPrice = {};
    if (minPrice) queryObj.finalPrice.$gte = Number(minPrice);
    if (maxPrice) queryObj.finalPrice.$lte = Number(maxPrice);
  }

  if (search) {
    queryObj.$or = [
      { artNo: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } }
    ];
  }

  const sortBy = sort || "-createdAt";

  const products = await Product.find(queryObj)
    .sort(sortBy)
    .skip(skip)
    .limit(limit)
    .populate("images"); // cost fields hidden automatically (select:false)

  const total = await Product.countDocuments(queryObj);

  res.status(200).json({
    status: "success",
    total,
    page,
    results: products.length,
    data: products
  });
});


/* =====================================
   GET PRODUCT BY ID (PUBLIC)
===================================== */
exports.getProductById = catchAsync(async (req, res, next) => {

  const product = await Product
    .findById(req.params.id)
    .populate("images");

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: product
  });
});
