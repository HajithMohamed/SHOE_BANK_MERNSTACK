const mongoose = require("mongoose");

const billItemSchema = new mongoose.Schema(
    {
        product : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Product",
            required : true
        },
        artNo: String,
        brand: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        pricePerPair: Number,
  costPerPair: Number,

  totalAmount: Number,
  totalCost: Number,
  profit: Number,
});

const billSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: null,
    },

    customerName: String, // for one-time billing

    items: [billItemSchema],

    totalPairsSold: Number,
    billTotal: Number,
    totalCost: Number,
    totalProfit: Number,

    paidAmount: {
      type: Number,
      default: 0,
    },

    previousOutstanding: {
      type: Number,
      default: 0,
    },

    newOutstanding: {
      type: Number,
      default: 0,
    },

    paymentMethod: {
      type: String,
      enum: ["CASH", "CARD", "BANK", "CREDIT"],
      default: "CASH",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);