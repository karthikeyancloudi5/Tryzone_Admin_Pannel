const express = require("express");
const {
  createSlider,
  updateSlider,
  deleteSlider,
  listAllSlider,
} = require("../../controllers/master/sliderController");

const Router = express.Router();

Router.route("/master/slider/create").post(createSlider);
Router.route("/master/slider/update/:id").put(updateSlider);
Router.route("/master/slider/delete/:id").delete(deleteSlider);
Router.route("/master/slider/listItem").get(listAllSlider);

module.exports = Router;
