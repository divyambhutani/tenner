const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const catchError = require("../utils/catchError");

exports.getAllUsers = catchError(async (req, res, next) => {
  const users = await User.find({ active: true });
  res.status(200).json({
    status: "success",
    length: users.length,
    message: users,
  });
});

exports.createUser = catchError(async (req, res, next) => {
  if (req.body.role === "admin") {
    throw new Error("Please choose a role from : tenant or owner");
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await User.create({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    password: hashedPassword,
    role: req.body.role,
  });
  res.status(201).json({
    status: "success",
    message: "User created",
  });
});

exports.getUserById = catchError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    message: user,
  });
  console.error(err);
});

exports.updateUser = catchError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: user,
  });
});

exports.deleteUser = catchError(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, { active: false });

  res.status(204).json({
    status: "success",
  });
});
