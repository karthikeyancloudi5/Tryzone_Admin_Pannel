const mongoose = require("mongoose");

const blogCategory = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  metaTitle: {
    type: String,
  },
  metaKeywords: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
});

const blogCategorySchema = mongoose.model("blogCategory", blogCategory);

module.exports = blogCategorySchema;
