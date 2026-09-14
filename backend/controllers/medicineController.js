const Medicine = require("../models/Medicine");

// Calculate medicine status
const getMedicineStatus = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);

  // Remove time portion
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const differenceInTime = expiry.getTime() - today.getTime();

  const differenceInDays = Math.ceil(
    differenceInTime / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays < 0) {
    return "Expired";
  }

  if (differenceInDays <= 30) {
    return "Expiring Soon";
  }

  return "Safe";
};

// Get all medicines
const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({
      expiryDate: 1,
    });

    const medicinesWithStatus = medicines.map((medicine) => ({
      ...medicine.toObject(),
      status: getMedicineStatus(medicine.expiryDate),
    }));

    res.status(200).json({
      success: true,
      count: medicinesWithStatus.length,
      data: medicinesWithStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch medicines",
      error: error.message,
    });
  }
};

// Get single medicine
const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    const medicineWithStatus = {
      ...medicine.toObject(),
      status: getMedicineStatus(medicine.expiryDate),
    };

    res.status(200).json({
      success: true,
      data: medicineWithStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch medicine",
      error: error.message,
    });
  }
};

// Create medicine
const createMedicine = async (req, res) => {
  try {
    const { name, expiryDate, quantity } = req.body;

    if (!name || !expiryDate || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Name, expiry date and quantity are required",
      });
    }

    const medicine = await Medicine.create({
      name,
      expiryDate,
      quantity,
    });

    const medicineWithStatus = {
      ...medicine.toObject(),
      status: getMedicineStatus(medicine.expiryDate),
    };

    res.status(201).json({
      success: true,
      message: "Medicine added successfully",
      data: medicineWithStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add medicine",
      error: error.message,
    });
  }
};

// Update medicine
const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    const medicineWithStatus = {
      ...medicine.toObject(),
      status: getMedicineStatus(medicine.expiryDate),
    };

    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      data: medicineWithStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update medicine",
      error: error.message,
    });
  }
};

// Delete medicine
const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete medicine",
      error: error.message,
    });
  }
};

module.exports = {
  getMedicines,
  getMedicineById,
  createMedicine,
  updateMedicine,
  deleteMedicine,
};