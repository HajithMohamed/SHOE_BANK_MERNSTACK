const express = require("express")
const {
    getAllClearance,
    getClearanceCounts,
    getTopClearances,
    getSingleClearance,
    updateClearance,
    deleteClearance,
    addClearance
} = require("../Controller/clearance-controller");
const restrictedTo = require("../Middlewares/role-base-access-middleware")
const authMiddleware = require("../Middlewares/auth-middleware")
const router = express.Router()


router.get("/get-all-clearance",authMiddleware,restrictedTo("admin"),getAllClearance);
router.get("/get-single-clearance/:ID",authMiddleware,restrictedTo("admin"),getSingleClearance);
router.get("/get-top-clearance",authMiddleware,restrictedTo("admin"),getTopClearances);
router.get("/get-clearance-count",authMiddleware,restrictedTo("admin"),getClearanceCounts);
router.post("/add-clearance",authMiddleware,restrictedTo("admin"),addClearance)
router.put("/update-clearance/:ID",authMiddleware,updateClearance);
router.delete("/delete-clearance/:ID",authMiddleware,restrictedTo("admin"),deleteClearance)

module.exports = router