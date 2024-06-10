const mongoose = require("mongoose");

const Categories = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const CategorieSchema = mongoose.model("Categories", Categories);

module.exports = CategorieSchema;
