const express = require("express");
const propertyController = require("../controllers/propertyController");

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

module.exports = router;
