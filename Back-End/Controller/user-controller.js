const catchAync = require("../utils/catchAync");
const AppError = require("../utils/appError");
const User = require("../Models/Users");


const getAllUser = catchAync(async(req, res, next)=>{
    const users = await User.find();

    if(users && users.length<0){
        return next(AppError("Users are not found",404));
    }

     res.status(200).json({
        message : "users fetched successfully!!",
        success : true,
        data : users
    })
})

const getSingleUser = catchAync(async(req, res, next)=>{
    const userId = req.params.userId;

    if(!userId){
        return next(AppError("user id is required",403));
    }

    const singleUser = await User.findById({userId})

    if(!singleUser){
        return next(AppError(`User (${productId}) is not found`,404));   
    }

    res.status(200).json({
        message : `Useer (${productId}) is fetched successfully!!`,
        success : true,
        data : singleUser
    })
})

const deleteUser = catchAync(async(req, res, next)=>{
    const userId = req.params.userId;

    if(!userId){
        return next(AppError("user id is required",403));
    }

    const deletedUser = await User.findByIdAndDelete({userId})

    if(!deletedUser){
        return next(AppError(`User (${productId}) is not found`,404));   
    }

    res.status(200).json({
        message : `Useer (${productId}) is deleted successfully!!`,
        success : true,
        data : deletedUser
    })
})

const updateUser = catchAync(async(req, res, next)=>{
     const userId = req.params.userId;

    if(!userId){
        return next(AppError("user id is required",403));
    }

    const user = await User.findByIdAndDelete({userId})

    if(!user){
        return next(AppError(`User (${productId}) is not found`,404));   
    }

    res.status(200).json({
        message : `Useer (${productId}) is updated successfully!!`,
        success : true,
        data : user
    })
})

module.exports = {
    getAllUser,
    getSingleUser,
    deleteUser,

}