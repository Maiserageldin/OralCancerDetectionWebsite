import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AccessTokenContext } from "../AccessTokenContext.jsx";
import "./styles/employeeHome.css";
import React, { useState, useEffect, useContext } from 'react';

function ViewVisitsModal({ handleClose, show, visits, selectedPatientName }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const { accessToken } = useContext(AccessTokenContext);

//   useEffect(() => {
//     const fetchVisits = async () => {
//         try {
//             const response = await axios.get(
//               `https://clinicmanagement20240427220332.azurewebsites.net/api/Visits/GetPatientVisits/${selectedPatientId}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 }
//             );
//             const data = response.data.data;

//             // Create an array to store doctor data
//             const visitsArray = data.map(visitsDB => ({
//                 id: visitsDB.id,
                
//             }));

//             // Set the state variable with the fetched data
            
//             console.log("All Visits for patient", selectedPatientId, "are:", data);

//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };



    
//     fetchVisits();
// }, [accessToken]);



  return (
    <div className={showHideClassName}>
      <section className="viewVisitsmodal-main">
        <button className="viewVisitsclose-btn" onClick={handleClose}>X</button>
        <p>This is all the visits for {selectedPatientName}.</p>
        <div className="visits-list-container">
                            <ul className="visits-list">
                                {visits.map(visit => (
                                    <li key={visit.id}>
                                        <div className="item">
                                            {/* <FontAwesomeIcon style={{ marginRight: '20px' }} icon={patient.showDetails ? faAngleUp : faAngleDown} className="toggle-icon" onClick={() => toggleDetails(patient)} /> */}
                                            <span>{visit.date}</span>
                                            {/* <div className="actions">
                                                <FontAwesomeIcon style={{ marginRight: '70px' }} icon={faCalendarPlus} className="visit-icon" onClick={() => toggleAddVisitForm(patient.id, patient.gender, patient.age)} />
                                                <FontAwesomeIcon style={{ marginRight: '30px' }} icon={faEdit} className="edit-icon" onClick={() => handleEditPatient(patient.id)} />
                                                <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" onClick={() => handleDeletePatient(patient.id, patient.name)} />
                                            </div> */}
                                            
                                            
                                            <div className="details">
                                                <p>Visit Number: {visit.visitNumber}</p>
                                                <p>Assigned Doctor: {visit.doctorName}</p>
                                                <p>Speciality: {visit.speciality}</p>
                                                
                                                {/* <button className="view-visits-btn" onClick={() => handleViewVisits(patient.id, patient.name)}>View Visits</button> */}
                                            </div>
                                            
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
      </section>
    </div>
  );
}

export default ViewVisitsModal;
