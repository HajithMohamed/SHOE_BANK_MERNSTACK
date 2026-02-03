const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Customer = require("../Models/Customer");
const filterObj = require("../utils/filter-object");

const getAllCustomer = catchAsync(async (req, res, next) => {
  let query = {};

  if (req.query.name) {
    query.name = { $regex: req.query.name.trim(), $options: "i" };
  }
  if (req.query.shopName) {
    query.shopName = { $regex: req.query.shopName.trim(), $options: "i" };
  }
  if (req.query.accountNo) {
    query.accountNo = req.query.accountNo.trim();
  }
  if (req.query.mobileNo) {
    query.mobileNo = req.query.mobileNo.trim();
  }
  if (req.query.email) {
    query.email = req.query.email.trim().toLowerCase();
  }

  if (req.query.city) {
    query.address = { $regex: req.query.city, $options: "i" };
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const customers = await Customer.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  if (customers.length === 0) {
    return next(new AppError("No customers found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Customers fetched successfully",
    count: customers.length,
    data: customers,
  });
});

const getSingleCustomer = catchAsync(async (req, res, next) => {
  const customerID = req.params.customerID;

  if (!customerID) {
    return next(new AppError("Customer ID is required", 400));
  }

  const customer = await Customer.findById(customerID);

  if (!customer) {
    return next(new AppError(`Customer with ID ${customerID} not found`, 404));
  }

  res.status(200).json({
    success: true,
    message: "Customer found",
    data: customer,
  });
});

const addCustomer = catchAsync(async (req, res, next) => {
  const customerData = filterObj(
    req.body,
    "name",
    "shopName",
    "mobileNo",
    "address",
    "email",
    "accountNo"
  );

  if (Object.keys(customerData).length === 0) {
    return next(new AppError("Required fields are missing", 400));
  }

  const normalizedShopName = customerData.shopName?.trim().toLowerCase();
  const normalizedAccountNo = customerData.accountNo?.trim();

  const existing = await Customer.findOne({
    shopName: normalizedShopName,
    accountNo: normalizedAccountNo,
  });

  if (existing) {
    return next(new AppError("Customer with this Shop Name and Account Number already exists", 400));
  }

  if (normalizedShopName) customerData.shopName = normalizedShopName;
  if (customerData.email) customerData.email = customerData.email.trim().toLowerCase();

  const newCustomer = new Customer(customerData);
  await newCustomer.save();

  res.status(201).json({
    success: true,
    message: "New customer created successfully",
    data: newCustomer,
  });
});

const updateCustomer = catchAsync(async (req, res, next) => {
  const customerID = req.params.id || req.params.customerID;

  if (!customerID) {
    return next(new AppError("Customer ID is required", 400));
  }

  const updates = filterObj(
    req.body,
    "name",
    "shopName",
    "address",
    "mobileNo",
    "email",
    "accountNo"
  );

  if (Object.keys(updates).length === 0) {
    return next(new AppError("No valid fields provided for update", 400));
  }

  if (updates.shopName) updates.shopName = updates.shopName.trim().toLowerCase();
  if (updates.email) updates.email = updates.email.trim().toLowerCase();

  const updatedCustomer = await Customer.findByIdAndUpdate(customerID, updates, {
    new: true,
    runValidators: true,
  });

  if (!updatedCustomer) {
    return next(new AppError("Customer not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Customer updated successfully",
    data: updatedCustomer,
  });
});

const deleteCustomer = catchAsync(async (req, res, next) => {
  const customerID = req.params.id || req.params.customerID;

  if (!customerID) {
    return next(new AppError("Customer ID is required", 400));
  }

  const deletedCustomer = await Customer.findByIdAndDelete(customerID);

  if (!deletedCustomer) {
    return next(new AppError("Customer not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Customer deleted successfully",
    data: deletedCustomer,
  });
});

const getCustomerCounts = catchAsync(async (req, res, next) => {
  const total = await Customer.countDocuments();
  res.status(200).json({
    success: true,
    message: "Customer counts",
    data: {
      total,
    },
  });
});

const getTopCustomers = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;

  const topCustomers = await Customer.aggregate([
    { $sort: { totalPurchased: -1 } },
    { $limit: limit },
  ]);

  res.status(200).json({
    success: true,
    message: `Top ${limit} customers`,
    data: topCustomers,
  });
});

module.exports = {
  addCustomer,
  getAllCustomer,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerCounts,
  getTopCustomers,
};