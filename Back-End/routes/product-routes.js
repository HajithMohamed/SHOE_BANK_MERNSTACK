const express = require("express");
const {addProduct,getAllProduct,getProductById} = require("../Controller/product-controller");
const authMiddleware  = require("../Middlewares/auth-middleware");
const adminMiddleware = require("../Middlewares/admin-middleware")


const router = express.Router();

router.post("/add-product",authMiddleware,adminMiddleware,addProduct);
router.get("/get-all-products",authMiddleware,getAllProduct);
router.get("/get-product-by-id/:id",authMiddleware,getProductById);


module.exports =router;
