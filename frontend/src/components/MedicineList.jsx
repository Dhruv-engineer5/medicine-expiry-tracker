import MedicineCard from "./MedicineCard";

const MedicineList = ({
  medicines,
  onDelete,
  onEdit,
}) => {
  if (medicines.length === 0) {
    return (
      <div className="empty-state">
        <h3>No medicines found</h3>
        <p>Add a medicine to start tracking expiry dates.</p>
      </div>
    );
  }

  return (
    <div className="medicine-grid">
      {medicines.map((medicine) => (
        <MedicineCard
          key={medicine._id}
          medicine={medicine}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default MedicineList;