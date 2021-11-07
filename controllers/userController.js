const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  const users = await User.find({ active: true });
  res.status(200).json({
    status: "success",
    length: users.length,
    message: users,
  });
};

exports.createUser = async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      password: req.body.password,
    });

    res.status(201).json({
      status: "success",
      message: "User created",
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: user,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: user,
  });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { active: false });

  res.status(204).json({
    status: "success",
  });
};
