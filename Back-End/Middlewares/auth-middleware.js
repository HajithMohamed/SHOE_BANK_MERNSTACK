const jwt = require("jsonwebtoken")
const catchAsync = require("../utils/catchAync")
const appError = require("../utils/appError");
const User = require("../Models/Users");

const authMiddleware = catchAsync(async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader||!authHeader.startsWith("Bearer")){
        return next(new appError("user not authenticated. Please login first.",));
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id);

    if (!user) {
        return next(new appError("User no longer exists.", 401));
    }

    req.userInfo = user;

    next();
})

module.exports = authMiddleware;