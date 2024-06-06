import React, { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Footer from "../Footer";
import Header2 from "../Header2";
import Layout from "../Layout";
import "./styles/DoctorViewPatients.css";
import { AccessTokenContext } from "../AccessTokenContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faAngleDown,
  faAngleUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function Doctordashboard1() {
  // const [patients, setPatients] = useState([
  //   {
  //     id: 1,
  //     name: "Patient 1",
  //     email: "patient1@example.com",
  //     phone: "567-890-1234",
  //     username: "patient1",
  //     age: 25,
  //     gender: "Male",
  //     showDetails: false,
  //   },
  //   {
  //     id: 2,
  //     name: "Patient 2",
  //     email: "patient2@example.com",
  //     phone: "678-901-2345",
  //     username: "patient2",
  //     age: 30,
  //     gender: "Female",
  //     showDetails: false,
  //   },
  //   {
  //     id: 3,
  //     name: "Patient 3",
  //     email: "patient3@example.com",
  //     phone: "789-012-3456",
  //     username: "patient3",
  //     age: 35,
  //     gender: "Male",
  //     showDetails: false,
  //   },
  //   {
  //     id: 4,
  //     name: "Patient 4",
  //     email: "patient4@example.com",
  //     phone: "890-123-4567",
  //     username: "patient4",
  //     age: 40,
  //     gender: "Female",
  //     showDetails: false,
  //   },
  // ]);

  //const { accessToken } = useContext(AccessTokenContext);
  const { accessToken, doctorId } = useContext(AccessTokenContext);
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [patientFilter, setPatientFilter] = useState("");
  const [error, setError] = useState(null);
  const [patientFilterBy, setPatientFilterBy] = useState("name");
  const loc = useLocation();
  const { usernameResponse } = loc.state || {};

  const handlePatientFilterChange = (event) => {
    setPatientFilter(event.target.value);
  };

  const handlePatientFilterByChange = (event) => {
    setPatientFilterBy(event.target.value);
  };

  // Fetch doctors data from API
  useEffect(() => {
    // console.log("access token", accessToken);
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

        console.log("response", response);

        const assignedPatients = response.data.data.assignedPatients;

        console.log("Assigned patients:", assignedPatients);

        // Create an array to store patient data
        const patientsArray = assignedPatients.map((patientDB) => {
          return {
            name: patientDB.fullName,
            age: patientDB.age,
          };
        });

        setPatients(patientsArray);

        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    // const fetchPatientsData = async () => {
    //   try {
    //     const response = await axios.get(
    //       `https://clinicmanagement20240427220332.azurewebsites.net/api/Patient/18}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //       }
    //     );

    //     console.log("patient data response", response);

    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error("Error:", error);
    //     setIsLoading(false);
    //   }
    // };

    fetchPatients();
    // fetchPatientsData();
  }, [accessToken]);

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
  });

  const toggleDetails = (item) => {
    item.showDetails = !item.showDetails;
    if (item.showDetails) {
      setPatients([...patients]);
    } else {
      setPatients([...patients]);
    }
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
                        <button className="view-button">view</button>
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
      <Layout>
        <Footer />
      </Layout>
    </div>
  );
}

export default Doctordashboard1;
