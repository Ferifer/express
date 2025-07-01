const express = require("express");
const session = require("express-session");

const app = express();
const port = 3000;
app.use(
  express.json(),
  session({
    secret: "1sampai8",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 360000,
    },
  })
);

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "user" && password === "1sampai8") {
    req.session.regenerate((err) => {
      if (err)
        return res.status(500).json({
          message: "Error Regenerate Session",
        });
      req.session.user = { username };
      res.json({
        message: "Login Berhasil",
      });
    });
  } else {
    res.status(401).json({
      message: "username/password salah",
    });
  }
});

const authenticate = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({
      message: "Login Terlebih dahulu",
    });
  }
};

app.get("/dashboard", authenticate, (req, res) => {
  console.log("session", req.session.user);
  res.json({
    message: `Selamat Datang, ${req.session.user.username}`,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout gagal" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logout berhasil" });
  });
  //
});
