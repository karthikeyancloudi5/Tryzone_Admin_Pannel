const mongoose = require("mongoose");

const generalInfo = new mongoose.Schema({
  websiteName: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
  },
  alternateMobileNo: {
    type: String,
  },
  supportCenterNo: {
    type: String,
  },
  whatsappNo: {
    type: String,
  },
  email: {
    type: String,
  },
  alternateEmail: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  linkedIn: {
    type: String,
  },
  twitter: {
    type: String,
  },
  youTube: {
    type: String,
  },
});

const generalInfoSchema = mongoose.model("general-info", generalInfo);

module.exports = generalInfoSchema;
