import axios from "axios";

const API_URL =
  "https://medicine-expiry-tracker-1.onrender.com/api/medicines";

// Get all medicines
export const getMedicines = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single medicine
export const getMedicineById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Add medicine
export const addMedicine = async (medicineData) => {
  const response = await axios.post(API_URL, medicineData);
  return response.data;
};

// Update medicine
export const updateMedicine = async (id, medicineData) => {
  const response = await axios.put(`${API_URL}/${id}`, medicineData);
  return response.data;
};

// Delete medicine
export const deleteMedicine = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};