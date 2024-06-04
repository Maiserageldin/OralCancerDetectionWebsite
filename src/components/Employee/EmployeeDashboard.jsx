// import React, { useState } from 'react';
import React, { useState, useEffect, useContext } from 'react';
// import React, { useContext, useState } from "react";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AccessTokenContext } from "../AccessTokenContext.jsx";
import "./styles/employeeHome.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faAngleDown, faAngleUp, faPlus, faCalendarCheck, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

import AddDoctor from './AddDoctor';
import AddPatient from './AddPatient';
import EditDoctor from './EditDoctor';
import EditPatient from './EditPatient';
import AddVisit from './AddVisit';
import RegisterEmployee from './RegisterEmployee.jsx';
import ViewVisitsModal from './ViewVisitsModal';

function EmployeeDashboard() {

    const { accessToken } = useContext(AccessTokenContext);
    console.log("Main Access Token: ", accessToken);

    const [showAddEmployeeForm, setShowAddEmployeeForm] = useState(false);
    const [showAddDoctorForm, setShowAddDoctorForm] = useState(false);
    const [showAddPatientForm, setShowAddPatientForm] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [editingPatient, setEditingPatient] = useState(null);
    const [showAddVisitForm, setShowAddVisitForm] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [selectedPatientName, setSelectedPatientName] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    // const [showVisitModal, setShowVisitModal] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [showViewVisitsModal, setShowViewVisitsModal] = useState(false);
    const [visits, setVisits] = useState([]);

    const [employees, setEmployees] = useState([
        { id: 1, name: 'Emp 1', email: 'emp@example.com', phone: '567-890-1234', username: 'emp', password: "", age: 25, gender: 'Male', showDetails: false, visits: [] },
        { id: 2, name: 'Emp 2', email: 'emp@example.com', phone: '678-901-2345', username: 'emp', password: "", age: 30, gender: 'Female', showDetails: false, visits: [] },
        { id: 3, name: 'Emp 3', email: 'emp@example.com', phone: '789-012-3456', username: 'emp', password: "", age: 35, gender: 'Male', showDetails: false, visits: [] },
        { id: 4, name: 'Emp 4', email: 'emp@example.com', phone: '890-123-4567', username: 'emp', password: "", age: 40, gender: 'Female', showDetails: false, visits: [] }
    ]);
   

    // const [doctors, setDoctors] = useState([
    //     { id: 1, name: 'Doctor 1', email: 'doctor1@example.com', phone: '123-456-7890', username: 'doctor1', password: "", age: 35, gender: 'Male', specialty: 'Cardiology', showDetails: false },
    //     { id: 2, name: 'Doctor 2', email: 'doctor2@example.com', phone: '234-567-8901', username: 'doctor2', password: "", age: 40, gender: 'Female', specialty: 'Pediatrics', showDetails: false },
    //     { id: 3, name: 'Doctor 3', email: 'doctor3@example.com', phone: '345-678-9012', username: 'doctor3', password: "", age: 45, gender: 'Male', specialty: 'Orthopedics', showDetails: false },
    //     { id: 4, name: 'Doctor 4', email: 'doctor4@example.com', phone: '456-789-0123', username: 'doctor4', password: "", age: 50, gender: 'Female', specialty: 'Dermatology', showDetails: false },
    //     { id: 5, name: 'Doctor 5', email: 'doctor3@example.com', phone: '345-678-9012', username: 'doctor5', password: "", age: 45, gender: 'Male', specialty: 'Orthopedics', showDetails: false },
    //     { id: 6, name: 'Doctor 6', email: 'doctor3@example.com', phone: '345-678-9012', username: 'doctor6', password: "", age: 45, gender: 'Male', specialty: 'Orthopedics', showDetails: false },
    //     { id: 7, name: 'Doctor 7', email: 'doctor3@example.com', phone: '345-678-9012', username: 'doctor7', password: "", age: 45, gender: 'Male', specialty: 'Orthopedics', showDetails: false }
    // ]);

    // const [patients, setPatients] = useState([
    //     { id: 1, name: 'Patient 1', email: 'patient1@example.com', phone: '567-890-1234', username: 'patient1', password: "", age: 25, gender: 'Male', showDetails: false, visits: [] },
    //     { id: 2, name: 'Patient 2', email: 'patient2@example.com', phone: '678-901-2345', username: 'patient2', password: "", age: 30, gender: 'Female', showDetails: false, visits: [] },
    //     { id: 3, name: 'Patient 3', email: 'patient3@example.com', phone: '789-012-3456', username: 'patient3', password: "", age: 35, gender: 'Male', showDetails: false, visits: [] },
    //     { id: 4, name: 'Patient 4', email: 'patient4@example.com', phone: '890-123-4567', username: 'patient4', password: "", age: 40, gender: 'Female', showDetails: false, visits: [] }
    // ]);



    // Fetch doctors data from API
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(
                    "https://clinicmanagement20240427220332.azurewebsites.net/api/Doctor",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const data = response.data.data;

                // Create an array to store doctor data
                const doctorsArray = data.map(doctorDB => {
                    
                    let gender;
    
                    switch (doctorDB.gender) {
                        case 0:
                            gender = 'Female';
                            break;
                        case 1:
                            gender = 'Male';
                            break;
                        default:
                            gender = 'Other';
                            break;
                    }


    
                    
                    return {
                        id: doctorDB.id,
                        name: doctorDB.fullName,
                        email: doctorDB.email,
                        phone: doctorDB.phoneNumber,
                        age: doctorDB.age,
                        gender: gender,
                        username: doctorDB.username,
                        specialty: doctorDB.speciality,
                        AssignedPatients: doctorDB.assignedPatients,
                        NumberofPatients: doctorDB.numberOfPatients,
                        showDetails: false,
                    };
                });

                // Set the state variable with the fetched data
                setDoctors(doctorsArray);
                console.log("All Doctors: ", doctorsArray);

            } catch (error) {
                console.error("Error:", error);
            }
        };



        const fetchPatients = async () => {
            try {
                const response = await axios.get(
                    "https://clinicmanagement20240427220332.azurewebsites.net/api/Patient",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                const data = response.data.data;

                // Create an array to store doctor data
                const patientsArray = data.map(patientDB => {

                    let gender;
    
                    switch (patientDB.gender) {
                        case 0:
                            gender = 'Female';
                            break;
                        case 1:
                            gender = 'Male';
                            break;
                        default:
                            gender = 'Other';
                            break;
                    }

                    return {

                        id: patientDB.id,
                        name: patientDB.fullName,
                        email: patientDB.email,
                        age: patientDB.age,
                        gender: gender,
                        username: patientDB.username,
                        phone: patientDB.phoneNumber,
                        assignedDoctorName: patientDB.doctorName,
                        assignedDoctorId: patientDB.doctorId,
                        showDetails: false
                    };
                });

                // Set the state variable with the fetched data
                setPatients(patientsArray);
                console.log("All Patients: ", patientsArray);

            } catch (error) {
                console.error("Error:", error);
            }
        };

        
        fetchDoctors();
        fetchPatients();
    }, [accessToken]);



    const toggleAddVisitForm = (patientId, patientGender, patientAge) => {
        setShowAddVisitForm(!showAddVisitForm);
        setSelectedPatientId(patientId);
        setSelectedPatient([patientId, patientGender, patientAge])
    };


    const toggleAddEmployeeForm = () => {
        setShowAddEmployeeForm(!showAddEmployeeForm);
    };


    const toggleAddDoctorForm = () => {
        setShowAddDoctorForm(!showAddDoctorForm);
    };

    const toggleAddPatientForm = () => {
        setShowAddPatientForm(!showAddPatientForm);
    };



    const addEmployee = (newEmployee) => {
        setEmployees([...employees, newEmployee]);
        setShowAddEmployeeForm(false);
    };


    const addDoctor = (newDoctor) => {
        setDoctors([...doctors, newDoctor]);
        setShowAddDoctorForm(false);
    };

    const handleEditDoctor = (id) => {
        // Find the doctor with the given id
        const doctorToEdit = doctors.find(doctor => doctor.id === id);
        setEditingDoctor(doctorToEdit);
    };

    const saveEditedDoctor = (editedDoctor) => {
        // Find the index of the edited doctor in the doctors array
        const index = doctors.findIndex(doctor => doctor.id === editedDoctor.id);
        // Create a new array with the edited doctor
        const updatedDoctors = [...doctors];
        updatedDoctors[index] = editedDoctor;
        setDoctors(updatedDoctors);
        setEditingDoctor(null); // Clear the editing state after saving
    };


    const addPatient = (newPatient) => {
        setPatients([...patients, newPatient]);
        setShowAddPatientForm(false);
    };

    const handleEditPatient = (id) => {
        // Find the patient with the given id
        const patientToEdit = patients.find(patient => patient.id === id);
        setEditingPatient(patientToEdit);
    };

    const saveEditedPatient = (editedPatient) => {
        // Find the index of the edited patient in the patients array
        const index = patients.findIndex(patient => patient.id === editedPatient.id);
        // Create a new array with the edited patient
        const updatedPatients = [...patients];
        updatedPatients[index] = editedPatient;
        setPatients(updatedPatients);
        setEditingPatient(null); // Clear the editing state after saving
    };



    const handleViewVisits = async (patientId, patientName) => {
        setShowViewVisitsModal(true);
        setSelectedPatientName(patientName);
    
        try {
            const response = await axios.get(
                `https://clinicmanagement20240427220332.azurewebsites.net/api/Visits/GetPatientVisits/${patientId}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const data = response.data.data;
    
            // Create an array to store doctor data
            const visitsArray = data.map(visitsDB => {
                let specialityName;
                let ageGroup;
                let gender;
                let diagnosis;
                let localization;
                let tobaccoUse;
                let alcoholConsumption;
                switch (visitsDB.speciality) {
                    case 0:
                        specialityName = 'Oral and Maxillofacial Surgeon';
                        break;
                    case 1:
                        specialityName = 'Prosthodontist';
                        break;
                    case 2:
                        specialityName = 'Oral Pathologist';
                        break;
                    default:
                        specialityName = 'Oral Medcine Specialist';
                        break;
                }

                switch (visitsDB.patientData.ageGroup) {
                    case 0:
                        ageGroup = 'From 0 to 40';
                        break;
                    case 1:
                        ageGroup = 'From 41 to 60';
                        break;
                    default:
                        ageGroup = 'Above 61';
                        break;
                }

                switch (visitsDB.patientData.gender) {
                    case 0:
                        gender = 'Female';
                        break;
                    case 1:
                        gender = 'Male';
                        break;
                    default:
                        gender = 'Other';
                        break;
                }

                switch (visitsDB.patientData.aiDiagnosis) {
                    case 0:
                        diagnosis = 'Leukoplakia without dysplasia';
                        break;
                    case 1:
                        diagnosis = 'Leukoplakia with dysplasia';
                        break;
                    default:
                        diagnosis = 'OSCC';
                        break;
                }

                switch (visitsDB.patientData.localization) {
                    case 0:
                        localization = 'Gingiva';
                        break;
                    case 1:
                        localization = 'Palate';
                        break;
                    case 2:
                        localization = 'Buccal Mucosa';
                        break;
                    case 3:
                        localization = 'Floor of Mouth';
                        break;
                    case 4:
                        localization = 'Lip';
                        break;
                    default:
                        localization = 'Tongue';
                        break;
                }

                switch (visitsDB.patientData.tobaccoUse) {
                    case 0:
                        tobaccoUse = 'Not Informed';
                        break;
                    case 1:
                        tobaccoUse = 'Former';
                        break;
                    case 2:
                        tobaccoUse = 'No';
                        break;
                    default:
                        tobaccoUse = 'Yes';
                        break;
                }

                switch (visitsDB.patientData.alcoholConsumption) {
                    case 0:
                        alcoholConsumption = 'Not Informed';
                        break;
                    case 1:
                        alcoholConsumption = 'Former';
                        break;
                    case 2:
                        alcoholConsumption = 'No';
                        break;
                    default:
                        alcoholConsumption = 'Yes';
                        break;
                }
    
                return {
                    id: visitsDB.id,
                    visitNumber: visitsDB.visitNumber,
                    date: visitsDB.date,
                    patientName: patientName,
                    ageGroup: ageGroup,
                    gender: gender,
                    diagnosis: diagnosis,
                    localization: localization,
                    tobaccoUse: tobaccoUse,
                    alcoholConsumption: alcoholConsumption,
                    stainingImagePath: visitsDB.patientData.stainingImagePath,
                    microscopicImagePath: visitsDB.patientData.microscopicImagePath,
                    doctorName: visitsDB.doctorName,
                    speciality: specialityName,
                };
            });
    
            // Set the state variable with the fetched data
            setVisits(visitsArray);
            console.log("All Visits for patient", patientId, "are:", visitsArray);
    
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

      
      const handleCloseViewVisitsModal = () => {
        setShowViewVisitsModal(false);
      };
    

    const [doctorFilter, setDoctorFilter] = useState('');
    const [patientFilter, setPatientFilter] = useState('');
    const [doctorFilterBy, setDoctorFilterBy] = useState('name');
    const [patientFilterBy, setPatientFilterBy] = useState('name');

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

    const filteredDoctors = doctors.filter(doctor => {
        if (doctorFilterBy === 'name') {
            return doctor.name.toLowerCase().includes(doctorFilter.toLowerCase());
        } else if (doctorFilterBy === 'email') {
            return doctor.email.toLowerCase().includes(doctorFilter.toLowerCase());
        } else if (doctorFilterBy === 'phone') {
            return doctor.phone.toLowerCase().includes(doctorFilter.toLowerCase());
        } else if (doctorFilterBy === 'username') {
            return doctor.username.toLowerCase().includes(doctorFilter.toLowerCase());
        } else if (doctorFilterBy === 'age') {
            return doctor.age.toString().includes(doctorFilter);
        } else if (doctorFilterBy === 'gender') {
            return doctor.gender.toLowerCase() === doctorFilter.toLowerCase();
        } else if (doctorFilterBy === 'specialty') {
            return doctor.specialty.toLowerCase().includes(doctorFilter.toLowerCase());
        }
    });
    
    const filteredPatients = patients.filter(patient => {
        if (patientFilterBy === 'name') {
            return patient.name.toLowerCase().includes(patientFilter.toLowerCase());
        } else if (patientFilterBy === 'email') {
            return patient.email.toLowerCase().includes(patientFilter.toLowerCase());
        } else if (patientFilterBy === 'phone') {
            return patient.phone.toLowerCase().includes(patientFilter.toLowerCase());
        } else if (patientFilterBy === 'username') {
            return patient.username.toLowerCase().includes(patientFilter.toLowerCase());
        } else if (patientFilterBy === 'age') {
            return patient.age.toString().includes(patientFilter);
        } else if (patientFilterBy === 'gender') {
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

    const handleDeleteDoctor = async (id, name) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
        if (confirmDelete) {
            const updatedDoctors = doctors.filter(doctor => doctor.id !== id);
            setDoctors(updatedDoctors);

            try {
                
                const response = await axios.delete(
                    `https://clinicmanagement20240427220332.azurewebsites.net/api/Doctor/Delete/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
            
                console.log("Doctor Deleted Successfully!");
                // Optionally, you can handle response data if needed
                console.log("Response Data:", response.data);
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error("Patient Deletion Error:", error.response.data);
                    console.error("Status:", error.response.status);
                    console.error("Validation Errors:", error.response.data.errors);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("Network Error:", error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error("Error:", error.message);
                }
            }
            
      



            
        }
    };
    
    const handleDeletePatient = async (id, name) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
        if (confirmDelete) {
            const updatedPatients = patients.filter(patient => patient.id !== id);
            setPatients(updatedPatients);


            try {
                
                const response = await axios.delete(
                    `https://clinicmanagement20240427220332.azurewebsites.net/api/Patient/Delete/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
            
                console.log("Patient Deleted Successfully!");
                // Optionally, you can handle response data if needed
                console.log("Response Data:", response.data);
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error("Patient Deletion Error:", error.response.data);
                    console.error("Status:", error.response.status);
                    console.error("Validation Errors:", error.response.data.errors);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("Network Error:", error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error("Error:", error.message);
                }
            }



        }
    };

    // const handleNewVisit = (patientId, newVisit) => {
    //     const updatedPatients = patients.map(patient => {
    //         if (patient.id === patientId) {
    //             return {
    //                 ...patient,
    //                 visits: [...patient.visits, newVisit]
    //             };
    //         }
    //         return patient;
    //     });
    //     setPatients(updatedPatients);
    // };
    
      
    
    // const viewVisits = (patientId) => {
    //     setSelectedPatientId(patientId);
    //     setShowVisitModal(true);
    // };
    
      


    

    return (
        <div>
            <div className="register-button-container">
                <button className="register-button" onClick={toggleAddEmployeeForm}>Register an Employee</button>
            </div>
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
                                <span style={{ marginRight: '10px' }}>Filter by  </span>
                                <select value={doctorFilterBy} onChange={handleDoctorFilterByChange} className="filter-select">
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
                                {filteredDoctors.map(doctor => (
                                    <li key={doctor.id}>
                                        <div className="item">
                                            <FontAwesomeIcon style={{ marginRight: '20px' }} icon={doctor.showDetails ? faAngleUp : faAngleDown} className="toggle-icon" onClick={() => toggleDetails(doctor)} />
                                            <span>{doctor.name}</span>
                                            <div className="actions">
                                                <FontAwesomeIcon style={{ marginRight: '30px' }} icon={faEdit} className="edit-icon" onClick={() => handleEditDoctor(doctor.id)} />
                                                <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" onClick={() => handleDeleteDoctor(doctor.id, doctor.name)} />
                                            </div>
                                            {doctor.showDetails && (
                                                <div className="details">
                                                    <p>ID: {doctor.id}</p>
                                                    <p>Email: {doctor.email}</p>
                                                    <p>Phone: {doctor.phone}</p>
                                                    <p>Username: {doctor.username}</p>
                                                    <p>Age: {doctor.age}</p>
                                                    <p>Gender: {doctor.gender}</p>
                                                    <p>Specialty: {doctor.specialty}</p>
                                                    <p>Number of Patients: {doctor.NumberofPatients}</p>
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
                            <span style={{ marginRight: '10px' }} >Filter by  </span>
                            <select value={patientFilterBy} onChange={handlePatientFilterByChange} className="filter-select">
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
                                {filteredPatients.map(patient => (
                                    <li key={patient.id}>
                                        <div className="item">
                                            <FontAwesomeIcon style={{ marginRight: '20px' }} icon={patient.showDetails ? faAngleUp : faAngleDown} className="toggle-icon" onClick={() => toggleDetails(patient)} />
                                            <span>{patient.name}</span>
                                            <div className="actions">
                                                {/* <FontAwesomeIcon style={{ marginRight: '70px' }} icon={faCalendarCheck} className="visit-icon" onClick={viewVisits} /> */}
                                                <FontAwesomeIcon style={{ marginRight: '70px' }} icon={faCalendarPlus} className="visit-icon" onClick={() => toggleAddVisitForm(patient.id, patient.gender, patient.age)} />
                                                <FontAwesomeIcon style={{ marginRight: '30px' }} icon={faEdit} className="edit-icon" onClick={() => handleEditPatient(patient.id)} />
                                                <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" onClick={() => handleDeletePatient(patient.id, patient.name)} />
                                            </div>
                                            {patient.showDetails && (
                                                <div className="details">
                                                    <p>ID: {patient.id}</p>
                                                    <p>Email: {patient.email}</p>
                                                    <p>Phone: {patient.phone}</p>
                                                    <p>Username: {patient.username}</p>
                                                    <p>Age: {patient.age}</p>
                                                    <p>Gender: {patient.gender}</p>
                                                    {patient.assignedDoctorName !== null && <p>Assigned to Dr.{patient.assignedDoctorName}</p>}
                                                    
                                                    <button className="view-visits-btn" onClick={() => handleViewVisits(patient.id, patient.name)}>View Visits</button>
                                                    {/* <button className="view-visits-btn" onClick={() => viewVisits(patient.id)}>View Visits</button> */}
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
            
            


            <RegisterEmployee handleClose={toggleAddEmployeeForm} show={showAddEmployeeForm} addEmployee={addEmployee} />
            

            <AddDoctor handleClose={toggleAddDoctorForm} show={showAddDoctorForm} addDoctor={addDoctor} />
            
            {/* Render EditDoctor component if editingDoctor state is not null */}
            {editingDoctor && (
                <EditDoctor handleClose={() => setEditingDoctor(null)} show={true} doctor={editingDoctor} saveDoctor={saveEditedDoctor} />
            )}
            
            <AddPatient handleClose={toggleAddPatientForm} show={showAddPatientForm} addPatient={addPatient} />

            {/* Render EditPatient component if editingPatient state is not null */}
            {editingPatient && (
                <EditPatient handleClose={() => setEditingPatient(null)} show={true} patient={editingPatient} savePatient={saveEditedPatient} />
            )}


            {/* AddVisit modal */}
            <AddVisit handleClose={toggleAddVisitForm} show={showAddVisitForm} selectedPatientId={selectedPatientId} selectedPatient={selectedPatient}/>

            <ViewVisitsModal handleClose={handleCloseViewVisitsModal} show={showViewVisitsModal} visits={visits} selectedPatientName={selectedPatientName}/>


        </div>
    )
}
export default EmployeeDashboard;
