import React from "react";

function PatientVisits() {
  const visitsData = [
    { id: 1, date: "2024-04-25", doctor: "Dr. Smith", reason: "Checkup" },
    { id: 2, date: "2024-04-18", doctor: "Dr. Jones", reason: "Follow-up" },
  ];

  return (
    <div className="container">
      <h1>My Visits</h1>
      <div className="visits-list">
        {visitsData.map((visit) => (
          <div className="visit-item" key={visit.id}>
            <div className="visit-id">{visit.id}</div>
            <div className="visit-data">
              <p>Date: {visit.date}</p>
              <p>Doctor: {visit.doctor}</p>
              <p>Reason: {visit.reason}</p>
            </div>
            <button className="view-button">View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PatientVisits;
