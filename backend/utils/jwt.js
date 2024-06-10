const jwt = require("jsonwebtoken");

const generateJwtToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECREAT, {
    expiresIn: process.env.JWT_EXPRIES,
  });

  res.cookie("AccessToken", token, {
    maxAge: new Date(
      Date.now() + process.env.COOKIES_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
};

module.exports = generateJwtToken;
