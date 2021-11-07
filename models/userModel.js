const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    min: 3,
  },
  email: {
    type: String,
    required: [true, "User email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  age: {
    type: Number,
    required: [true, "User age is required"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  roles: {
    type: String,
    enum: ["tenant", "owner", "admin"],
    default: "tenant",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
