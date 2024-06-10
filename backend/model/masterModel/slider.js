const mongoose = require("mongoose");

const Slider = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  imageAltTag: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
});

const sliderSchema = mongoose.model("slider", Slider);

module.exports = sliderSchema;
