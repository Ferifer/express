require("reflect-metadata");
const express = require("express");
const { createConnection, getRepository } = require("typeorm");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware = require("./middleware");
const app = express();
app.use(express.json());

// Implement Authorization
const JWT_SECRET = "1sampai8";
createConnection().then(() => {
  const userRepo = getRepository("users");
  // REGISTER
  app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "name, email, password required" });

    const exist = await userRepo.findOne({ where: { email } });
    if (exist) return res.status(400).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);
    const user = userRepo.create({ name, email, password: hashed });
    const result = await userRepo.save(user);
    res.status(201).json({
      message: "Register success",
      data: { id: result.id, name: result.name, email: result.email },
    });
  });

  // LOGIN
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userRepo
      .createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  });

  // GET LIST => Mendapatkan List Users
  app.get("/users", authMiddleware, async (req, res) => {
    const users = await userRepo.find();
    console.log("users", users);
    res.json({
      status: 200,
      message: "Success Get Data",
      data: users,
    });
  });

  // GET DETAIL => mendapatkan detail user
  app.get("/users/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
    const user = await userRepo.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.json({
        status: 404,
        message: `Data ${userId} Not Found`,
        data: null,
      });
    }

    res.json({
      status: 200,
      message: "Success Get Data",
      data: user,
    });
  });

  // CREATE USER
  app.post("/users", async (req, res) => {
    const user = userRepo.create(req.body);
    const result = await userRepo.save(user);
    res.json({
      status: 201,
      message: "Success Create Data",
      data: result,
    });
  });

  app.patch("/users/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    const user = await userRepo.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.json({
        status: 404,
        message: `Data ${userId} Not Found`,
        data: null,
      });
    }
    const updateData = await userRepo.update(userId, {
      name: name,
      email: email,
    });
    res.json({
      status: 200,
      message: "Success Update Data",
      data: updateData,
    });
  });

  // Start server
  app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
  });
});
