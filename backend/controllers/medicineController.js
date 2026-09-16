const Medicine = require("../models/Medicine");

const getMedicineStatus = (expiryDate) => {
  const today = new Date();
  const expiry = new Date(expiryDate);

  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const differenceInTime =
    expiry.getTime() - today.getTime();

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

// Get user's medicines
const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      user: req.user.id,
    }).sort({
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

// Get one user's medicine
const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        ...medicine.toObject(),
        status: getMedicineStatus(medicine.expiryDate),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch medicine",
      error: error.message,
    });
  }
};

// Create medicine for logged-in user
const createMedicine = async (req, res) => {
  try {
    const { name, expiryDate, quantity } = req.body;

    if (!name || !expiryDate || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message:
          "Name, expiry date and quantity are required",
      });
    }

    const medicine = await Medicine.create({
      name,
      expiryDate,
      quantity,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Medicine added successfully",
      data: {
        ...medicine.toObject(),
        status: getMedicineStatus(medicine.expiryDate),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add medicine",
      error: error.message,
    });
  }
};

// Update only user's medicine
const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
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

    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      data: {
        ...medicine.toObject(),
        status: getMedicineStatus(medicine.expiryDate),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update medicine",
      error: error.message,
    });
  }
};

// Delete only user's medicine
const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

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