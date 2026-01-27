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
      enum: ["admin", "user", "supplier", "clearance", "customer"],
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
    changePasswordOTP : String,
    changePasswordOTPExpires : Date,
    changePasswordVerify : {
      type : Boolean,
      default : false
    }, 
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // Role-specific fields
    supplierInfo: {
      name: { type: String },
      companyName: { type: String },
      id: { type: String },
      mobileNo: { type: String, validate: [validator.isMobilePhone, "Invalid mobile number"] },
      address: { type: String },
    },
    clearanceInfo: {
      name: { type: String },
      address: { type: String },
      mobileNo: { type: String, validate: [validator.isMobilePhone, "Invalid mobile number"] },
      accountNo: { type: String },
    },
    customerInfo: {
      name: { type: String },
      shopName: { type: String },
      accountNo: { type: String },
      mobileNo: { type: String, validate: [validator.isMobilePhone, "Invalid mobile number"] },
      creditLimit: { type: Number, default: 0 }, // Max credit allowed, set by admin
      currentBalance: { type: Number, default: 0 }, // Current amount owed (positive = debt)
    },
  },
  { timestamps: true }
);

// 🔒 Hash password and validate role-specific fields
userSchema.pre("save", async function (next) {
  // Hash password if modified
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  // Validate/enforce for roles
  if (this.role === "supplier" && !this.supplierInfo?.companyName) {
    return next(new Error("Supplier must provide company name and other details"));
  }
  if (this.role === "clearance" && !this.clearanceInfo?.accountNo) {
    return next(new Error("Clearance person must provide account number and other details"));
  }
  if (this.role === "customer") {
    if (!this.customerInfo?.shopName) {
      return next(new Error("Customer must provide shop name and other details"));
    }
    // Ensure credit fields are numbers >= 0
    if (this.customerInfo.creditLimit < 0 || this.customerInfo.currentBalance < 0) {
      return next(new Error("Credit limit and balance must be non-negative"));
    }
  }
  next();
});

// ✅ Password comparison method
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;