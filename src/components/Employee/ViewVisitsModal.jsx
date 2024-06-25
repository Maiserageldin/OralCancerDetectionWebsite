import axios from "axios";
import React, { useState, useContext } from "react";
import { AccessTokenContext } from "../AccessTokenContext.jsx";
import DetailedVisitModal from "./DetailedVisitModal";
import "./styles/employeeHome.css";

function ViewVisitsModal({
  handleClose,
  show,
  loading,
  visits,
  selectedPatientName,
}) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const { accessToken } = useContext(AccessTokenContext);

  const [selectedVisit, setSelectedVisit] = useState(null);
  const [predictionResponse, setPredictionResponse] = useState(null);

  const handleVisitClick = (visit) => {
    setSelectedVisit(visit);
  };

  const handleDetailedModalClose = () => {
    setSelectedVisit(null);
  };

  const handleModelPrediction = async (visitId) => {
    try {
      const response = await axios.put(
        `https://clinicmanagement20240427220332.azurewebsites.net/api/Visits/Predict/VisitId/${visitId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Prediction Request Successful!", response.data);
      const newPrediction = {
        visitId: visitId,
        prediction: response.data.aiDiagnosis,
      };

      setPredictionResponse(newPrediction);

      // Retrieve existing predictions from local storage
      const existingPredictions =
        JSON.parse(localStorage.getItem("predictions")) || {};
      // Add new prediction to the existing predictions
      existingPredictions[visitId] = response.data.aiDiagnosis;
      // Save updated predictions back to local storage
      localStorage.setItem("predictions", JSON.stringify(existingPredictions));

      // Print the updated predictions to the console
      console.log("Updated predictions:", existingPredictions);
    } catch (error) {
      if (error.response) {
        console.error("Prediction Model Error:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Validation Errors:", error.response.data.errors);
      } else if (error.request) {
        console.error("Network Error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className={showHideClassName}>
      <section className="viewVisitsmodal-main">
        <button className="viewVisitsclose-btn" onClick={handleClose}>
          X
        </button>
        <div className="visits-list-container">
          {loading ? (
            <p>Loading...</p>
          ) : visits.length === 0 ? (
            <p>No visits for {selectedPatientName}.</p>
          ) : (
            <>
              <p>This is all the visits for {selectedPatientName}.</p>
              <ul className="visits-list">
                {visits.map((visit) => (
                  <li key={visit.id} onClick={() => handleVisitClick(visit)}>
                    <div className="item">
                      <span>{visit.date.split("T")[0]}</span>
                      <div className="details">
                        <p>Visit Number: {visit.visitNumber}</p>
                        <p>Assigned Doctor: {visit.doctorName}</p>
                        <p>Speciality: {visit.speciality}</p>
                        <button
                          className="model-prediction-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleModelPrediction(visit.id);
                          }}
                        >
                          Predict Cancer Risk
                        </button>
                        {/* Display prediction response if available */}
                        {predictionResponse &&
                          predictionResponse.visitId === visit.id && (
                            <p className="prediction-response">
                              {predictionResponse.prediction}
                            </p>
                          )}
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
