const express = require("express");
const {
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  listBlogCategory,
} = require("../../controllers/master/blogCategoryController");
const Router = express.Router();

Router.route("/master/blogcategory/create").post(createBlogCategory);
Router.route("/master/blogcategory/update/:id").put(updateBlogCategory);
Router.route("/master/blogcategory/delete/:id").delete(deleteBlogCategory);
Router.route("/master/blogcategory/listitem").get(listBlogCategory);

module.exports = Router;
