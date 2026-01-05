const express = require("express");
const {addProduct} = require("../Controller/product-controller");
const authMiddleware  = require("../Middlewares/auth-middleware");
const adminMiddleware = require("../Middlewares/admin-middleware")


const router = express.Router();

router.post("/add-product",authMiddleware,adminMiddleware,addProduct);


module.exports =router;
