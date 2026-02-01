const express = require("express");
const { addCustomer, getAllCustomer, getSingleCustomer, getAllCustomerCount } = require("../Controller/customer-controller");
const restrictedTo = require("../Middleware/restricted-to-middleware");
const authMiddleware = require("../Middleware/auth-middleware");
const router = express.Router();



router.post("/",authMiddleware,restrictedTo("admin"), addCustomer);
router.get("/",authMiddleware,restrictedTo("admin"), getAllCustomer);
router.get("/count",authMiddleware,restrictedTo("admin"), getAllCustomerCount);
router.get("/:id",authMiddleware,restrictedTo("admin"), getSingleCustomer);
router.put("/:id",authMiddleware,restrictedTo("customer"), updateCustomer);
router.delete("/:id",authMiddleware,restrictedTo("admin"), deleteCustomer);

module.exports = router;
