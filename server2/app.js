const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const admin = require("firebase-admin");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

var serviceAccount = require("./dburgent-da356-firebase-adminsdk-e9ezv-bcd8824aee.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  databaseURL:
    "https://dburgent-da356-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.database();

app.get("/", (req, res) => {
  res.send("Hello Wahyu Pratama!");
});

app.get("/produk", async (req, res) => {
  try {
    const ref = db.ref("products");
    const snapshot = await ref.once("value");
    const data = snapshot.val();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
