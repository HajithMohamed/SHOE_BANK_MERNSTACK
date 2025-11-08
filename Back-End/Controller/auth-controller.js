const catchAsync = require('../utils/catchAync'); 
const sendEmail = require('../utils/send-mail');
const generateOtp = require("../utils/generate-otp");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const User = require("../Models/Users");
const bcrypt = require('bcrypt');



const signToken = (id) => {
    return JWT.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = catchAsync(async(req,res,next)=>{
    const token = signToken(user._id)

    const cookieOption = {
        expires : new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax"
    };
    res.cookie("token", token, cookieOption);
    User.password = undefined;
    User.passwordConfirm = undefined;
    User.otp = undefined;

    res.status(statusCode).json({
        status: "success",
        message,
        token,
        data: {
            User,
        }
    });
})
const registerUser = catchAsync(async (req, res, next) => {
    const { email, password, confirm_pass } = req.body;

    // 🔹 1. Validate required fields
    if (!email) {
        return next(new AppError("Email is required", 400));
    }
    if (!password || !confirm_pass) {
        return next(new AppError("Password and confirmation are required", 400));
    }
    if (password !== confirm_pass) {
        return next(new AppError("Passwords do not match", 400));
    }

    // 🔹 2. Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new AppError("Provided email already exists, try a different one", 400));
    }

    // 🔹 3. Generate OTP and hash password
    const otp = generateOtp();
    const otpExpire = Date.now() + 24 * 60 * 60 * 1000; // valid for 24 hours
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 4. Create user document
    const newUser = new User({
        email,
        password: hashedPassword, // ✅ should match your User schema field
        otp,
        otpExpire,
        isVerified: false // optional but recommended
    });

    // 🔹 5. Save and send email
    try {
        const savedUser = await newUser.save();

        await sendEmail({
            email: savedUser.email,
            subject: "Email Verification - Your OTP Code",
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2>Hello ${savedUser.userName || 'User'},</h2>
                    <p>Thank you for registering with us!</p>
                    <p><strong>Your One-Time Password (OTP) for email verification is:</strong></p>
                    <h1 style="color: #007BFF;">${otp}</h1>
                    <p>Please enter this code in the app to complete your verification.</p>
                    <p>If you did not request this, please ignore this email.</p>
                    <br />
                    <p>Best regards,<br/>The Team</p>
                </div>
            `
        });

        res.status(201).json({
            status: "success",
            message: "User registered successfully. Please verify your email.",
            data: { userId: savedUser._id }
        });

    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            return next(new AppError("User already exists", 400));
        }
        console.error("Registration Error:", error);
        return next(new AppError("Error saving user, please try again", 500));
    }
});


const otpVerify = catchAsync(async(req,res,next)=>{
    const {otp,userId} = req.body

    if(!otp||!userId){
        return next(new AppError("User ID and OTP are required", 400));
    }
    const user = await User.findById(userId)

    if (!user) {
        return next(new AppError("User not found", 400));
    }

    if(user.otp.toString()!==otp.toString){
        return next(new AppError("Invalid OTP", 400));
    }
    if(Date.now() > new Date(user.otpExpires).getTime()){
        return next(new AppError("OTP expired, Please request new otp", 400));
    }

     user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save({ validateBeforeSave: false });

    await sendEmail({
        email: user.email,
        subject: "Welcome to Shoe Bank 👟✨",
        html: `
          <h1>Welcome to Shoe Bank!</h1>
          <p>Hi ${user.userName},</p>
          <p>Thank you for joining <strong>Shoe Bank</strong>, your one-stop shop for the latest footwear trends.</p>
          <p>We’re excited to have you onboard. Explore our exclusive collections and step up your style!</p>
          <br/>
          <p>Happy Shopping!<br/>The Shoe Bank Team</p>
        `
      });
    createSendToken(user, 200, res, "Email has been verified.");
})


module.exports = { registerUser };
