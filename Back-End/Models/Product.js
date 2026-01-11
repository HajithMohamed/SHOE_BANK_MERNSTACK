const mongoose = require("mongoose");

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
    size: {
      type: Number,
      required: true
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
    stock: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

productSchema.virtual("images", {
    ref:"Image",
    localField: "_id",
    foreignField : "productId"
})

module.exports = mongoose.model("Product", productSchema);
