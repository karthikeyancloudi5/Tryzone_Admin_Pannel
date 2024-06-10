const mongoose = require("mongoose");

const products = new mongoose.Schema({
  
  categories: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Categories",
  },
  particulars: {
    type: String,
    required: true,
    unique: true,
  },
  composition: {
    type: String,
    required: true,
  },
  packing: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  therapeuticRole: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const productSchema = mongoose.model("product", products);
module.exports = productSchema;
