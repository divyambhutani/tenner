const catchError = require("../utils/catchError");
const Review = require("../models/reviewModel");

exports.createReview = catchError(async (req, res, next) => {
  const review = await Review.create({
    user: req.user.id,
    property: req.params.id,
    review: req.body.review,
    rating: req.body.rating,
  });

  res.status(201).json({
    status: "success",
    data: review,
  });
});

//fetch reviews for particular property
exports.getAllReviews = catchError(async (req, res, next) => {
  const reviews = await Review.find({ property: req.params.id });
  res.status(200).json({
    status: "success",
    length: reviews.length,
    data: reviews,
  });
});
