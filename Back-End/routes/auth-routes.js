const express = require("express")
const {
    registerUser,
    otpVerify,
    resendOTP,
    login,
    logout,
    changePassword,
    forgotPassword,
    resetPassword,
    resendResetPasswordOtp,
} = require("../Controller/auth-controller");
const authMiddleware = require("../Middlewares/auth-middleware");


const router = express.Router()

router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);
router.post('/otp-verify', otpVerify);
router.post('/resend-otp', resendOTP);
router.post('/change-password',authMiddleware, changePassword);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/resend-reset-otp', resendResetPasswordOtp);



module.exports = router