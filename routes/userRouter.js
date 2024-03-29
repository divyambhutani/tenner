const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(userController.getAllUsers);
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
// router.route("/signout").post(authController.protect, authController.signout);

router.route("/").patch(authController.protect, userController.updateUser);

router
  .route("/:id")
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
