const express = require("express");
const {
  createUser,
  listUser,
  deleteUser,
  updateUser,
  updatePassword,
} = require("../controllers/userModuleController");
const Router = express.Router();

Router.route("/create/user").post(createUser);
Router.route("/allusers").get(listUser);
Router.route("/update/user/:id").put(updateUser);
Router.route("/update/user/password/:id").put(updatePassword);
Router.route("/delete/user/:id").get(deleteUser);

module.exports = Router;
