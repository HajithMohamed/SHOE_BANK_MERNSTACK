const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAync");
const cloudinary = require("../Config/cloudinary-config");

const uploadToCloudinary = catchAsync(async(filePath)=>{
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return{
            url: result.secure_url,
            publicId: result.public_id,
        }
    } catch (error) {
        console.error("Error while uploading to cloudinary",error);
        throw new Error("6")
    }
})

module.exports = uploadToCloudinary 