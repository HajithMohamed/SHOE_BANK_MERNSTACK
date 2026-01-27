const mongoose = require("mongoose");
const validator = require("validator");

const customerSchema = new mongoose.Schema(
  {
    // Optional login linkage
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Business identity
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    shopName: {
      type: String,
      required: [true, "Shop name is required"],
      trim: true,
      unique: true,
    },

    mobileNo: {
      type: String,
      required: true,
      validate: [validator.isMobilePhone, "Invalid mobile number"],
    },

    address: {
      type: String,
      required: true,
    },

    // Financials
    creditLimit: {
      type: Number,
      default: 0,
      min: 0,
    },

    currentBalance: {
      type: Number,
      default: 0,
      min: 0,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin who added
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
