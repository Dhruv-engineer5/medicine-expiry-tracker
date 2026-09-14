import { useEffect, useMemo, useState } from "react";

import Dashboard from "./components/Dashboard";
import MedicineForm from "./components/MedicineForm";
import MedicineList from "./components/MedicineList";

import {
  addMedicine,
  deleteMedicine,
  getMedicines,
  updateMedicine,
} from "./services/medicineService";

function App() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMedicines();

      setMedicines(response.data || []);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load medicines. Please check the backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleSubmit = async (medicineData) => {
    try {
      setError("");

      if (editingMedicine) {
        const response = await updateMedicine(
          editingMedicine._id,
          medicineData
        );

        setMedicines((previous) =>
          previous.map((medicine) =>
            medicine._id === editingMedicine._id
              ? response.data
              : medicine
          )
        );

        setEditingMedicine(null);
      } else {
        const response = await addMedicine(medicineData);

        setMedicines((previous) => [
          response.data,
          ...previous,
        ]);
      }
    } catch (error) {
      console.error(error);

      setError("Unable to save medicine.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteMedicine(id);

      setMedicines((previous) =>
        previous.filter((medicine) => medicine._id !== id)
      );
    } catch (error) {
      console.error(error);

      setError("Unable to delete medicine.");
    }
  };

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const filteredMedicines = useMemo(() => {
    return medicines.filter((medicine) => {
      const matchesSearch = medicine.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "All" ||
        medicine.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [medicines, searchTerm, filterStatus]);

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="app-subtitle">Home Medicine Manager</p>
          <h1>Medicine Expiry Tracker</h1>
        </div>
      </header>

      <main className="container">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <Dashboard medicines={medicines} />

        <MedicineForm
          onSubmit={handleSubmit}
          editingMedicine={editingMedicine}
          onCancel={() => setEditingMedicine(null)}
        />

        <section className="medicine-section">
          <div className="section-header">
            <div>
              <h2>My Medicines</h2>
              <p>
                Track your medicines and expiry dates.
              </p>
            </div>

            <div className="filters">
              <input
                type="text"
                placeholder="Search medicine..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />

              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value)
                }
              >
                <option value="All">All</option>
                <option value="Expired">Expired</option>
                <option value="Expiring Soon">
                  Expiring Soon
                </option>
                <option value="Safe">Safe</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading">
              Loading medicines...
            </div>
          ) : (
            <MedicineList
              medicines={filteredMedicines}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;