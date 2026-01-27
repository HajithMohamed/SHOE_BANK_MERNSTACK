const express = require("express");
const {addProduct,getAllProduct,getProductById,deleteProduct, updateProduct, filterSearch} = require("../Controller/product-controller");
const authMiddleware  = require("../Middlewares/auth-middleware");
const restrictTo = require("../Middlewares/role-base-access-middleware");
const paginatedResult = require("../Middlewares/pagination-middleware");
const uploadMiddleware = require("../Middlewares/upload-middleware");
const Product = require("../Models/Product");


const router = express.Router();

router.post(
  "/add-product",
  authMiddleware,
  restrictTo('admin'),
  uploadMiddleware.array("images", 5), // max 5 images
  addProduct
);

router.get("/get-all-products",authMiddleware,restrictTo('admin', 'user'),paginatedResult(Product),getAllProduct);
router.get("/filter-search",authMiddleware,restrictTo('admin', 'user'),filterSearch);
router.get("/get-product-by-id/:id",authMiddleware,restrictTo('admin', 'user'),getProductById);
router.delete("/delete-product/:id",authMiddleware,restrictTo('admin'),deleteProduct);
router.put("/update-product/:id",authMiddleware,restrictTo('admin'),updateProduct);


module.exports =router;
