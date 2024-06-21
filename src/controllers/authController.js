const adminAuthSchema = require("../model/adminAuthModel");
const generateJwtToken = require("../utils/jwt");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

// Admin login ----------------------- http://localhost:3050/api/login

exports.login = async (req, res) => {
  const { identifire, password } = req.body;

  try {
    const user = await adminAuthSchema
      .findOne({ $or: [{ email: identifire }, { mobileNumber: identifire }] })
      .select("+password");
    console.log(user);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "user not found please register",
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log(isValidPassword);
    if (isValidPassword) {
      generateJwtToken(user._id, res);
      res.status(200).json({
        status: true,
        message: "Successfully logedIn !",
      });
    } else {
      return res.status(401).json({
        status: false,
        message: "invalid email or password",
      });
    }
  } catch (error) {
    console.log("signUp: ", error.message);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Admin Change Password ----------------------- http://localhost:3050/api/changepassword

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    const user = await adminAuthSchema
      .findById(req.user.id)
      .select("+password");

    const isValidPassword = await bcrypt.compare(oldPassword, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        status: false,
        message: "old password is incorrect!",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        status: false,
        message: "Password and confirm password do not match",
      });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
      status: true,
      message: "Password Change Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Admin Forgot Passord ----------------------- http://localhost:3050/api/forgotpassword

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await adminAuthSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found with this email",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    user.resetPasswordTokenExpires = Date.now() + 15 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:3050/api/passwordreset/${token}`;

    const message = `Your password reset URL is as follows:\n\n${resetUrl}\n\nIf you did not request this email, please ignore it.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Tryzone Password Recovery",
        message,
      });
      res.status(201).json({
        status: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpires = undefined;
      await user.save({ validateBeforeSave: false });
      console.log(error);
      res.status(400).json({
        status: false,
        message: "Email could not be sent",
      });
    }
  } catch (error) {
    console.log("forgotPassword:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Admin ResetPassword  ------------------------------- http://localhost:3050/api/passwordreset/:token

exports.resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.params;
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await adminAuthSchema
      .findOne({
        resetPasswordToken,
        resetPasswordTokenExpires: { $gt: Date.now() },
      })
      .select("+password");

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Password reset token is invalid or expired",
      });
    }

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (isSamePassword) {
      return res.status(401).json({
        status: false,
        message: "Oldpassword same as newpassword try another",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        status: false,
        message: "Passwords do not match",
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    generateJwtToken(user._id, res);
    res.status(200).json({
      status: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log("resetPassword:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Admin get Details --------------------------- http://localhost:3050/api/userprofile

exports.getAdminDetails = async (req, res) => {
  try {
    const user = await adminAuthSchema.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("getAdminDetails :", error);
    return res.status(500).json({
      status: false,
      message:error.message,
    });
  }
};
