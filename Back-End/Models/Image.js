const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    uploadedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
