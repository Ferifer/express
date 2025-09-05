const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/login", authController.login.bind(authController));
router.post("/register", authController.register.bind(authController));
router.get(
  "/profile",
  authMiddleware,
  authController.getProfile.bind(authController)
);
router.put(
  "/profile",
  authMiddleware,
  authController.updateProfile.bind(authController)
);

module.exports = router;
