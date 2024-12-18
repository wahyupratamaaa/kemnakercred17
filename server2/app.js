const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;

const admin = require("firebase-admin");
dotenv.config();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Konfigurasi Firebase
var serviceAccount = require("../server2/kemnaker17-firebase-adminsdk-d0r51-ffbdb0115b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://kemnaker17-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.database();

app.get("/", (req, res) => {
  res.send("Hello Wahyu Pratama!");
});

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
