import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header2 from "../Header2";
import Layout from "../Layout";
import "./styles/DoctorViewPatients.css";
import { AccessTokenContext } from "../AccessTokenContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

function Doctordashboard1() {
  const { accessToken, doctorId } = useContext(AccessTokenContext);
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [patientFilter, setPatientFilter] = useState("");
  const [error, setError] = useState(null);
  const [patientFilterBy, setPatientFilterBy] = useState("name");
  const loc = useLocation();
  const { usernameResponse } = loc.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      // Handle missing access token, e.g., redirect to login
      console.error("Access token is missing");
      return;
    }

    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `https://clinicmanagement20240427220332.azurewebsites.net/api/Doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Response", response);
        const assignedPatients = response.data.data.assignedPatients;

        const patientsArray = assignedPatients.map((patientDB) => ({
          id: patientDB.id,
          name: patientDB.fullName,
          age: patientDB.age,
          email: patientDB.email,
          phone: patientDB.phoneNumber,
          username: patientDB.userName,
          gender: patientDB.gender,
        }));

        setPatients(patientsArray);
      } catch (error) {
        console.error("Error:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, [accessToken, doctorId]);

  const handlePatientFilterChange = (event) => {
    setPatientFilter(event.target.value);
  };

  const handlePatientFilterByChange = (event) => {
    setPatientFilterBy(event.target.value);
  };

  const handleViewClick = (patientID) => {
    console.log("Navigating to patient visits with patient ID:", patientID);
    console.log("Passing usernameResponse:", usernameResponse);
    navigate(`/patientVisits/${patientID}`, { state: { usernameResponse } });
  };

  const filteredPatients = patients.filter((patient) => {
    if (patientFilterBy === "name") {
      return patient.name.toLowerCase().includes(patientFilter.toLowerCase());
    } else if (patientFilterBy === "email") {
      return patient.email.toLowerCase().includes(patientFilter.toLowerCase());
    } else if (patientFilterBy === "phone") {
      return patient.phone.toLowerCase().includes(patientFilter.toLowerCase());
    } else if (patientFilterBy === "username") {
      return patient.username
        .toLowerCase()
        .includes(patientFilter.toLowerCase());
    } else if (patientFilterBy === "age") {
      return patient.age.toString().includes(patientFilter);
    } else if (patientFilterBy === "gender") {
      return patient.gender.toLowerCase() === patientFilter.toLowerCase();
    }
    return false;
  });

  const toggleDetails = (item) => {
    item.showDetails = !item.showDetails;
    setPatients([...patients]);
  };

  if (isLoading) {
    return <div>Loading patients...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="doctor-dashboard">
      <Layout>
        <Header2 username={usernameResponse} />
      </Layout>
      <div className="content">
        <div className="column">
          <div className="section">
            <div className="title-container">
              <h2>Patients</h2>
            </div>

            <div className="filter-container">
              <div className="filter-left-container">
                <span style={{ marginRight: "10px" }}>Filter by </span>
                <select
                  value={patientFilterBy}
                  onChange={handlePatientFilterByChange}
                  className="filter-select"
                >
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="username">Username</option>
                  <option value="age">Age</option>
                  <option value="gender">Gender</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Filter..."
                value={patientFilter}
                onChange={handlePatientFilterChange}
                className="filter-input"
              />
            </div>

            <ul className="patient-list">
              {filteredPatients.map((patient) => (
                <li key={patient.id}>
                  <div className="item">
                    <div className="row">
                      <FontAwesomeIcon
                        icon={patient.showDetails ? faAngleUp : faAngleDown}
                        className="toggle-icon"
                        onClick={() => toggleDetails(patient)}
                      />
                      <span>{patient.name}</span>
                      <div className="actions">
                        <button
                          className="view-button"
                          onClick={() => handleViewClick(patient.id)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                    {patient.showDetails && (
                      <div className="details">
                        <p>Email: {patient.email}</p>
                        <p>Phone: {patient.phone}</p>
                        <p>Username: {patient.username}</p>
                        <p>Age: {patient.age}</p>
                        <p>Gender: {patient.gender}</p>
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

export default Doctordashboard1;
