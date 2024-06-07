import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import "./styles/PatientDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AccessTokenContext } from "../AccessTokenContext.jsx";

function PatientVisits({ userId }) {
  const { accessToken } = useContext(AccessTokenContext);
  const navigate = useNavigate();

  if (!userId) {
    userId = localStorage.getItem("userId");
  }

  console.log("Main Access Token: ", accessToken);
  console.log("User Id ", userId);

  const [visits, setVisits] = useState([]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await axios.get(
          `https://clinicmanagement20240427220332.azurewebsites.net/api/Visits/GetPatientVisits/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = response.data.data;
        console.log("Fetched data:", data);

        const VisitsArray = data.map((Visitdb) => {
          let specialityName;

          switch (Visitdb.speciality) {
            case 0:
              specialityName = "Oral and Maxillofacial Surgeon";
              break;
            case 1:
              specialityName = "Prosthodontist";
              break;
            case 2:
              specialityName = "Oral Pathologist";
              break;
            default:
              specialityName = "Oral Medicine Specialist";
              break;
          }
          return {
            id: Visitdb.id,
            date: new Date(Visitdb.date).toISOString().split("T")[0],
            doctorName: Visitdb.doctorName,
            speciality: specialityName,
            visitNumber: Visitdb.visitNumber,
          };
        });
        setVisits(VisitsArray);
      } catch (error) {
        console.error("Error fetching visits:", error);
        setVisits([]); // Set to empty array on error
      }
    };

    if (userId) {
      fetchVisits();
    }
  }, [userId, accessToken]);

  const toggleDetails = (visitId) => {
    setVisits(
      visits.map((visit) =>
        visit.id === visitId
          ? { ...visit, showDetails: !visit.showDetails }
          : visit
      )
    );
  };

  const handleViewRecord = (visitId) => {
    localStorage.setItem("visitId", visitId);
    navigate("/patientRecord");
  };

  if (!Array.isArray(visits) || visits.length === 0) {
    console.log("No patient visits.");
    return (
      <div className="title-container">
        <h1>My Record</h1>
        <div className="patient-list">
          <div>NO DATA</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      <div className="content">
        <div className="column">
          <div className="section">
            <div className="title-container">
              <h2>My Visits</h2>
            </div>
            <ul className="patient-list">
              {visits.map((visit) => (
                <li key={visit.id}>
                  <div className="item">
                    <div className="row">
                      <div>
                        <FontAwesomeIcon
                          icon={visit.showDetails ? faAngleUp : faAngleDown}
                          className="toggle-icon"
                          onClick={() => toggleDetails(visit.id)}
                        />
                        <span>{visit.date}</span>
                      </div>
                      <button
                        className="ViewButton"
                        onClick={() => handleViewRecord(visit.id)}
                      >
                        View Record
                      </button>
                    </div>
                    {visit.showDetails && (
                      <div className="details">
                        <p>Doctor: {visit.doctorName}</p>
                        <p>Doctor Speciality: {visit.speciality}</p>
                        <p>Visit Number: {visit.visitNumber}</p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PatientVisits;
