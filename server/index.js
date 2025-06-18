const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Load product list
const productFilePath = path.join(__dirname, "productList.json");

function loadProducts() {
  const data = fs.readFileSync(productFilePath, "utf-8");
  return JSON.parse(data);
}

// Test route
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<center><h2>Welcome to the Speech Order System</h2><h3>Developed for Bizwy</h3><p>A voice-powered ordering solution to streamline your business operations</p></center>"
    );
});

// Products route
app.get("/api/products", (req, res) => {
  try {
    const products = loadProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Could not load products" });
  }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
