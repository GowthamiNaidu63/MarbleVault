const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    region: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    finish: {
      type: String,
      required: true,
    },

    thickness: {
      type: String,
      required: true,
    },

    minQty: {
      type: Number,
      default: 100,
    },

    image: {
      type: String,
      required: true,
    },

    features: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;