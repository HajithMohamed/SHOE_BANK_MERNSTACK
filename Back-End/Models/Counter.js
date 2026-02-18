// Models/Counter.js
const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: String,
  sequence: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Counter", counterSchema);
