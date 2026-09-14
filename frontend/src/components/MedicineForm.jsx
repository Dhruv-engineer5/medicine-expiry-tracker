import { useEffect, useState } from "react";

const MedicineForm = ({ onSubmit, editingMedicine, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    expiryDate: "",
    quantity: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingMedicine) {
      setFormData({
        name: editingMedicine.name,
        expiryDate: editingMedicine.expiryDate
          ? editingMedicine.expiryDate.split("T")[0]
          : "",
        quantity: editingMedicine.quantity,
      });
    } else {
      setFormData({
        name: "",
        expiryDate: "",
        quantity: "",
      });
    }

    setError("");
  }, [editingMedicine]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const quantity = Number(formData.quantity);

    if (!name) {
      setError("Please enter a medicine name.");
      return;
    }

    if (!formData.expiryDate) {
      setError("Please select an expiry date.");
      return;
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
      setError("Quantity must be a valid number greater than or equal to 0.");
      return;
    }

    onSubmit({
      name,
      expiryDate: formData.expiryDate,
      quantity,
    });
  };

  return (
    <form className="medicine-form" onSubmit={handleSubmit}>
      <h2>
        {editingMedicine ? "Edit Medicine" : "Add Medicine"}
      </h2>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="medicine-name">
          Medicine Name
        </label>

        <input
          id="medicine-name"
          type="text"
          name="name"
          placeholder="Enter medicine name"
          value={formData.name}
          onChange={handleChange}
          maxLength={100}
        />
      </div>

      <div className="form-group">
        <label htmlFor="expiry-date">
          Expiry Date
        </label>

        <input
          id="expiry-date"
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantity">
          Quantity
        </label>

        <input
          id="quantity"
          type="number"
          name="quantity"
          placeholder="Enter quantity"
          min="0"
          step="1"
          value={formData.quantity}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit">
          {editingMedicine
            ? "Update Medicine"
            : "Add Medicine"}
        </button>

        {editingMedicine && (
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default MedicineForm;