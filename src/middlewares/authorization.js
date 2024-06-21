const jwt = require("jsonwebtoken");
const adminAuthSchema = require("../model/adminAuthModel");

const authorization = async (req, res, next) => {
  try {
    const token = req.cookies.AccessToken;

    if (!token) {
      return res.status(400).json({
        status: false,
        message: "Unauthorized user, no token is provided. Please login.",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECREAT);

    if (!decode) {
      return res.status(400).json({
        status: false,
        message: "Unauthorized, token is invalid.",
      });
    }

    const user = await adminAuthSchema.findById(decode.userId);

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Authorization Error: ", error);
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = authorization;
