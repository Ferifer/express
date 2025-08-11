require("dotenv").config();
const express = require("express");
const cors = require("cors");
const AppDataSource = require("./data-source");
const patientRoutes = require("./routes/patient.routes");
const visitRoutes = require("./routes/visit.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/visits", visitRoutes);
app.use("/api/v1/auth", authRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Data Source initialized!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error during Data Source initialization", error);
  });
