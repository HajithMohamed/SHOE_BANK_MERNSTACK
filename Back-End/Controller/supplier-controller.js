const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Supplier = require("../Models/Supplier");
const filterObj = require("../utils/filter-object");


/* ===========================
   Get All Suppliers (With Filters + Pagination)
=========================== */
const getSuppliers = catchAsync(async (req, res, next) => {
    let query = {};

    if (req.query.name) {
        query.name = { $regex: req.query.name, $options: "i" };
    }
    if (req.query.companyName) {
        query.companyName = req.query.companyName;
    }
    if (req.query.mobileNo) {
        query.mobileNo = req.query.mobileNo;
    }
    if (req.query.address) {
        query.address = req.query.address;
    }
    if (req.query.totalPurchasedAmount) {
        query.totalPurchasedAmount = req.query.totalPurchasedAmount;
    }
    if (req.query.isActive !== undefined) {
        query.isActive = req.query.isActive === "true";
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const suppliers = await Supplier.find(query)
        .skip(skip)
        .limit(limit);

    if (suppliers.length === 0) {
        return next(new AppError("No suppliers found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Suppliers list",
        length: suppliers.length,
        data: suppliers
    });
});


/* ===========================
   Get Single Supplier
=========================== */
const getSingleSupplier = catchAsync(async (req, res, next) => {
    const supplierId = req.params.id;

    const supplier = await Supplier.findById(supplierId);

    if (!supplier) {
        return next(new AppError("Supplier not found!!", 404));
    }

    res.status(200).json({
        success: true,
        message: "Supplier details",
        data: supplier
    });
});


/* ===========================
   Add Supplier
=========================== */
const addSupplier = catchAsync(async (req, res, next) => {
    const supplierData = filterObj(
        req.body,
        "name",
        "companyName",
        "mobileNo",
        "address",
        "totalPurchasedAmount"
    );

    if (Object.keys(supplierData).length === 0) {
        return next(new AppError("Required fields are missing", 400));
    }

    const existingSupplier = await Supplier.findOne({
        name: supplierData.name,
        companyName: supplierData.companyName
    });

    if (existingSupplier) {
        return next(
            new AppError(
                "Supplier with this Shop Name and Company already exists",
                400
            )
        );
    }

    const newSupplier = await Supplier.create(supplierData);

    res.status(201).json({
        success: true,
        message: "New supplier created successfully",
        data: newSupplier
    });
});


/* ===========================
   Update Supplier
=========================== */
const updateSupplier = catchAsync(async (req, res, next) => {
    const supplierId = req.params.id;

    const supplierData = filterObj(
        req.body,
        "name",
        "companyName",
        "address",
        "mobileNo",
        "isActive"
    );

    if (Object.keys(supplierData).length === 0) {
        return next(new AppError("No valid fields provided for update", 400));
    }

    const updatedSupplier = await Supplier.findByIdAndUpdate(
        supplierId,
        supplierData,
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedSupplier) {
        return next(new AppError("Supplier not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Supplier details updated successfully",
        data: updatedSupplier
    });
});


/* ===========================
   Delete Supplier
=========================== */
const deleteSupplier = catchAsync(async (req, res, next) => {
    const supplierId = req.params.id;

    const supplier = await Supplier.findByIdAndDelete(supplierId);

    if (!supplier) {
        return next(new AppError("Supplier not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Supplier deleted successfully"
    });
});


/* ===========================
   Get Active Suppliers Count
=========================== */
const getActiveSuppliersCount = catchAsync(async (req, res, next) => {
    const count = await Supplier.countDocuments({ isActive: true });

    res.status(200).json({
        success: true,
        message: "Active suppliers count",
        count: count
    });
});


module.exports = {
    getSuppliers,
    getSingleSupplier,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    getActiveSuppliersCount
};
