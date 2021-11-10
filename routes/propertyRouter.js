const express = require("express");
const propertyController = require("../controllers/propertyController");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router();

// router.get("/createProperty",propertyController.);
// router.post("/createProperty",propertyController.createProperty);

router
  .route("/") // /createProperty -->api/v1/createProperty
  .get(propertyController.getAllProperties)
  .post(propertyController.createProperty);

router
  .route("/:id") // /create/:id
  .get(propertyController.getProperty)
  .patch(propertyController.updateProperty)
  .delete(propertyController.deleteProperty);

router
  .route("/:id/review")
  .post(authController.protect, reviewController.createReview)
  .get(authController.protect, reviewController.getAllReviews);

module.exports = router;
