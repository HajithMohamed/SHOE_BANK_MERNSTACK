const catchAsync = require("../utils/catchAync");


const paginatedResults = (Model) => catchAsync(async (req, res, next) => {

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const totalDocuments = await Model.countDocuments();

    const results = {};

    if (skip + limit < totalDocuments) {
        results.next = { page: page + 1, limit };
    }

    if (skip > 0) {
        results.previous = { page: page - 1, limit };
    }

    results.results = await Model.aggregate([
        {
            $lookup: {
                from: "images",
                localField: "_id",
                foreignField: "productId",
                as: "images"
            }
        },
        { $skip: skip },
        { $limit: limit }
    ]);
    res.paginatedResults = results;
    next();
});

module.exports = paginatedResults