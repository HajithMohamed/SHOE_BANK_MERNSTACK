const AppError = require("../utils/appError");
const catchAync = require("../utils/catchAsync");
const Clearance = require("../Models/Clearance");
const filterObj = require("../utils/filter-object");


const getAllClearance = catchAync(async(req, res, next)=>{
    const clearances = await Clearance.find({});

    if (clearances && clearances.length==0) {
        return next(new AppError("No clearnce persons found",404));
    }

    res.status(200).json({
        success : true,
        message : "Clearnce persons fetched succcessfully",
        size : clearances.length,
        data : clearances
    })
})

const getSingleClearances = catchAync(async(req, res, next)=>{
    const clearanceId = req.params.ID;

    if(!clearanceId){
        return next(new AppError("ID is required",400));
    }

    const singleClearance = await Clearance.findById({clearanceId});

    if (!singleClearance) {
        return next(new AppError("The clearance person not found",404));
    }

    res.status(200).json({
        success : true,
        message : "Clearance person found",
        data : singleClearance
    })
})

const addclearance = catchAsync(async(req,res,next)=>{
    const clearanceData = filterObj(req.body,"name","mobileNo","address","accountNo");

    if (Object.keys(clearanceData).length===0) {
        return next(new AppError("All fields are required",400));
    }

    const existClearance = await Clearance.findOne({
        name: normalizedName,
        accountNo: normalizedAccount,
    });

    if(existClearance){
        return next(new AppError("This clearance person is already exist in our data base",400));
    }

    const newClearance = new Clearance(clearanceData)

    await newClearance.save();

    res.status(200).json({
        success : true,
        message : "New customer is created successfully",
        data : newCustomer
    });
})

module.exports = {
    getAllClearance,
    getSingleClearances,
    addclearance,
    
}