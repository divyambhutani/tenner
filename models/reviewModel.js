//1property , 2 user , 3 rating , 4 review
const mongoose = require("mongoose");
// const validator = require("validator");

const reviewSchema = mongoose.Schema({
  property: {
    type: mongoose.Schema.ObjectId,
    ref: "Property",
  },
  User: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
});
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
