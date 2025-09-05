const AppDataSource = require("../data-source");
const User = require("../entities/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "1sampai8";

class UserRepository {
  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }
  async register(data) {
    const { name, email, password } = data;
    const existingUser = await this.repo.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = this.repo.create({ name, email, password: hashed });
    return await this.repo.save(user);
  }
  async login(data) {
    const { email, password } = data;
    const user = await this.repo
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const result = { id: user.id, email: user.email, token };
    return result;
  }
  async updateProfile(id, data) {
    const user = await this.repo
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne();
    if (!user) {
      throw new Error("User not found");
    }

    const { password, ...updateData } = data;

    // Update user fields
    Object.assign(user, updateData);
    const updatedUser = await this.repo.save(user);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser;

    return userWithoutPassword;
  }

  async getProfile(id) {
    try {
      const user = await this.repo.findOne({
        where: { id: id },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw new Error(`Get profile failed: ${error.message}`);
    }
  }
}
module.exports = new UserRepository();
