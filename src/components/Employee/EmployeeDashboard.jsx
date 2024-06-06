import React, { useState } from "react";
import "./styles/employeeHome.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faAngleDown,
  faAngleUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import AddDoctor from "./AddDoctor";
// import AddPatient from "./AddPatient";

function EmployeeDashboard() {
  const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);

  const toggleAddDoctorForm = () => {
    setShowAddDoctorForm(!showAddDoctorForm);
  };

  const toggleAddPatientForm = () => {
    setShowAddPatientForm(!showAddPatientForm);
  };

  const addDoctor = (newDoctor) => {
    setDoctors([...doctors, newDoctor]);
    setShowAddDoctorForm(false);
  };

  const redirectToEditDoctorPage = () => {
    // Implementation of redirectToEditDoctorPage function
  };

  const addNewPatient = () => {
    // Implementation of addNewPatient function
  };

  const redirectToAddRecordPage = () => {
    // Implementation of redirectToAddRecordPage function
  };

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Doctor 1",
      email: "doctor1@example.com",
      phone: "123-456-7890",
      username: "doctor1",
      age: 35,
      gender: "Male",
      specialty: "Cardiology",
      showDetails: false,
    },
    {
      id: 2,
      name: "Doctor 2",
      email: "doctor2@example.com",
      phone: "234-567-8901",
      username: "doctor2",
      age: 40,
      gender: "Female",
      specialty: "Pediatrics",
      showDetails: false,
    },
    {
      id: 3,
      name: "Doctor 3",
      email: "doctor3@example.com",
      phone: "345-678-9012",
      username: "doctor3",
      age: 45,
      gender: "Male",
      specialty: "Orthopedics",
      showDetails: false,
    },
    {
      id: 4,
      name: "Doctor 4",
      email: "doctor4@example.com",
      phone: "456-789-0123",
      username: "doctor4",
      age: 50,
      gender: "Female",
      specialty: "Dermatology",
      showDetails: false,
    },
    {
      id: 5,
      name: "Doctor 5",
      email: "doctor3@example.com",
      phone: "345-678-9012",
      username: "doctor5",
      age: 45,
      gender: "Male",
      specialty: "Orthopedics",
      showDetails: false,
    },
    {
      id: 6,
      name: "Doctor 6",
      email: "doctor3@example.com",
      phone: "345-678-9012",
      username: "doctor6",
      age: 45,
      gender: "Male",
      specialty: "Orthopedics",
      showDetails: false,
    },
    {
      id: 7,
      name: "Doctor 7",
      email: "doctor3@example.com",
      phone: "345-678-9012",
      username: "doctor7",
      age: 45,
      gender: "Male",
      specialty: "Orthopedics",
      showDetails: false,
    },
  ]);

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Patient 1",
      email: "patient1@example.com",
      phone: "567-890-1234",
      username: "patient1",
      age: 25,
      gender: "Male",
      showDetails: false,
    },
    {
      id: 2,
      name: "Patient 2",
      email: "patient2@example.com",
      phone: "678-901-2345",
      username: "patient2",
      age: 30,
      gender: "Female",
      showDetails: false,
    },
    {
      id: 3,
      name: "Patient 3",
      email: "patient3@example.com",
      phone: "789-012-3456",
      username: "patient3",
      age: 35,
      gender: "Male",
      showDetails: false,
    },
    {
      id: 4,
      name: "Patient 4",
      email: "patient4@example.com",
      phone: "890-123-4567",
      username: "patient4",
      age: 40,
      gender: "Female",
      showDetails: false,
    },
  ]);

  const [doctorFilter, setDoctorFilter] = useState("");
  const [patientFilter, setPatientFilter] = useState("");
  const [doctorFilterBy, setDoctorFilterBy] = useState("name");
  const [patientFilterBy, setPatientFilterBy] = useState("name");

  const handleDoctorFilterChange = (event) => {
    setDoctorFilter(event.target.value);
  };

  const handlePatientFilterChange = (event) => {
    setPatientFilter(event.target.value);
  };

  const handleDoctorFilterByChange = (event) => {
    setDoctorFilterBy(event.target.value);
  };

  const handlePatientFilterByChange = (event) => {
    setPatientFilterBy(event.target.value);
  };

  const filteredDoctors = doctors.filter((doctor) => {
    if (doctorFilterBy === "name") {
      return doctor.name.toLowerCase().includes(doctorFilter.toLowerCase());
    } else if (doctorFilterBy === "email") {
      return doctor.email.toLowerCase().includes(doctorFilter.toLowerCase());
    } else if (doctorFilterBy === "phone") {
      return doctor.phone.toLowerCase().includes(doctorFilter.toLowerCase());
    } else if (doctorFilterBy === "username") {
      return doctor.username.toLowerCase().includes(doctorFilter.toLowerCase());
    } else if (doctorFilterBy === "age") {
      return doctor.age.toString().includes(doctorFilter);
    } else if (doctorFilterBy === "gender") {
      return doctor.gender.toLowerCase() === doctorFilter.toLowerCase();
    } else if (doctorFilterBy === "specialty") {
      return doctor.specialty
        .toLowerCase()
        .includes(doctorFilter.toLowerCase());
    }
  });

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
      setDoctors([...doctors]);
      setPatients([...patients]);
    } else {
      setDoctors([...doctors]);
      setPatients([...patients]);
    }
  };

  const handleDeleteDoctor = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (confirmDelete) {
      const updatedDoctors = doctors.filter((doctor) => doctor.id !== id);
      setDoctors(updatedDoctors);
    }
  };

  const handleDeletePatient = (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (confirmDelete) {
      const updatedPatients = patients.filter((patient) => patient.id !== id);
      setPatients(updatedPatients);
    }
  };

  const handleEditDoctor = (id) => {
    // Implement edit functionality for doctor
    redirectToEditDoctorPage(id);
  };

  const handleEditPatient = (id) => {
    // Implement edit functionality for patient
    // redirectToEditPatientPage(id);
  };

  return (
    <div className="employee-dashboard">
      <div className="content">
        <div className="column">
          <div className="section">
            <div className="title-container">
              <h2>Doctors</h2>
              <div className="add-btn" onClick={toggleAddDoctorForm}>
                <FontAwesomeIcon icon={faPlus} className="add-icon" />
              </div>
            </div>
            <div className="filter-container">
              <div className="filter-left-container">
                <span style={{ marginRight: "10px" }}>Filter by </span>
                <select
                  value={doctorFilterBy}
                  onChange={handleDoctorFilterByChange}
                  className="filter-select"
                >
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="username">Username</option>
                  <option value="age">Age</option>
                  <option value="gender">Gender</option>
                  <option value="specialty">Specialty</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Filter..."
                value={doctorFilter}
                onChange={handleDoctorFilterChange}
                className="filter-input"
              />
            </div>

            <div className="doctor-list-container">
              <ul className="doctor-list">
                {filteredDoctors.map((doctor) => (
                  <li key={doctor.id}>
                    <div className="item">
                      <FontAwesomeIcon
                        style={{ marginRight: "20px" }}
                        icon={doctor.showDetails ? faAngleUp : faAngleDown}
                        className="toggle-icon"
                        onClick={() => toggleDetails(doctor)}
                      />
                      <span>{doctor.name}</span>
                      <div className="actions">
                        <FontAwesomeIcon
                          style={{ marginRight: "30px" }}
                          icon={faEdit}
                          className="edit-icon"
                          onClick={() => handleEditDoctor(doctor.id)}
                        />
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="delete-icon"
                          onClick={() =>
                            handleDeleteDoctor(doctor.id, doctor.name)
                          }
                        />
                      </div>
                      {doctor.showDetails && (
                        <div className="details">
                          <p>Email: {doctor.email}</p>
                          <p>Phone: {doctor.phone}</p>
                          <p>Username: {doctor.username}</p>
                          <p>Age: {doctor.age}</p>
                          <p>Gender: {doctor.gender}</p>
                          <p>Specialty: {doctor.specialty}</p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="section">
            <div className="title-container">
              <h2>Patients</h2>
              <div className="add-btn" onClick={toggleAddPatientForm}>
                <FontAwesomeIcon icon={faPlus} className="add-icon" />
              </div>
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

            <div className="patient-list-container">
              <ul className="patient-list">
                {filteredPatients.map((patient) => (
                  <li key={patient.id}>
                    <div className="item">
                      <FontAwesomeIcon
                        style={{ marginRight: "20px" }}
                        icon={patient.showDetails ? faAngleUp : faAngleDown}
                        className="toggle-icon"
                        onClick={() => toggleDetails(patient)}
                      />
                      <span>{patient.name}</span>
                      <div className="actions">
                        <FontAwesomeIcon
                          style={{ marginRight: "30px" }}
                          icon={faEdit}
                          className="edit-icon"
                          onClick={() => handleEditPatient(patient.id)}
                        />
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="delete-icon"
                          onClick={() =>
                            handleDeletePatient(patient.id, patient.name)
                          }
                        />
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
      </div>

      <AddDoctor
        handleClose={toggleAddDoctorForm}
        show={showAddDoctorForm}
        addDoctor={addDoctor}
      />
      {/* 
      <AddPatient
        handleClose={toggleAddPatientForm}
        show={showAddPatientForm}
      /> */}
    </div>
  );
}
export default EmployeeDashboard;
