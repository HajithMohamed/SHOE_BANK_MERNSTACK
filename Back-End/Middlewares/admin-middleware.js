const catchAsync = require("../utils/catchAync")
const appError = require("../utils/appError")
const User = require("../Models/Users");

const adminMiddleware = catchAsync(async(req, res, next)=>{
    const userId = req.userInfo.id;

    const user =  await User.findById(userId)

    if(!user){
        return(next (new appError("User is not found",404)));
    }

    if((user.role)!=="admin"){
       return next(
            new appError("You are not authorized to perform this action", 403)
        );
    }

    console.log(user.role);
    next();
})

module.exports = adminMiddleware