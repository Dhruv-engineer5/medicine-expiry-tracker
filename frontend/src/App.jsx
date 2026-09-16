import { useEffect, useMemo, useState } from "react";

import Dashboard from "./components/Dashboard";
import MedicineForm from "./components/MedicineForm";
import MedicineList from "./components/MedicineList";

import Login from "./pages/Login";
import Register from "./pages/Register";

import {
  addMedicine,
  deleteMedicine,
  getMedicines,
  updateMedicine,
} from "./services/medicineService";

function App() {
  const [user, setUser] = useState(null);
  const [authPage, setAuthPage] = useState("login");

  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingMedicine, setEditingMedicine] =
    useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] =
    useState("All");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchMedicines();
    }
  }, [user]);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMedicines();

      setMedicines(response.data || []);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        handleLogout();
        return;
      }

      setError(
        "Unable to load medicines."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  const handleRegister = (registeredUser) => {
    setUser(registeredUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setMedicines([]);
    setEditingMedicine(null);
  };

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
        const response = await addMedicine(
          medicineData
        );

        setMedicines((previous) => [
          response.data,
          ...previous,
        ]);
      }
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        handleLogout();
        return;
      }

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
        previous.filter(
          (medicine) => medicine._id !== id
        )
      );
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        handleLogout();
        return;
      }

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

      return (
        matchesSearch && matchesStatus
      );
    });
  }, [
    medicines,
    searchTerm,
    filterStatus,
  ]);

  if (!user) {
    if (authPage === "register") {
      return (
        <Register
          onRegister={handleRegister}
          onShowLogin={() =>
            setAuthPage("login")
          }
        />
      );
    }

    return (
      <Login
        onLogin={handleLogin}
        onShowRegister={() =>
          setAuthPage("register")
        }
      />
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div>
            <p className="app-subtitle">
              Welcome, {user.name}
            </p>

            <h1>Medicine Expiry Tracker</h1>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
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
          onCancel={() =>
            setEditingMedicine(null)
          }
        />

        <section className="medicine-section">
          <div className="section-header">
            <div>
              <h2>My Medicines</h2>
              <p>
                Only your medicines are shown here.
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
                <option value="Expired">
                  Expired
                </option>
                <option value="Expiring Soon">
                  Expiring Soon
                </option>
                <option value="Safe">
                  Safe
                </option>
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