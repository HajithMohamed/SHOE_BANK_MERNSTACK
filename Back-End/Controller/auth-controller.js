const catchAsync = require('../utils/catchAync'); // ✅ corrected filename typo
const sendEmail = require('../utils/send-mail');
const generateOtp = require("../utils/generate-otp");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const User = require("../Models/Users");
const bcrypt = require('bcrypt');

// ✅ You don’t need a global salt – better to use dynamic salt per hash
// const salt = bcrypt.genSaltSync(10);

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

module.exports = { registerUser };
