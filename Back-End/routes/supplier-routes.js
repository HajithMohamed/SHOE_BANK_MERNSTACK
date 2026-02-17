const express = require("express");
const {
    getActiveSuppliersCount,
    getSuppliers,
    getSingleSupplier,
    addSupplier,
    updateSupplier,
    deleteSupplier
} = require("../Controller/supplier-controller");

const router = express.Router();

const restrictedTo = require("../Middleware/role-base-access-middleware");
const authMiddleware = require("../Middleware/auth-middleware");


/* ===========================
   Supplier Routes
=========================== */

// Get all suppliers
router.get(
    "/get-all-supplier",
    authMiddleware,
    restrictedTo("admin"),
    getSuppliers
);

// Get single supplier
router.get(
    "/get-single-supplier/:id",
    authMiddleware,
    restrictedTo("admin"),
    getSingleSupplier
);

// Create supplier
router.post(
    "/add-supplier",
    authMiddleware,
    restrictedTo("admin"),
    addSupplier
);

// Update supplier
router.patch(
    "/update-supplier/:id",
    authMiddleware,
    restrictedTo("admin"),
    updateSupplier
);

// Delete supplier
router.delete(
    "/delete-supplier/:id",
    authMiddleware,
    restrictedTo("admin"),
    deleteSupplier
);

// Get active suppliers count
router.get(
    "/active-suppliers-count",
    authMiddleware,
    restrictedTo("admin"),
    getActiveSuppliersCount
);


module.exports = router;
