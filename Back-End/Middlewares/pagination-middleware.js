const catchAsync = require("../utils/catchAsync");

const paginatedResults = (Model) =>
  catchAsync(async (req, res, next) => {

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
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

    /* ===========================
       BUILD MATCH FILTER
    =========================== */
    const matchStage = {};

    if (sizes) {
      matchStage.sizes = { $in: sizes.split(",").map(Number) };
    }

    if (brand) matchStage.brand = brand;
    if (category) matchStage.category = category;
    if (color) matchStage.color = color;

    if (minPrice || maxPrice) {
      matchStage.finalPrice = {};
      if (minPrice) matchStage.finalPrice.$gte = Number(minPrice);
      if (maxPrice) matchStage.finalPrice.$lte = Number(maxPrice);
    }

    if (search) {
      matchStage.$or = [
        { artNo: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } }
      ];
    }

    /* ===========================
       SORTING
    =========================== */
    const sortStage = {};
    if (sort) {
      const sortField = sort.startsWith("-") ? sort.substring(1) : sort;
      sortStage[sortField] = sort.startsWith("-") ? -1 : 1;
    } else {
      sortStage.createdAt = -1;
    }

    /* ===========================
       TOTAL COUNT WITH FILTER
    =========================== */
    const totalDocuments = await Model.countDocuments(matchStage);

    /* ===========================
       AGGREGATION PIPELINE
    =========================== */
    const resultsData = await Model.aggregate([
      { $match: matchStage },

      {
        $lookup: {
          from: "images",
          localField: "_id",
          foreignField: "productId",
          as: "images"
        }
      },

      { $sort: sortStage },
      { $skip: skip },
      { $limit: limit }
    ]);

    const results = {
      total: totalDocuments,
      page,
      limit,
      results: resultsData
    };

    if (skip + limit < totalDocuments) {
      results.next = { page: page + 1, limit };
    }

    if (skip > 0) {
      results.previous = { page: page - 1, limit };
    }

    res.paginatedResults = results;
    next();
  });

module.exports = paginatedResults;
