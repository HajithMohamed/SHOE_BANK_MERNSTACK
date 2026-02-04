const express = require("express");
const {
	addCustomer,
	getAllCustomer,
	getSingleCustomer,
	updateCustomer,
	deleteCustomer,
	getCustomerCounts,
	getTopCustomers,
} = require("../Controller/customer-controller");
const authMiddleware = require("../Middlewares/auth-middleware");
const restrictedTo = require("../Middlewares/role-base-access-middleware");
const router = express.Router();

router.post("/", authMiddleware, restrictedTo("admin"), addCustomer);
router.get("/", authMiddleware, restrictedTo("admin"), getAllCustomer);
router.get("/count", authMiddleware, restrictedTo("admin"), getCustomerCounts);
router.get("/top", authMiddleware, restrictedTo("admin"), getTopCustomers);
router.get("/:id", authMiddleware, restrictedTo("admin"), getSingleCustomer);
router.put("/:id", authMiddleware, restrictedTo("customer"), updateCustomer);
router.delete("/:id", authMiddleware, restrictedTo("admin"), deleteCustomer);

module.exports = router;
