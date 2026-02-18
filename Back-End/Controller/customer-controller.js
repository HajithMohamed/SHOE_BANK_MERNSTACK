const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Customer = require("../Models/Customer");
const filterObj = require("../utils/filter-object");

/* ==================================================
   ➕ ADD CUSTOMER
================================================== */
exports.addCustomer = catchAsync(async (req, res, next) => {
  const customerData = filterObj(
    req.body,
    "name",
    "shopName",
    "mobileNo",
    "address",
    "email",
    "accountNo",
    "creditLimit"
  );

  if (!customerData.name || !customerData.shopName || !customerData.mobileNo) {
    return next(new AppError("Required fields are missing", 400));
  }

  customerData.shopName = customerData.shopName.trim();
  customerData.mobileNo = customerData.mobileNo.trim();

  if (customerData.email) {
    customerData.email = customerData.email.trim().toLowerCase();
  }

  const existing = await Customer.findOne({
    mobileNo: customerData.mobileNo,
  });

  if (existing) {
    return next(new AppError("Customer with this mobile number already exists", 400));
  }

  customerData.createdBy = req.user.id;

  const newCustomer = await Customer.create(customerData);

  res.status(201).json({
    success: true,
    message: "Customer created successfully",
    data: newCustomer,
  });
});

/* ==================================================
   📄 GET ALL CUSTOMERS (WITH FILTER + PAGINATION)
================================================== */
exports.getAllCustomer = catchAsync(async (req, res, next) => {
  let query = { isBlocked: false };

  if (req.query.name) {
    query.name = { $regex: req.query.name.trim(), $options: "i" };
  }

  if (req.query.shopName) {
    query.shopName = { $regex: req.query.shopName.trim(), $options: "i" };
  }

  if (req.query.mobileNo) {
    query.mobileNo = req.query.mobileNo.trim();
  }

  if (req.query.city) {
    query.address = { $regex: req.query.city.trim(), $options: "i" };
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const customers = await Customer.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Customer.countDocuments(query);

  res.status(200).json({
    success: true,
    total,
    page,
    count: customers.length,
    data: customers,
  });
});

/* ==================================================
   🔍 GET SINGLE CUSTOMER
================================================== */
exports.getSingleCustomer = catchAsync(async (req, res, next) => {
  const customerID = req.params.customerID;

  const customer = await Customer.findById(customerID);

  if (!customer) {
    return next(new AppError("Customer not found", 404));
  }

  res.status(200).json({
    success: true,
    data: customer,
  });
});

/* ==================================================
   ✏ UPDATE CUSTOMER
================================================== */
exports.updateCustomer = catchAsync(async (req, res, next) => {
  const customerID = req.params.customerID;

  const updates = filterObj(
    req.body,
    "name",
    "shopName",
    "address",
    "mobileNo",
    "email",
    "accountNo",
    "creditLimit",
    "isBlocked"
  );

  if (updates.shopName) {
    updates.shopName = updates.shopName.trim();
  }

  if (updates.email) {
    updates.email = updates.email.trim().toLowerCase();
  }

  const updatedCustomer = await Customer.findByIdAndUpdate(
    customerID,
    updates,
    { new: true, runValidators: true }
  );

  if (!updatedCustomer) {
    return next(new AppError("Customer not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Customer updated successfully",
    data: updatedCustomer,
  });
});

/* ==================================================
   ❌ SOFT DELETE CUSTOMER
   (Cannot delete if outstanding exists)
================================================== */
exports.deleteCustomer = catchAsync(async (req, res, next) => {
  const customerID = req.params.customerID;

  const customer = await Customer.findById(customerID);

  if (!customer) {
    return next(new AppError("Customer not found", 404));
  }

  if (customer.totalOutstanding > 0) {
    return next(
      new AppError(
        "Cannot delete customer with outstanding balance",
        400
      )
    );
  }

  customer.isBlocked = true;
  await customer.save();

  res.status(200).json({
    success: true,
    message: "Customer blocked successfully",
  });
});

/* ==================================================
   📊 CUSTOMER SUMMARY (FOR BILLING PAGE)
================================================== */
exports.getCustomerSummary = catchAsync(async (req, res, next) => {
  const customerID = req.params.customerID;

  const customer = await Customer.findById(customerID);

  if (!customer) {
    return next(new AppError("Customer not found", 404));
  }

  res.status(200).json({
    success: true,
    data: {
      name: customer.name,
      shopName: customer.shopName,
      creditLimit: customer.creditLimit,
      totalPurchased: customer.totalPurchased,
      totalPaid: customer.totalPaid,
      totalOutstanding: customer.totalOutstanding,
      isBlocked: customer.isBlocked,
    },
  });
});

/* ==================================================
   📈 CUSTOMER COUNT
================================================== */
exports.getCustomerCounts = catchAsync(async (req, res, next) => {
  const total = await Customer.countDocuments();

  res.status(200).json({
    success: true,
    data: { total },
  });
});

/* ==================================================
   🏆 TOP CUSTOMERS (BY PURCHASE)
================================================== */
exports.getTopCustomers = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;

  const topCustomers = await Customer.aggregate([
    { $sort: { totalPurchased: -1 } },
    { $limit: limit },
  ]);

  res.status(200).json({
    success: true,
    data: topCustomers,
  });
});
