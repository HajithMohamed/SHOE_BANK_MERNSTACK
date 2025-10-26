const express = require("express")
const {registerUser} = require("../Controller/auth-controller")


const router = express.Router()

router.post('/register', registerUser);


module.exports = router