const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const medicineRoutes = require("./routes/medicineRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Medicine Expiry Tracker API is running",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Medicine routes
app.use("/api/medicines", medicineRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});