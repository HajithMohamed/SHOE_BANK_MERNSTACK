const mongoose = require("mongoose");
const validator = require("validator");

const clearanceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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

    accountNo: {
      type: String,
      required: true,
    },

    totalPaid: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clearance", clearanceSchema);
