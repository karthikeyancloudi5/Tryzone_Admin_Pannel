const mongoose = require("mongoose");

const blogComments = new mongoose.Schema({
  blogName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});

const blogCommentSchema = mongoose.model("blog-comment", blogComments);

module.exports = blogCommentSchema;
