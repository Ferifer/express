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
}
module.exports = new AuthController();
