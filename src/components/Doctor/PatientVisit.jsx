import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Layout from "../Layout";
import Footer from "../Footer";
import Header2 from "../Header2";
import "./styles/PatientVisit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { AccessTokenContext } from "../AccessTokenContext.jsx";

function PatientVisits() {
  const { accessToken } = useContext(AccessTokenContext);
  const [visits, setVisits] = useState([]);
  const { patientID } = useParams();
  const navigate = useNavigate();
  const loc = useLocation();
  const { usernameResponse } = loc.state || {};
  
  console.log("patientID:", patientID);
  console.log("usernameResponse:", usernameResponse);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await axios.get(
          `https://clinicmanagement20240427220332.azurewebsites.net/api/Visits/GetPatientVisits/${patientID}`,
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
        setVisits([]);
      }
    };

    fetchVisits();
  }, [patientID, accessToken]);

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
    console.log("visit ID", visitId);
    localStorage.setItem("visitId", visitId);
    navigate(`/patientRecord/${patientID}`, { state: { usernameResponse } });
  };

  return (
    <div className="doctor-dashboard">
      <div className="page-container">
        <Layout>
          <Header2 username={usernameResponse} />
        </Layout>
        <div className="content">
          <div className="column">
            <div className="section">
              <div className="title-container">
                <h2>Patient Visits</h2>
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
    </div>
  );
}

export default PatientVisits;
