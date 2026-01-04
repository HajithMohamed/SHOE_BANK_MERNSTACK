const catchAsync = require("../utils/catchAync")
const appError = require("../utils/appError")
const User = require("../Models/Users");

const adminMiddleware = catchAsync(async(req, res, next)=>{
    const userId = req.userInfo.id;

    const user =  await User.findById(userId)

    if(!user){
        return(next (new appError("User is not found",404)));
    }

    if((!user.type)=="admin"){
        return(new appError("this user not autherize to this action",403));
    }

    next();
})

module.exports = adminMiddleware