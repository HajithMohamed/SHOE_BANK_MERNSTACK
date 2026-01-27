const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "staff", "retail_user"],
      default: "retail_user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    /* ========= AUTH FLOWS ========= */
    otp: String,
    otpExpires: Date,

    resetPasswordOtp: String,
    resetPasswordOtpExpires: Date,
    resetPasswordOtpVerified: {
      type: Boolean,
      default: false,
    },

    changePasswordOtp: String,
    changePasswordOtpExpires: Date,
    changePasswordOtpVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/* 🔐 Hash password */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

/* 🔑 Compare password */
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model("User", userSchema);
