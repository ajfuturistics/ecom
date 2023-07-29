// creating token and sving in cookie

const { options } = require("../app");

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
