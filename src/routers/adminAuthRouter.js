const express = require("express");
const {
  login,
  changePassword,
  forgotPassword,
  resetPassword,
  getAdminDetails,
} = require("../controllers/authController");
const authorization = require("../middlewares/authorization");

const Router = express.Router();

Router.route("/login").post(login);
Router.route("/changepassword").post(authorization, changePassword);
Router.route("/forgotpassword").post(forgotPassword);
Router.route("/passwordreset/:token").post(resetPassword);
Router.route("/userprofile").get(authorization, getAdminDetails);
module.exports = Router;
