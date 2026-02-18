const mongoose = require("mongoose");
const validator = require("validator");

const customerSchema = new mongoose.Schema(
  {
    // Optional login linkage (future online support)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    /* ===============================
       🏪 BUSINESS INFORMATION
    =============================== */

    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },

    shopName: {
      type: String,
      required: [true, "Shop name is required"],
      trim: true,
    },

    shopLocatedAt: {
      type: String,
      trim: true,
    },

    mobileNo: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      validate: {
        validator: function (v) {
          return validator.isMobilePhone(v + "");
        },
        message: "Invalid mobile number",
      },
    },

    address: {
      type: String,
      required: [true, "Address is required"],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return v ? validator.isEmail(v) : true;
        },
        message: "Invalid email address",
      },
    },

    accountNo: {
      type: String,
    },

    /* ===============================
       💰 FINANCIAL SECTION
    =============================== */

    creditLimit: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalPurchased: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalPaid: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalOutstanding: {
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

/* ===============================
   🚀 INDEXES
=============================== */

customerSchema.index({ mobileNo: 1 });
customerSchema.index({ shopName: 1 });

module.exports = mongoose.model("Customer", customerSchema);
