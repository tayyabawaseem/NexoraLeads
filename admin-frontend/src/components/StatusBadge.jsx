import React from "react";

const StatusBadge = ({ status }) => {
  return <span className={`badge ${status}`}>{status}</span>;
};

export default StatusBadge;
