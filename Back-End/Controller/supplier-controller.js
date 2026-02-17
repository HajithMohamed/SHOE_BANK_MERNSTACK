const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Supplier = require("../Models/Supplier");


const getSuppliers = catchAsync(async(req, res, next)=>{
    let query = {};

    if(req.query.name){
        query.name = {$regex: req.query.name, $options: "i"}
    }
    if(req.query.companyName){
        query.companyName = req.query.companyName;
    }
    if(req.query.mobileNo){
        query.mobileNo = req.query.mobileNo
    }
    if(req.query.address){
        query.address = req.query.address
    }
    if(req.query.totalPurchasedAmount){
        query.totalPurchasedAmount = req.query.totalPurchasedAmount
    }
    if (req.query.isActive !== undefined) {
        query.isActive = req.query.isActive === "true";
    }

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page-1) * limit

    const supliers = await Supplier.find(query).skip(skip).limit(limit)

    if(supliers.length === 0){
        return next(new AppError("No suppliers found",404));
    }

    res.status(200).json({
        success : true,
        message : "Supliers list",
        length : supliers.length,
        data : supliers
    })
})

module.exports = {
    getSuppliers,
}