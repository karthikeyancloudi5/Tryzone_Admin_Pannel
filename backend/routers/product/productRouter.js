const express = require("express");
const {
  createProductsByCategory,
  listProductsByCategory,
  updateProductByCategory,
  deleteProductByCategory,
} = require("../../controllers/product/productControllers");
const Router = express.Router();

Router.route("/product/create").post(createProductsByCategory);
Router.route("/product/getitem/:categories").get(listProductsByCategory);
Router.route("/product/update/:id").put(updateProductByCategory);
Router.route("/product/delete/:id").get(deleteProductByCategory);

module.exports = Router;
