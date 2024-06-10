const express = require("express");
const {
  createCategories,
  listCategories,
  updateCategory,
  deleteCategory,
} = require("../../controllers/product/categoryControllers");

const Router = express.Router();

Router.route("/product/category/create").post(createCategories);
Router.route("/product/category/getitem").get(listCategories);
Router.route("/product/category/update/:id").put(updateCategory);
Router.route("/product/category/delete/:id").get(deleteCategory);

module.exports = Router;
