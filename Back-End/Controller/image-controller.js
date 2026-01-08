const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAync");
const Image = require("../Models/Image");
const uploadToCloudinary = require("../Helper/cloudinary-helper")

const uploadImage = catchAsync(async(req, res, next)=>{
    if(!req.file){
        return(next(new AppError("file is required. Please upload an imag",400)))
    }

    const {url,publicId} = await uploadToCloudinary(req.file.path)

    const newlyUploadedImage = new Image({
        url,
        publicId,
        uploadedBy : req.userInfo.userId 
    })

    await newlyUploadedImage.save()
})

module.exports={
    uploadImage,
}