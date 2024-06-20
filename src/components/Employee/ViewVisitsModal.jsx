import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AccessTokenContext } from "../AccessTokenContext.jsx";
import "./styles/employeeHome.css";
import React, { useState, useEffect, useContext } from 'react';
import DetailedVisitModal from './DetailedVisitModal';

function ViewVisitsModal({ handleClose, show, visits, selectedPatientName }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const { accessToken } = useContext(AccessTokenContext);

  const [selectedVisit, setSelectedVisit] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleVisitClick = (visit) => {
    setSelectedVisit(visit);
  };

  const handleDetailedModalClose = () => {
    setSelectedVisit(null);
  };

  useEffect(() => {
    if (show) {
      setLoading(true);
      // Simulate a delay for fetching data
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [show]);

  return (
    <div className={showHideClassName}>
      <section className="viewVisitsmodal-main">
        <button className="viewVisitsclose-btn" onClick={handleClose}>X</button>
        <div className="visits-list-container">
          {loading ? (
            <p>Loading...</p>
          ) : visits.length === 0 ? (
            <p>No visits for {selectedPatientName}.</p>
          ) : (
            <>
              <p>This is all the visits for {selectedPatientName}.</p>
              <ul className="visits-list">
                {visits.map(visit => (
                  <li key={visit.id} onClick={() => handleVisitClick(visit)}>
                    <div className="item">
                      <span>{visit.date.split('T')[0]}</span>
                      <div className="details">
                        <p>Visit Number: {visit.visitNumber}</p>
                        <p>Assigned Doctor: {visit.doctorName}</p>
                        <p>Speciality: {visit.speciality}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      {selectedVisit && (
        <DetailedVisitModal
          handleClose={handleDetailedModalClose}
          show={!!selectedVisit}
          visit={selectedVisit}
        />
      )}
    </div>
  );
}

export default ViewVisitsModal;
