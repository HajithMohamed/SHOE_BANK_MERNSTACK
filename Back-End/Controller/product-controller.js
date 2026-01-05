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

const getAllProduct = catchAsync(async(req, res, next)=>{
    const product = await Product.find()
    res.status(201).json({
        status: "success",
        data: {product}
    });
})

const getProductById = catchAsync(async(req,res,next)=>{
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if(!product){
        return(next(new appError("this product cannot be found",404)));
    }
    res.status(200).json({
        status: "success",
        data: {product}
    });
})

const deleteProduct = catchAsync(async(req,res,next)=>{
    const productId = req.params.id;

    const product = await Product.findByIdAndDelete(productId);
    
    if (!product) {
        return(next(new appError("this product cannot be found",404)));
    }
    res.status(200).json({
        status: "The product was successfully deleted",
        data: {product}
    });
})

const updateProduct = catchAsync(async (req, res, next) => {

    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true,
            runValidators: true   
        }
    );

    if (!updatedProduct) {
        return next(
            new AppError("Product not found", 404)
        );
    }

    res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        data: {
            product: updatedProduct
        }
    });
});

const filterSearch = catchAsync(async(req, res, next)=>{
    const{size, brand, category, color, minPrice, maxPrice, search}=req.query;

    const queryObj = {};
    if(size){
        queryObj.size=size;
    }
    if (brand) {
        queryObj.brand=brand;
    }
    if(category){
        queryObj.category=category;
    }
    if(color){
        queryObj.color=color;
    }
    if(minPrice||maxPrice){
        queryObj.price = {};
        if(minPrice) queryObj.price.$gte = Number(minPrice);
        if(maxPrice) queryObj.price.$gte = Number(maxPrice);
    }
    if(search){
        queryObj.$or=[
            {artNo: {$regex: search, $options: "i"}},
            {brand: {$regex: search, $option: "i"}}
        ]
    }

    const products = await Product.find(queryObj);

     res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products
        }
    });
})


module.exports = {addProduct, getAllProduct, getProductById, deleteProduct, updateProduct, filterSearch}