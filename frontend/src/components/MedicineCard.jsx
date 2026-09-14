import StatusBadge from "./StatusBadge";

const MedicineCard = ({ medicine, onDelete, onEdit }) => {
  const today = new Date();
  const expiry = new Date(medicine.expiryDate);

  // Remove time part
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const differenceInTime = expiry.getTime() - today.getTime();

  const daysLeft = Math.ceil(
    differenceInTime / (1000 * 60 * 60 * 24)
  );

  const formattedDate = expiry.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const getDaysMessage = () => {
    if (daysLeft < 0) {
      const expiredDays = Math.abs(daysLeft);

      return `${expiredDays} ${
        expiredDays === 1 ? "day" : "days"
      } ago`;
    }

    if (daysLeft === 0) {
      return "Expires today";
    }

    return `${daysLeft} ${
      daysLeft === 1 ? "day" : "days"
    } left`;
  };

  const getDaysClass = () => {
    if (daysLeft < 0) {
      return "days-expired";
    }

    if (daysLeft <= 30) {
      return "days-warning";
    }

    return "days-safe";
  };

  return (
    <div className="medicine-card">
      <div className="medicine-card-header">
        <h3>{medicine.name}</h3>

        <StatusBadge status={medicine.status} />
      </div>

      <div className="medicine-info">
        <div>
          <span>Expiry Date</span>
          <strong>{formattedDate}</strong>
        </div>

        <div>
          <span>Quantity</span>
          <strong>{medicine.quantity}</strong>
        </div>
      </div>

      <div className={`days-left ${getDaysClass()}`}>
        {daysLeft < 0 ? "Expired " : ""}
        {getDaysMessage()}
      </div>

      <div className="medicine-actions">
        <button onClick={() => onEdit(medicine)}>
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(medicine._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MedicineCard;