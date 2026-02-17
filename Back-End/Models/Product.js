const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    /* ===============================
       BASIC INFO
    =============================== */

    artNo: {
      type: String,
      required: true,
      trim: true
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
       🇮🇳 COST DETAILS (MANUAL INPUT)
    =============================== */

    inrCost: {
      type: Number,
      required: true
    },

    discountPercent: {
      type: Number,
      default: 0
    },

    currencyRate: {
      type: Number,
      required: true
    },

    /* ===============================
       👟 SIZE RANGE (SET SYSTEM)
    =============================== */

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
      required: true
    },

    clearanceCostPerKg: {
      type: Number,
      required: true
    },

    /* ===============================
       💰 AUTO CALCULATED FIELDS
    =============================== */

    convertedPrice: Number,      // INR → LKR after discount
    clearanceCost: Number,       // per pair clearance
    finalWholesalePrice: Number, // final price + 100 LKR

    /* ===============================
       SYSTEM FIELDS
    =============================== */

    isFeatured: {
      type: Boolean,
      default: false
    },

    isOnDeal: {
      type: Boolean,
      default: false
    },

    soldCount: {
      type: Number,
      default: 0
    },

    views: {
      type: Number,
      default: 0
    },

    stock: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);


productSchema.pre("save", function (next) {
  /* ===============================
     1️⃣ CATEGORY SIZE VALIDATION
  =============================== */

  const rules = {
    Gents: { min: 6, max: 13 },
    Ladies: { min: 5, max: 12 },
    Boys: { min: 1, max: 5 },
    Girls: { min: 1, max: 4 },
    Kids: { min: 8, max: 13 }
  };

  const rule = rules[this.category];

  if (!rule) {
    return next(new Error("Invalid category"));
  }

  if (
    this.sizeFrom < rule.min ||
    this.sizeTo > rule.max
  ) {
    return next(
      new Error(
        `Invalid size range for ${this.category}`
      )
    );
  }

  if (this.sizeTo < this.sizeFrom) {
    return next(
      new Error("sizeTo must be greater than sizeFrom")
    );
  }

  /* ===============================
     2️⃣ NUMBER OF PAIRS
  =============================== */

  const numberOfPairs =
    this.sizeTo - this.sizeFrom + 1;

  /* ===============================
     3️⃣ INR → LKR CONVERSION
     ((inr - discount%) * currencyRate)
  =============================== */

  const discountedINR =
    this.inrCost -
    (this.inrCost * this.discountPercent) / 100;

  const convertedToLKR =
    discountedINR * this.currencyRate;

  this.convertedPrice =
    Math.round(convertedToLKR);

  /* ===============================
     4️⃣ CLEARANCE COST PER PAIR
  =============================== */

  const weightPerPair =
    this.setWeightInGrams / numberOfPairs;

  const pairsPerKg =
    1000 / weightPerPair;

  const clearancePerPair =
    this.clearanceCostPerKg / pairsPerKg;

  this.clearanceCost =
    Math.round(clearancePerPair);

  /* ===============================
     5️⃣ FINAL WHOLESALE PRICE
     (converted + clearance + 100)
  =============================== */

  this.finalWholesalePrice =
    Math.round(
      this.convertedPrice +
      this.clearanceCost +
      100
    );

  next();
});

module.exports = mongoose.model("Product", productSchema);
