const catchAsync = require("../utils/catchAync");


const paginatedResults = (Model) => catchAsync(async (req, res, next) => {

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const totalDocuments = await Model.countDocuments();

    if (endIndex < totalDocuments) {
      results.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit
      };
    }

    results.results = await Model.find()
      .limit(limit)
      .skip(startIndex);

    res.paginatedResults = results;
    next();
  });


module.exports = paginatedResults