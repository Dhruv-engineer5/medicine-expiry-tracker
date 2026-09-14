const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case "Expired":
        return "status-badge expired";

      case "Expiring Soon":
        return "status-badge expiring-soon";

      case "Safe":
        return "status-badge safe";

      default:
        return "status-badge";
    }
  };

  return (
    <span className={getStatusClass()}>
      {status}
    </span>
  );
};

export default StatusBadge; 