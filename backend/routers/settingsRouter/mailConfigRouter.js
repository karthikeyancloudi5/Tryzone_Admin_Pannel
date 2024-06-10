const express = require("express");
const Router = express.Router();
const {
  createMailConfig,
  listMailConfig,
  updateMailConfig,
} = require("../../controllers/settingsControllers/mailConfigController");

Router.route("/setting/mailconfig/create").post(createMailConfig);
Router.route("/setting/mailconfig/getitem").get(listMailConfig);
Router.route("/setting/mailconfig/updateitem/:id").put(updateMailConfig);

module.exports = Router;
