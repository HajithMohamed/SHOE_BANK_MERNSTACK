const catchAync = require("../utils/catchAync");
const AppError = require("../utils/appError");
const User = require("../Models/Users");


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

    const singleUser = await User.findById({userId}).select("-password -otp -resetPasswordOtp -__v -createdAt -updatedAt");

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
        return next(AppError(`User (${productId}) is not found`,404));   
    }

    res.status(200).json({
        message : `User (${userId}) is deleted successfully!!`,
        success : true,
        data : deletedUser
    })
})

const updateUser = catchAync(async(req, res, next)=>{
    const user = req.userInfo;

    const allowedUpdates = [
        'supplierInfo.name',
        'supplierInfo.companyName',
        'supplierInfo.mobileNo',
        'supplierInfo.address',
        'clearanceInfo.name',
        'clearanceInfo.mobileNo',
        'clearanceInfo.address',
        'clearanceInfo.accountNo',
        'customerInfo.name',
        'customerInfo.shopName',
        'customerInfo.mobileNo',
        'customerInfo.accountNo',
    ];

    const updates = {};
    Object.keys(req.body).forEach((key) => {
        if (allowedUpdates.includes(key)) {
            // Handle nested fields (dot notation)
            const [parent, child] = key.split('.');
            if (child) {
                if (!updates[parent]) updates[parent] = {};
                updates[parent][child] = req.body[key];
            } else {
                updates[key] = req.body[key];
            }
        }
    });

    // 4. If no valid fields were sent
    if (Object.keys(updates).length === 0) {
        return next(new AppError('No valid fields provided for update', 400));
    }

    // 5. Prevent updating sensitive/critical fields
    if (req.body.password || req.body.role || req.body.isVerified || req.body.email) {
        return next(new AppError('You cannot update password, role, verification status or email here', 403));
    }

    // 6. Perform the update
    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $set: updates },
        { new: true, runValidators: true }
    ).select('-password -otp -resetPasswordOtp -changePasswordOTP -__v -createdAt -updatedAt');

    res.status(200).json({
        status: 'success',
        message: 'Your profile has been updated successfully',
        data: updatedUser,
    });  
})

const getAllUserCount = catchAync(async(req, res, next)=>{
    const userCount = await User.countDocuments();

    res.status(200).json({
        message : "user count fetched successfully!!",
        success : true,
        data : userCount
    })
})

module.exports = {
    getAllUser,
    getSingleUser,
    deleteUser,
    updateUser,
    getAllUserCount,
}