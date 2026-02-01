const express = require("express");
const {getAllUser, getSingleUser, deleteUser, updateUser,getAllUserCount} = require("../Controller/user-controller");
const authMiddleware = require("../Middlewares/auth-middleware");
const restrictedTo = require("../Middlewares/role-base-access-middleware");


const router = express.Router();

router.get("/get-all-users",authMiddleware,restrictedTo("admin"), getAllUser);
router.get("/get-single-user/:userId",authMiddleware,restrictedTo("admin"), getSingleUser);
router.get("/get-all-user-count",getAllUserCount);
router.delete("/delete-user/:userId",authMiddleware,restrictedTo("admin"), deleteUser);
router.put("/update-user",authMiddleware, updateUser);



module.exports = router;

