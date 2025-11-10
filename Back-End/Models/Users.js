const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      select: false, 
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: String,
    otpExpires: Date,
    resetPasswordOtp: String,
    resetPasswordOtpExpires: Date,
    resetPasswordOtpVerify: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // correct key name: timestamps (not timestamp)
);

// 🔒 Hash password before saving
userSchema.pre("save", async function (next) {
  // only hash if password is modified or new
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ✅ Instance method for password comparison
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
