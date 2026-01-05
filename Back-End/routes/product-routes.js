const express = require("express");
const {addProduct,getAllProduct} = require("../Controller/product-controller");
const authMiddleware  = require("../Middlewares/auth-middleware");
const adminMiddleware = require("../Middlewares/admin-middleware")


const router = express.Router();

router.post("/add-product",authMiddleware,adminMiddleware,addProduct);
router.get("/get-all-products",authMiddleware,getAllProduct);


module.exports =router;
