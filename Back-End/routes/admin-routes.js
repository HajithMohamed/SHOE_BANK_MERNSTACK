const express = require("express");
const {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProductsAdmin
} = require("../Controller/admin-product-controller")
const authMiddleware = require("../Middlewares/auth-middleware");
const adminMiddleware = require("../Middlewares/admin-middleware")
const router = express.Router();

router.post("/add-product",authMiddleware,adminMiddleware,addProduct);
router.put("/update-product/:id",authMiddleware,adminMiddleware,updateProduct)
router.delete("/delete-product/:id",authMiddleware,adminMiddleware,deleteProduct);
router.get("/get-all-products",authMiddleware,adminMiddleware,getAllProductsAdmin);

module.export = router