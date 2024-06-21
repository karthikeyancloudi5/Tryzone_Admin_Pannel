const express = require("express");
const {
  createBlog,
  updateBlog,
  deleteBlog,
  listBlogsByCategory,
} = require("../../controllers/blog/blogsController");

const Router = express.Router();

Router.route("/blog/create").post(createBlog);
Router.route("/blog/update/:id").put(updateBlog);
Router.route("/blog/delete/:id").delete(deleteBlog);
Router.route("/blog/listitem/:category").get(listBlogsByCategory);

module.exports = Router;
