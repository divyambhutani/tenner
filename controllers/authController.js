const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const sendToken = (user, statusCode, res) => {
  const token = createToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res) => {
  if (req.body.role === "admin") {
    throw new Error("please select a role between : tenant or admin");
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    password: hashedPassword,
    role: req.body.role,
  });
  sendToken(user, 201, res);
};

exports.login = async (req, res) => {
  //* email,password, token
  if (!req.body.email || !req.body.password) {
    throw new Error("Invalid user Email or Password");
  }
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    throw new Error("Invalid user Email or Password");
  }

  user.password = undefined;
  if (user.role === "tenant") {
    user.properties = undefined;
  }
  sendToken(user, 200, res);
};
