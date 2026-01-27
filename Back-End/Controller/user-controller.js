const catchAync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../Models/Users");

let count = 0;

const getAllUser = catchAync(async(req, res, next)=>{
    const users = await User.find().select("-password -otp -resetPasswordOtp -__v -createdAt -updatedAt");

    if(users && users.length===0){
        return next(AppError("Users are not found",404));
    }

     res.status(200).json({
        message : "users fetched successfully!!",
        success : true,
        results: users.length,
        data : users
    })
})

const getSingleUser = catchAync(async(req, res, next)=>{
    const userId = req.params.userId;

    if(!userId){
        return next(AppError("user id is required",403));
    }

   const singleUser = await User.findById(userId).select("-password");
    if(!singleUser){
        return next(AppError(`User (${userId}) is not found`,404));   
    }

    res.status(200).json({
        message : `Useer (${userId}) is fetched successfully!!`,
        success : true,
        data : singleUser
    })
})

const deleteUser = catchAync(async(req, res, next)=>{
    const userId = req.params.userId;

    if(!userId){
        return next(AppError("user id is required",403));
    }

   const deletedUser = await User.findByIdAndDelete(userId);

    if(!deletedUser){
        return next(AppError(`User (${userId}) is not found`,404));   
    }

    res.status(200).json({
        message : `User (${userId}) is deleted successfully!!`,
        success : true,
        data : deletedUser
    })
})

const updateUser = catchAync(async (req, res, next) => {
  const userId = req.params.id;

  // Allowed updates ONLY
  const allowedFields = ["email", "isActive"];

  const updates = {};
  Object.keys(req.body).forEach((key) => {
    if (allowedFields.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  if (Object.keys(updates).length === 0) {
    return next(new AppError("No valid fields to update", 400));
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true
  }).select("-password");

  if (!updatedUser) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    data: { user: updatedUser }
  });
});


const getAllUserCount = catchAync(async (req, res) => {
  const counts = await User.aggregate([
    { $group: { _id: "$role", count: { $sum: 1 } } }
  ]);

  res.status(200).json({
    message: "User counts fetched successfully",
    success: true,
    data: counts
  });
});


module.exports = {
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
    getAllUserCount,
}