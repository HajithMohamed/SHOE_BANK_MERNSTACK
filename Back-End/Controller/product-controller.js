const catchAsync = require("../utils/catchAync");
const appError = require("../utils/appError");
const Product = require("../Models/Product");

const addProduct = catchAsync(async(req, res, next)=>{
    const {artNo, brand, price, category, color, stock,size } = req.body;

    const product = await Product.findOne({artNo});

    if(product){
        return(next(new appError("this product is already exist...",403)));
    }

    const newProduct = new Product(
        {
            artNo,
            brand,
            price,
            category,
            color,
            stock,
            size
        }
    )
    await newProduct.save();

    res.status(201).json({
        status: "success",
        message: "Product added successfully",
        data: {
            product: newProduct
        }
    });
})

module.exports = {addProduct}