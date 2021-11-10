const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const catchError = require("../utils/catchError");

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: Date.now() + process.env.JWT_EXPIRES_IN,
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

exports.signup = catchError(async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
});

exports.login = catchError(async (req, res, next) => {
  //* email,password, token
  if (!req.body.email || !req.body.password) {
    throw new Error("Invalid user Email or Password");
  }
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    throw new Error("Invalid user/Password");
  }

  user.password = undefined;
  if (user.role === "tenant") {
    user.properties = undefined;
  }
  sendToken(user, 200, res);
});

exports.protect = catchError(async (req, res, next) => {
  // 1 get the token if it exists
  const token = req.headers.authorization.split(" ")[1];
  // 2 verify the token

  const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (payload.exp < Date.now()) {
    console.log(payload.exp, Date.now());
    throw new Error("Token has expired please login again!");
  }
  // 3 check if the user exists
  const user = await User.findById(payload.id);
  req.user = user;
  next();
});

// exports.signout = (req,res)=>{
//   res.send("You signed out")
// }
