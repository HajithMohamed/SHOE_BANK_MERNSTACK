const express = require("express")
const {addProduct} = require("../Controller/product-controller")


const router = express.Router();

router.post("/add-product",addProduct);


module.exports =router;
