const express = require("express");
const {
  postBlogComments,
  viewBlogComments,
} = require("../../controllers/blog/blogCommentController");
const Router = express.Router();

Router.route("/blog/blogcomment").post(postBlogComments);
Router.route("/blog/viewcomment").get(viewBlogComments);

module.exports = Router;
