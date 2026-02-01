const express = require("express");
const { getHomeData } = require("../Controller/home-controller");

const router = express.Router();

// One single endpoint for all home data
router.get("/home", getHomeData);

module.exports = router;
