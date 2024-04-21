import React, { useState } from 'react';
import "./styles/employeeHome.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faAngleDown, faAngleUp, faPlus } from '@fortawesome/free-solid-svg-icons';

function EmployeeDashboard() {
    const addNewDoctor = () => {
        // Implementation of addNewDoctor function
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
        { id: 1, name: 'Doctor 1', email: 'doctor1@example.com', age: 35, showDetails: false },
        { id: 2, name: 'Doctor 2', email: 'doctor2@example.com', age: 40, showDetails: false },
        { id: 3, name: 'Doctor 3', email: 'doctor3@example.com', age: 45, showDetails: false },
        { id: 4, name: 'Doctor 4', email: 'doctor4@example.com', age: 50, showDetails: false }
    ]);

    const [patients, setPatients] = useState([
        { id: 1, name: 'Patient 1', email: 'patient1@example.com', age: 25, showDetails: false },
        { id: 2, name: 'Patient 2', email: 'patient2@example.com', age: 30, showDetails: false },
        { id: 3, name: 'Patient 3', email: 'patient3@example.com', age: 35, showDetails: false },
        { id: 4, name: 'Patient 4', email: 'patient4@example.com', age: 40, showDetails: false }
    ]);

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
        } else if (doctorFilterBy === 'age') {
            return doctor.age.toString().includes(doctorFilter);
        }
    });

    const filteredPatients = patients.filter(patient => {
        if (patientFilterBy === 'name') {
            return patient.name.toLowerCase().includes(patientFilter.toLowerCase());
        } else if (patientFilterBy === 'email') {
            return patient.email.toLowerCase().includes(patientFilter.toLowerCase());
        } else if (patientFilterBy === 'age') {
            return patient.age.toString().includes(patientFilter);
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
        const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
        if (confirmDelete) {
            const updatedDoctors = doctors.filter(doctor => doctor.id !== id);
            setDoctors(updatedDoctors);
        }
    };
    
    const handleDeletePatient = (id, name) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
        if (confirmDelete) {
            const updatedPatients = patients.filter(patient => patient.id !== id);
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
        <div>
            <div className="content">
                <div className="column">
                    <div className="section">
                        <div className="title-container">
                            <h2>Doctors</h2>
                            <div className="add-btn" onClick={addNewDoctor}>
                                <FontAwesomeIcon icon={faPlus} className="add-icon" />
                            </div>
                        </div>
                        <div className="filter-container">
                            <div className="filter-left-container">
                                <span style={{ marginRight: '10px' }}>Filter by  </span>
                                <select value={doctorFilterBy} onChange={handleDoctorFilterByChange} className="filter-select">
                                    <option value="name">Name</option>
                                    <option value="email">Email</option>
                                    <option value="age">Age</option>
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
                                                <p>Email: {doctor.email}</p>
                                                <p>Age: {doctor.age}</p>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="column">
                    <div className="section">
                        <div className="title-container">
                            <h2>Patients</h2>
                            <div className="add-btn" onClick={addNewPatient}>
                                <FontAwesomeIcon icon={faPlus} className="add-icon" />
                            </div>
                        </div>
                    
                        <div className="filter-container">
                        <div className="filter-left-container">
                            <span style={{ marginRight: '10px' }} >Filter by  </span>
                            <select value={patientFilterBy} onChange={handlePatientFilterByChange} className="filter-select">
                                    <option value="name">Name</option>
                                    <option value="email">Email</option>
                                    <option value="age">Age</option>
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
                            {filteredPatients.map(patient => (
                                <li key={patient.id}>
                                    <div className="item">
                                        <FontAwesomeIcon style={{ marginRight: '20px' }} icon={patient.showDetails ? faAngleUp : faAngleDown} className="toggle-icon" onClick={() => toggleDetails(patient)} />
                                        <span>{patient.name}</span>
                                        <div className="actions">
                                            <FontAwesomeIcon style={{ marginRight: '30px' }} icon={faEdit} className="edit-icon" onClick={() => handleEditPatient(patient.id)} />
                                            <FontAwesomeIcon icon={faTrashAlt} className="delete-icon" onClick={() => handleDeletePatient(patient.id, patient.name)} />
                                        </div>
                                        {patient.showDetails && (
                                            <div className="details">
                                                <p>Email: {patient.email}</p>
                                                <p>Age: {patient.age}</p>
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
    )
}

export default EmployeeDashboard;
