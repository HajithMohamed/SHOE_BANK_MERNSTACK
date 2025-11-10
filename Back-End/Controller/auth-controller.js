const catchAsync = require('../utils/catchAync'); 
const sendEmail = require('../utils/send-mail');
const generateOtp = require("../utils/generate-otp");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const User = require("../Models/Users");
const bcrypt = require('bcrypt');



const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id);

  const cookieOption = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
  };

  res.cookie("token", token, cookieOption);

  // remove sensitive data
  user.password = undefined;
  user.passwordConfirm = undefined;
  user.otp = undefined;

  res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: { user },
  });
};

const registerUser = catchAsync(async (req, res, next) => {
    const { email, password, confirm_pass } = req.body;

    // 🔹 Validate required fields
    if (!email) return next(new AppError("Email is required", 400));
    if (!password || !confirm_pass)
        return next(new AppError("Password and confirmation are required", 400));
    if (password !== confirm_pass)
        return next(new AppError("Passwords do not match", 400));

    // 🔹 Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
        return next(new AppError("Provided email already exists, try a different one", 400));

    // 🔹 Generate OTP
    const otp = generateOtp();
    const otpExpire = Date.now() + 24 * 60 * 60 * 1000; // valid for 24 hours

    // 🔹 Create user document without hashing
    const newUser = new User({
        email,
        password, // store plain text directly
        otp,
        otpExpires: otpExpire,
        isVerified: false,
    });

    const savedUser = await newUser.save();

    // 🔹 Send OTP email
    await sendEmail({
        email: savedUser.email,
        subject: "Email Verification - Your OTP Code",
        html: `<h2>Hello!</h2><p>Your OTP is: <strong>${otp}</strong></p>`,
    });

    res.status(201).json({
        status: "success",
        message: "User registered successfully. Please verify your email.",
        data: { userId: savedUser._id },
    });
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

    if(user.otp.toString()!==otp.toString()){
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

const resendOTP = catchAsync(async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return next(new AppError("Email is required to resend OTP", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
        return next(new AppError('User not found', 404));
    }

    if (user.isVerified) {
        return next(new AppError("This account is already verified", 400));
    }

    const newOTP = generateOtp();
    user.otp = newOTP;
    user.otpExpires = Date.now() + 24 * 60 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    try {
        await sendEmail({
            email: user.email,
            subject: "Resend OTP - Verify Your Email for Shoe Bank",
            html: `
                <h1>Email Verification - New OTP</h1>
                <p>Hi ${user.userName},</p>
        
                <p>We received a request to resend your OTP for verifying your email address at <strong>Shoe Bank 👟✨</strong>.</p>
        
                <p>Your new OTP is:</p>
        
                <h2 style="color: #2e6da4;">${newOTP}</h2>
        
                <p><strong>Note:</strong> This OTP is valid for the next 24 hours. Please do not share it with anyone.</p>
        
                <p>If you didn’t request this OTP, you can safely ignore this email.</p>
        
                <br/>
                <p>Best regards,</p>
                <p><strong>The Shoe Bank Team</strong></p>
            `
        });
        

        res.status(200).json({
            status: "success",
            message: "OTP sent successfully."
        });
    } catch (error) {
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new AppError("Error sending email, please try again."));
    }
});

const login = catchAsync(async (req, res, next) => {
    const { email, pass } = req.body;

    if (!email || !pass) {
        return next(new AppError("Please provide email and password", 400));
    }

    // 🔹 Select password because in schema select:false
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new AppError("Incorrect email or password", 401));
    }

    // 🔹 Use bcryptjs from the model
    const isPasswordCorrect = await user.correctPassword(pass, user.password);

    if (!isPasswordCorrect) {
        return next(new AppError("Incorrect email or password", 401));
    }

    if (!user.isVerified) {
        return next(new AppError("User not verified. Please verify your email first.", 401));
    }

    createSendToken(user, 200, res, "Login successful");
});


const logout = catchAsync(async (req, res, next) => {
    res.cookie("token", "loggedout", {
        expires: new Date(Date.now() + 10 * 100),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    });

    res.status(200).json({
        status: "success",
        message: "Logged out successfully"
    });
});
module.exports = { registerUser,otpVerify,login,logout,resendOTP};
