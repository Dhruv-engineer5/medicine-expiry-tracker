const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const medicineRoutes = require("./routes/medicineRoutes");

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

// Medicine routes
app.use("/api/medicines", medicineRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});