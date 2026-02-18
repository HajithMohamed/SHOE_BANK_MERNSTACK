const mongoose = require("mongoose");

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
     🆕 XL DETECTION LOGIC
  =============================== */

  doc.isXL = false;

  if (
    (doc.category === "Gents" &&
      doc.sizeTo >= 11) ||

    (doc.category === "Ladies" &&
      doc.sizeTo >= 10)
  ) {
    doc.isXL = true;
  }

  /* ===============================
     CONTINUE PRICING CALCULATION
  =============================== */

  const numberOfPairs = doc.sizeTo - doc.sizeFrom + 1;

  const discountedINR =
    doc.inrCost -
    (doc.inrCost * doc.discountPercent) / 100;

  doc.convertedPrice = Math.round(
    discountedINR * doc.currencyRate
  );

  const weightPerPair =
    doc.setWeightInGrams / numberOfPairs;

  const pairsPerKg =
    1000 / weightPerPair;

  doc.clearanceCost = Math.round(
    doc.clearanceCostPerKg / pairsPerKg
  );

  doc.finalWholesalePrice = Math.round(
    doc.convertedPrice +
    doc.clearanceCost +
    doc.profitMargin
  );
}


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

    sizeFrom: {
      type: Number,
      required: true
    },

    sizeTo: {
      type: Number,
      required: true
    },

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

    convertedPrice: Number,
    clearanceCost: Number,
    finalWholesalePrice: Number,


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

productSchema.pre("save", function (next) {
  try {
    calculatePricing(this);
    next();
  } catch (err) {
    next(err);
  }
});

/* ==================================================
   📌 INDEXES (Performance)
================================================== */

productSchema.index({ artNo: 1 });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ finalWholesalePrice: 1 });

module.exports = mongoose.model("Product", productSchema);
