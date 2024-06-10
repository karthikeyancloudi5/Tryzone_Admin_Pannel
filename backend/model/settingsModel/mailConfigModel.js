const mongoose = require("mongoose");

const mailConfig = new mongoose.Schema({
  SMPT_Mailer: {
    type: String,
  },
  mailHost: {
    type: String,
    required: true,
  },
  mailPort: {
    type: String,
    required: true,
  },
  mailUsername: {
    type: String,
    required: true,
  },
  mailPassword: {
    type: String,
    required: true,
  },
  mailEncryption: {
    type: String,
  },
  mailFromAddress: {
    type: String,
    required: true,
  },
  mailFromName: {
    type: String,
    required: true,
  },
});

const mailConfigSchema = mongoose.model("mail-config", mailConfig);

module.exports = mailConfigSchema;
