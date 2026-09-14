const Dashboard = ({ medicines }) => {
  const total = medicines.length;

  const expired = medicines.filter(
    (medicine) => medicine.status === "Expired"
  );

  const expiringSoon = medicines.filter(
    (medicine) => medicine.status === "Expiring Soon"
  );

  const safe = medicines.filter(
    (medicine) => medicine.status === "Safe"
  );

  const getDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    const differenceInTime =
      expiry.getTime() - today.getTime();

    return Math.ceil(
      differenceInTime / (1000 * 60 * 60 * 24)
    );
  };

  const urgentMedicines = medicines
    .map((medicine) => ({
      ...medicine,
      daysLeft: getDaysLeft(medicine.expiryDate),
    }))
    .filter((medicine) => medicine.daysLeft <= 30)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 5);

  return (
    <section className="dashboard-section">
      <div className="dashboard-heading">
        <div>
          <p className="dashboard-label">
            Overview
          </p>

          <h2>Medicine Dashboard</h2>

          <p className="dashboard-description">
            Keep track of medicine stock and expiry dates.
          </p>
        </div>

        <div className="dashboard-date">
          {new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>

      <div className="dashboard">
        <div className="stat-card">
          <div className="stat-icon">M</div>

          <div>
            <span>Total Medicines</span>
            <strong>{total}</strong>
          </div>
        </div>

        <div className="stat-card stat-danger">
          <div className="stat-icon">!</div>

          <div>
            <span>Expired</span>
            <strong>{expired.length}</strong>
          </div>
        </div>

        <div className="stat-card stat-warning">
          <div className="stat-icon">!</div>

          <div>
            <span>Expiring Soon</span>
            <strong>{expiringSoon.length}</strong>
          </div>
        </div>

        <div className="stat-card stat-safe">
          <div className="stat-icon">✓</div>

          <div>
            <span>Safe</span>
            <strong>{safe.length}</strong>
          </div>
        </div>
      </div>

      <div className="dashboard-bottom">
        <div className="summary-card">
          <h3>Quick Summary</h3>

          <div className="summary-row">
            <span>Total medicines</span>
            <strong>{total}</strong>
          </div>

          <div className="summary-row">
            <span>Expired medicines</span>
            <strong>{expired.length}</strong>
          </div>

          <div className="summary-row">
            <span>Expiring within 30 days</span>
            <strong>{expiringSoon.length}</strong>
          </div>

          <div className="summary-row">
            <span>Safe medicines</span>
            <strong>{safe.length}</strong>
          </div>
        </div>

        <div className="urgent-card">
          <div className="urgent-header">
            <div>
              <h3>Most Urgent</h3>
              <p>Medicines needing attention first</p>
            </div>
          </div>

          {urgentMedicines.length === 0 ? (
  <div className="no-urgent">
    <div className="no-urgent-icon">✓</div>

    <strong>Everything looks good</strong>

    <span>
      No medicine is expired or expiring within 30 days.
    </span>
  </div>
) : (
            <div className="urgent-list">
              {urgentMedicines.map((medicine) => (
                <div
                  className="urgent-item"
                  key={medicine._id}
                >
                  <div>
                    <strong>{medicine.name}</strong>

                    <span>
                      Quantity: {medicine.quantity}
                    </span>
                  </div>

                  <div className="urgent-days">
                    {medicine.daysLeft < 0
                      ? `${Math.abs(
                          medicine.daysLeft
                        )} days ago`
                      : medicine.daysLeft === 0
                      ? "Today"
                      : `${medicine.daysLeft} ${
                          medicine.daysLeft === 1
                            ? "day"
                            : "days"
                        } left`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;