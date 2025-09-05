const userRepo = require("../repository/user.repository");

class AuthController {
  async login(req, res) {
    try {
      const login = await userRepo.login(req.body);
      res.status(201).json({
        status: 201,
        message: "register success",
        data: login,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message || "Login failed",
      });
    }
  }

  async register(req, res) {
    try {
      const registerData = await userRepo.register(req.body);
      res.status(201).json({
        status: 201,
        message: "Register successful",
        data: registerData,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message || "Register failed",
      });
    }
  }

  async updateProfile(req, res) {
    try {
      const userId = req.user.id; // Get user ID from token
      const updateData = req.body;

      const { password, ...allowedUpdates } = updateData;

      console.log(allowedUpdates);

      const updatedUser = await userRepo.updateProfile(userId, allowedUpdates);

      res.status(200).json({
        status: 200,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message || "Update profile failed",
      });
    }
  }

  async getProfile(req, res) {
    try {
      console.log(req.user);
      const userId = req.user.id; // Get user ID from token
      const user = await userRepo.getProfile(userId);

      res.status(200).json({
        status: 200,
        message: "Profile retrieved successfully",
        data: user,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        message: err.message || "Get profile failed",
      });
    }
  }
}
module.exports = new AuthController();
