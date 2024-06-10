const mongoose = require("mongoose");

const Blog = new mongoose.Schema({
  blogDate: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogCategory",
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageAltTag: {
    type: String,
  },
  authorName: {
    type: String,
  },
  authorImage: {
    type: String,
  },
  authorImageAlt: {
    type: String,
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
  others: {
    type: String,
  },
  status: {
    type: String,
  },
  blogDescription: {
    type: String,
  },
});

const blogSchema = mongoose.model("Blog", Blog);

module.exports = blogSchema;
