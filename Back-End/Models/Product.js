const mongoose = require("mongoose");

/* ==================================================
   🔢 PRICING & VALIDATION LOGIC
================================================== */

function calculatePricing(doc) {
  const rules = {
    Gents: { min: 6, max: 13 },
    Ladies: { min: 5, max: 12 },
    Boys: { min: 1, max: 5 },
    Girls: { min: 1, max: 4 },
    Kids: { min: 8, max: 13 }
  };

  const rule = rules[doc.category];
  if (!rule) throw new Error("Invalid category");

  if (doc.sizeFrom < rule.min || doc.sizeTo > rule.max) {
    throw new Error(`Invalid size range for ${doc.category}`);
  }

  if (doc.sizeTo < doc.sizeFrom) {
    throw new Error("sizeTo must be greater than sizeFrom");
  }

  /* ===============================
     🆕 XL DETECTION
     Gents: 11–13
     Ladies: 10–12
  =============================== */

  doc.isXL =
    (doc.category === "Gents" && doc.sizeTo >= 11) ||
    (doc.category === "Ladies" && doc.sizeTo >= 10);

  /* ===============================
     💰 PRICING CALCULATION
  =============================== */

  const numberOfPairs = doc.sizeTo - doc.sizeFrom + 1;

  if (numberOfPairs <= 0) {
    throw new Error("Invalid size range calculation");
  }

  // Apply discount on INR cost
  const discountedINR =
    doc.inrCost - (doc.inrCost * doc.discountPercent) / 100;

  // Currency conversion
  doc.convertedPrice = Math.round(
    discountedINR * doc.currencyRate
  );

  // Weight per pair
  const weightPerPair =
    doc.setWeightInGrams / numberOfPairs;

  if (weightPerPair <= 0) {
    throw new Error("Invalid weight calculation");
  }

  const pairsPerKg = 1000 / weightPerPair;

  // Clearance cost per pair
  doc.clearanceCost = Math.round(
    doc.clearanceCostPerKg / pairsPerKg
  );

  // Final wholesale price per pair
  doc.finalWholesalePrice = Math.round(
    doc.convertedPrice +
    doc.clearanceCost +
    doc.profitMargin
  );
}

/* ==================================================
   📦 PRODUCT SCHEMA
================================================== */

const productSchema = new mongoose.Schema(
  {
    artNo: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    brand: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      enum: ["Gents", "Ladies", "Kids", "Boys", "Girls"]
    },

    color: {
      type: String,
      required: true,
      trim: true
    },

    /* ===============================
       💰 IMPORT COSTING
    =============================== */

    inrCost: {
      type: Number,
      required: true,
      min: 0
    },

    discountPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },

    currencyRate: {
      type: Number,
      required: true,
      min: 0
    },

    profitMargin: {
      type: Number,
      default: 100,
      min: 0
    },

    /* ===============================
       📏 SIZE RANGE
    =============================== */

    sizeFrom: {
      type: Number,
      required: true
    },

    sizeTo: {
      type: Number,
      required: true
    },

    isXL: {
      type: Boolean,
      default: false
    },

    /* ===============================
       ⚖️ SHIPPING
    =============================== */

    setWeightInGrams: {
      type: Number,
      required: true,
      min: 0
    },

    clearanceCostPerKg: {
      type: Number,
      required: true,
      min: 0
    },

    /* ===============================
       💲 CALCULATED FIELDS
    =============================== */

    convertedPrice: Number,
    clearanceCost: Number,
    finalWholesalePrice: Number,

    /* ===============================
       📦 INVENTORY
    =============================== */

    stock: {
      type: Number,
      required: true,
      min: 0
    },

    soldCount: {
      type: Number,
      default: 0
    },

    views: {
      type: Number,
      default: 0
    },

    /* ===============================
       🏷 FLAGS
    =============================== */

    isFeatured: {
      type: Boolean,
      default: false
    },

    isOnDeal: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

/* ==================================================
   🔁 AUTO PRICE CALCULATION BEFORE SAVE
================================================== */

productSchema.pre("save", function (next) {
  try {
    calculatePricing(this);
    next();
  } catch (err) {
    next(err);
  }
});

/* ==================================================
   🚀 INDEXES (PERFORMANCE)
================================================== */

productSchema.index({ artNo: 1 });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ finalWholesalePrice: 1 });

module.exports = mongoose.model("Product", productSchema);
