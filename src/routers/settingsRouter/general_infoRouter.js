const express = require("express");
const {
  createGeneralInfo,
  listGeneralInfo,
  updateGeneralInfo,
} = require("../../controllers/settingsControllers/general_InfoController");
const Router = express.Router();

Router.route("/setting/generalInfo/create").post(createGeneralInfo);
Router.route("/setting/generalInfo/getitem").get(listGeneralInfo);
Router.route("/setting/generalInfo/updateitem/:id").put(updateGeneralInfo);

module.exports = Router;
