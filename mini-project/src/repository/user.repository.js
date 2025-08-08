const AppDataSource = require("../data-source");
const User = require("../entities/User");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "1sampai8";

class UserRepository {
  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }
  async register(data) {
    const { name, email, password } = data;
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
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      status: 200,
      message: "Login Success",
      data: { id: user.id, email: user.email, token },
    });
  }
}
module.exports = new UserRepository();
