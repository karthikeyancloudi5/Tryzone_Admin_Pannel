const userModuleSchema = require("../model/usermoduleModel");
const bcrypt = require("bcrypt");

// create user ---------------------- http://localhost:3050/api/create/user

exports.createUser = async (req, res) => {
  const { name, email, mobileNumber, password, status } = req.body;

  try {
    const user = await userModuleSchema.findOne({
      $or: [{ email }, { mobileNumber }],
    });

    if (user) {
      return res.status(401).json({
        status: true,
        message: "email or mobile number is already exits",
      });
    }
    if (!user) {
      const newUser = await userModuleSchema.create({
        name,
        email,
        mobileNumber,
        password,
        status,
      });

      res.status(201).json({
        status: true,
        message: "user created successfully",
        newUser,
      });
    }
  } catch (error) {
    console.log("createUser:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//  List All users ----------------------http://localhost:3050/api/allusers
exports.listUser = async (req, res) => {
  try {
    const users = await userModuleSchema.find();

    if (!users) {
      res.status(404).json({
        status: false,
        message: "Users not found in DB",
      });
    }

    res.status(200).json({
      status: true,
      users,
    });
  } catch (error) {
    console.log("listUser", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Update User Details ----------------------- http://localhost:3050/api/update/user/:id

exports.updateUser = async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    status: req.body.status,
  };
  try {
    const user = await userModuleSchema.findByIdAndUpdate(
      req.params.id,
      newUserData
    );

    if (!user) {
      res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Successfully updated",
      user,
    });
  } catch (error) {
    console.log("updateUser :", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// change user Password -------------------------- http://localhost:3050/api/update/user/password/:id

exports.updatePassword = async (req, res) => {
  const { password } = req.body;
  try {
    const user = await userModuleSchema
      .findById(req.params.id)
      .select("+password");

    if (!user) {
      res.status(404).json({
        status: false,
        message: `User not found ${req.params.id}`,
      });
    }

    user.password = password;

    await user.save();

    res.status(200).json({
      status: true,
      message: "password changed successfully!!",
    });
  } catch (error) {
    console.log("updatePassword :", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// delete user --------------------------- http://localhost:3050/api/delete/user/:id

exports.deleteUser = async (req, res) => {
  try {
    const user = await userModuleSchema.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: `user not found with this id ${req.params.id}`,
      });
    }
    res.status(200).json({
      status: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log("deleteUser :", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
