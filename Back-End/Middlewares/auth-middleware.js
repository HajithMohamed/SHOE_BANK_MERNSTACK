const jwt = require("jsonwebtoken")

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    console.log(token);
    
    if (!token) {
        return next(new AppError("User not authenticated. Please Login first????", 400))  
    }
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decodedToken);
        req.userInfo= decodedToken
        next()
    } catch (error) {
        return res.status(404).json({
            success : false,
            message : "User not authenticated. Please Login first!!!!!!!!"
        })
    }
    
}

module.exports = authMiddleware