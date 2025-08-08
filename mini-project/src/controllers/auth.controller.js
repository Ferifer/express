const userRepo = require("../repository/user.repository");

class AuthController {
  async login(req, res) {
    const login = await userRepo.login(req.body);
    return login;
  }

  async register(req, res) {
    const register = await userRepo.register(req.body);
    res.status(201).json({
      status: 201,
      message: "register success",
      data: register,
    });
  }
}
module.exports = new AuthController();
