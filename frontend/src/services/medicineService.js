import axios from "axios";

const API_URL =
  "https://medicine-expiry-tracker-1.onrender.com/api/medicines";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getMedicines = async () => {
  const response = await axios.get(
    API_URL,
    getAuthHeaders()
  );

  return response.data;
};

export const getMedicineById = async (id) => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );

  return response.data;
};

export const addMedicine = async (medicineData) => {
  const response = await axios.post(
    API_URL,
    medicineData,
    getAuthHeaders()
  );

  return response.data;
};

export const updateMedicine = async (
  id,
  medicineData
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    medicineData,
    getAuthHeaders()
  );

  return response.data;
};

export const deleteMedicine = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );

  return response.data;
};