const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync"); 
const Clearance = require("../Models/Clearance");
const filterObj = require("../utils/filter-object");

const getAllClearance = catchAsync(async (req, res, next) => {
  let query = {};

  if (req.query.name) {
    query.name = { $regex: req.query.name, $options: "i" };
  }

  if (req.query.accountNo) {
    query.accountNo = req.query.accountNo;
  }


  if (req.query.mobileNo) {
    query.mobileNo = req.query.mobileNo;
  }

  if (req.query.isActive !== undefined) {
    query.isActive = req.query.isActive === "true";
  }

  if (req.query.minTotalPaid) {
    query.totalPaid = { $gte: parseFloat(req.query.minTotalPaid) };
  }


  if (req.query.city) {
    query.address = { $regex: req.query.city, $options: "i" };
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const clearances = await Clearance.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ totalPaid: -1 }); 

  if (clearances.length === 0) {
    return next(new AppError("No clearance persons found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Clearance persons fetched successfully",
    size: clearances.length,
    data: clearances,
  });
});

const getSingleClearance = catchAsync(async (req, res, next) => {
  const clearanceId = req.params.ID;

  if (!clearanceId) {
    return next(new AppError("ID is required", 400));
  }

  const singleClearance = await Clearance.findById(clearanceId);

  if (!singleClearance) {
    return next(new AppError("The clearance person not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Clearance person found",
    data: singleClearance,
  });
});

const addClearance = catchAsync(async (req, res, next) => {
  const clearanceData = filterObj(req.body, "name", "mobileNo", "address", "accountNo");

  if (Object.keys(clearanceData).length === 0) {
    return next(new AppError("All fields are required", 400));
  }

  // Normalize for duplicate check (as suggested previously)
  const normalizedName = clearanceData.name.trim().toLowerCase();
  const normalizedAccount = clearanceData.accountNo.trim();

  const existClearance = await Clearance.findOne({
    name: normalizedName,
    accountNo: normalizedAccount,
  });

  if (existClearance) {
    return next(new AppError("This clearance person already exists in our database", 400));
  }


  clearanceData.name = normalizedName;

  clearanceData.createdBy = req.user.id; 

  const newClearance = new Clearance(clearanceData);
  await newClearance.save();

  res.status(201).json({
    success: true,
    message: "New clearance person created successfully",
    data: newClearance, 
  });
});

const updateClearance = catchAsync(async (req, res, next) => {
  const clearanceId = req.params.ID;

  if (!clearanceId) {
    return next(new AppError("ID is required", 400));
  }

  const clearanceData = filterObj(req.body, "name", "mobileNo", "address", "accountNo"); 

  if (Object.keys(clearanceData).length === 0) {
    return next(new AppError("At least one field is required for update", 400)); 
  }

  const updatedClearance = await Clearance.findByIdAndUpdate(
    clearanceId,
    clearanceData, 
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedClearance) {
    return next(new AppError("Clearance not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Clearance updated successfully",
    data: updatedClearance,
  });
});

const deleteClearance = catchAsync(async (req, res, next) => {
  const clearanceId = req.params.ID;

  if (!clearanceId) {
    return next(new AppError("ID is required", 400));
  }

  const deletedClearance = await Clearance.findByIdAndDelete(clearanceId);

  if (!deletedClearance) {
    return next(new AppError("Clearance not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "The clearance person deleted successfully",
    data: deletedClearance,
  });
});

const getClearanceCounts = catchAsync(async (req, res, next) => {
  const total = await Clearance.countDocuments();
  const active = await Clearance.countDocuments({ isActive: true });

  res.status(200).json({
    success: true,
    message: "Clearance counts",
    data: {
      total,
      active,
    },
  });
});


const getTopClearances = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const groupByCity = req.query.groupByCity === "true";

  let pipeline = [
    { $match: { isActive: true } }, 
    { $sort: { totalPaid: -1 } },
    { $limit: limit },
  ];

  if (groupByCity) {
  pipeline = [
    { $match: { isActive: true } },
    {
      $addFields: {
        city: {
          $arrayElemAt: [
            { $split: ["$address", ", "] },
            -1
          ],
        },
      },
    },
    {
      $group: {
        _id: "$city",
        topClearances: { $push: "$$ROOT" },
        maxPaid: { $max: "$totalPaid" },
      },
    },
    { $sort: { maxPaid: -1 } },
  ];
}


  const topClearances = await Clearance.aggregate(pipeline);

  res.status(200).json({
    success: true,
    message: groupByCity ? "Top clearances grouped by city" : "Top clearances by total paid",
    data: topClearances,
  });
});

module.exports = {
  getAllClearance,
  getSingleClearance, 
  addClearance, 
  updateClearance,
  deleteClearance,
  getClearanceCounts, 
  getTopClearances, 
};