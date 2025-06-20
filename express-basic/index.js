// steps:
// 1. npm init
// 2. npm i express nodemon
// 3. tambahkan di package.json bagian scripts >>> "dev": "nodemon index.js" <<<
// 4. npm run dev

const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
];

app.get("/products", (req, res) => {
  const { name } = req.query;

  const filteredProducts = name
    ? products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      )
    : products;

  res.json({
    message: "list of products",
    data: filteredProducts,
  });
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((product) => product.id === productId);

  if (product) {
    res.json({
      message: "product details",
      data: product,
    });
  } else {
    res.status(404).json({
      message: "product not found",
      data: null,
    });
  }
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({
      message: "name and price are required",
    });
  }
  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };
  products.push(newProduct);
  res.status(201).json({
    message: "product created",
    data: newProduct,
  });
});

app.put("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({
        message: "name and price are required",
      });
    }
    products[productIndex] = { id: productId, name, price };
    res.json({
      message: "product updated",
      data: products[productIndex],
    });
  } else {
    res.status(404).json({
      message: "product not found",
    });
  }
});

app.patch("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    const { name, price } = req.body;
    if (name) products[productIndex].name = name;
    if (price) products[productIndex].price = price;
    res.json({
      message: "product updated",
      data: products[productIndex],
    });
  } else {
    res.status(404).json({
      message: "product not found",
    });
  }
});

app.delete("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    res.json({
      message: "product deleted",
    });
  } else {
    res.status(404).json({
      message: "product not found",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
