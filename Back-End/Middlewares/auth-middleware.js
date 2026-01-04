const jwt = require("jsonwebtoken")
const catchAsync = require("../utils/catchAync")
const appError = require("../utils/appError");

const authMiddleware = catchAsync(async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader||!authHeader.starteWith("Bearer")){
        return next(new appError("user not authenticated. Please login first.",));
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userInfo = decodedToken;

    next();
})

module.exports = authMiddleware;