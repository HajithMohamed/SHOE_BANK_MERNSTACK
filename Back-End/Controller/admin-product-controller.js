const AppError = require("../utils/appError");
const catchAync = require("../utils/catchAync");
const Product = require("../Models/Product");
const Image = require("../Models/Image");
const cloudinary = require("../Config/cloudinary-config");



const getAllProduct = catchAync(async(req, res, next)=>{
    const products = await Product.find();

    if(products && products.length<0){
        return next(AppError("products not found",404));
    }

    res.status(200).json({
        message : "products fetched successfully!!",
        success : true,
        data : products
    })
})

const getSingleProduct = catchAync(async(req, res, next)=>{
    const productId = req.params.productId

    if(!productId){
        return next(AppError("product id is required",401));
    }

    const singleProduct = Product.findById({productId})

    if(!singleProduct){
        return next(AppError("products not found",404));   
    }

    res.status(200).json({
        message : `product (${productId}) is fetched successfully!!`,
        success : true,
        data : singleProduct
    })
})



module.exports = {
    getAllProduct,
    getSingleProduct,
}