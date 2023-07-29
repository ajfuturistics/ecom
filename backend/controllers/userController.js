const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register a new user
const registerUser = catchAsyncErrors(async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  // sending cookie
  sendToken(user, 201, res);

  // const token = user.getJWTToken();
  // res.status(201).json({ success: true, token });
});

const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user provided email and password
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // sending cookie
  sendToken(user, 200, res);

  // const token = await user.getJWTToken();
  // res.status(200).json({ success: true, token });
});

const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // get reset token

  const resetToken = user.getResetPasswordToken();

  // saving user with new changes
  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/password/reset/${resetToken}`;

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is \n\n ${resetPasswordUrl} \n\n If this is not requsted by you then ignore.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerse password recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // saving user with new changes
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// reset password
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// get user details
const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, user });
});

// update user password
const updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  user.save();
  sendToken(user, 200, res);
});
// update user profile
const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const updatedUserDetails = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    updatedUserDetails.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, updatedUserDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true });
});

// get all users (admin)
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ success: true, users });
});

// get single user (admin)
const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exists with Id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, user });
});

// update user role (admin)
const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const updatedUserDetails = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, updatedUserDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true });
});

// delete user role (admin)
const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User does not exists with Id: ${req.params.id}`, 404)
    );
  }
  // cloudnary
  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();
  res.status(200).json({ success: true, message: "User deleted successfully" });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
};
