require("reflect-metadata");
const express = require("express");
const { createConnection, getRepository } = require("typeorm");
const users = require("./entity/user.entity");
const app = express();
app.use(express.json());

createConnection().then(() => {
  const userRepo = getRepository("users");

  // GET LIST => Mendapatkan List Users
  app.get("/users", async (req, res) => {
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
