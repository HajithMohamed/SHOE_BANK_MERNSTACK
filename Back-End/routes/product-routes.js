const express = require("express");
const {addProduct,getAllProduct,getProductById,deleteProduct, updateProduct, filterSearch} = require("../Controller/product-controller");
const authMiddleware  = require("../Middlewares/auth-middleware");
const adminMiddleware = require("../Middlewares/admin-middleware");


const router = express.Router();

router.post("/add-product",authMiddleware,adminMiddleware,addProduct);
router.get("/get-all-products",authMiddleware,getAllProduct);
router.get("/filter-search",authMiddleware,filterSearch);
router.get("/get-product-by-id/:id",authMiddleware,getProductById);
router.delete("/delete-product/:id",authMiddleware,adminMiddleware,deleteProduct);
router.put("/update-product/:id",authMiddleware,adminMiddleware,updateProduct);


module.exports =router;
