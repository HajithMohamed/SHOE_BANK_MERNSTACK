const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    artNo: {
      type: String,
      required: true,
      unique: true,
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

    price: {
      type: Number,
      required: true
    },

    // 💰 Deals
    discountPercent: {
      type: Number,
      default: 0
    },

    discountPrice: {
      type: Number
    },

    // 🏠 Home page logic
    isFeatured: {
      type: Boolean,
      default: false
    },

    isOnDeal: {
      type: Boolean,
      default: false
    },

    // 📊 Analytics
    soldCount: {
      type: Number,
      default: 0
    },

    views: {
      type: Number,
      default: 0
    },

    // 👟 Shoe sizes
    sizes: {
      type: [Number],
      required: true
    },

    stock: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

// 🔗 Virtual images
productSchema.virtual("images", {
  ref: "Image",
  localField: "_id",
  foreignField: "productId"
});

// Enable virtuals
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Product", productSchema);
