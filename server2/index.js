const express = require("express");
const app = express();
const cors = require("cors");
const admin = require("firebase-admin");

// Middleware CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://kemnaker17-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.database();

// Root route
app.get("/", (req, res) => {
  res.send("Hello Wahyu Pratama!");
});

// Produk route
app.get("/produk", async (req, res) => {
  try {
    const ref = db.ref("products");
    ref.once("value", (snapshot) => {
      const data = snapshot.val();
      const filteredData = Object.values(data).filter((item) => item !== null);
      res.json(filteredData);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data produk dari Firebase.",
    });
  }
});

module.exports = app; // Jangan gunakan app.listen
