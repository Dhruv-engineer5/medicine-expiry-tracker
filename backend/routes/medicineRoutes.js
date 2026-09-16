const express = require("express");

const {
  getMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
} = require("../controllers/medicineController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// All medicine routes require login
router.use(protect);

router.get("/", getMedicines);
router.get("/:id", getMedicineById);
router.post("/", createMedicine);
router.put("/:id", updateMedicine);
router.delete("/:id", deleteMedicine);

module.exports = router;