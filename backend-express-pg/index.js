const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "express",
  password: "postgres",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("Express dengan PostgreSQL tanpa ORM");
});

app.get("/products", async (req, res) => {
  try {
    const query = "SELECT * FROM products";
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM products WHERE id = $1";
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).send("Product not found");
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/products", async (req, res) => {
  try {
    const { id, name, price, stock_quantity } = req.body;
    if (!id || !name || !price || !stock_quantity) {
      res.status(400).json({
        message: `Field id , name, price, stock_quantity is required`,
      });
    }
    const query = `
      INSERT INTO products (id,name, price, stock_quantity) 
      VALUES ($1, $2, $3, $4) 
      RETURNING *
    `;
    const { rows } = await pool.query(query, [id, name, price, stock_quantity]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
