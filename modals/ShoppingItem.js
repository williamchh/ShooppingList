const mongoose = require("mongoose");

const ShoppingItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
      type: Number,
      required: false
  },
  unit: {
    type: String,
    required: false,
  },
  shop: {
    type: String,
    required: false,
  },
  info: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  check: {
    type: Boolean,
  },
});

module.exports = mongoose.model("ShoppingItem", ShoppingItemSchema);