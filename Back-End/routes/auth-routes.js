const express = require("express")
const {registerUser,otpVerify,resendOTP,login,logout} = require("../Controller/auth-controller")


const router = express.Router()

router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);
router.post('/otp-verify', otpVerify);
router.post('/resend-otp', resendOTP);


module.exports = router