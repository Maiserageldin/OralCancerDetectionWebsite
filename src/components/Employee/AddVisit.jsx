// import React, { useState } from "react";
import axios from "axios";
import { AccessTokenContext } from "../AccessTokenContext.jsx";
import React, { useState, useEffect, useContext } from 'react';

const AddVisit = ({ handleClose, show, selectedPatientId, selectedPatient}) => {
  
  const { accessToken } = useContext(AccessTokenContext);
  const [doctors, setDoctors] = useState([]);

  const tobaccoUseMap = {
    'Not Informed': 0,
    'Former': 1,
    'No': 2,
    'Yes': 3,
  };

  const alcoholConsumptionMap = {
    'Not Informed': 0,
    'Former': 1,
    'No': 2,
    'Yes': 3,
  };

  const [visitInfo, setVisitInfo] = useState({
    localization: 0,
    diagnosis: '',
    tobaccoUse: '',
    alcoholConsumption: '',
    stainingImagePath: '',
    microscopicImagePath: '',
    doctorComment: '',
    assignedDoctorId: 0,
    
  });

  useEffect(() => {
    const fetchDoctors = async () => {
        try {
            const response = await axios.get(
                "https://clinicmanagement20240427220332.azurewebsites.net/api/Doctor/DoctorDropDown",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const data = response.data.data;

            // Create an array to store doctor data
            const doctorsArray = data.map(doctorDB => ({
                id: doctorDB.id,
                name: doctorDB.fullName_Speciality
            }));

            // Set the state variable with the fetched data
            setDoctors(doctorsArray);
            console.log("Doctor's dropdown: ", doctorsArray);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    
    fetchDoctors();
}, [accessToken]);




  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // setVisitInfo({ ...visitInfo, [name]: value });

    // Validate input for stainingImagePath and microscopicImagePath
    if (name === 'stainingImagePath' || name === 'microscopicImagePath') {
      // Regular expression to match URLs
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

      // Check if the input matches the URL pattern
      if (!value.match(urlRegex)) {
        alert("Please enter a valid URL.");
        return;
      }
    }


    // Parse value to integer for localization and assignedDoctorId
    const parsedValue = name === 'localization' || name === 'assignedDoctorId' || name === 'diagnosis' || name === 'tobaccoUse' || name === 'alcoholConsumption' ? parseInt(value) : value;
    setVisitInfo({ ...visitInfo, [name]: parsedValue });

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const mappedTobaccoUse = tobaccoUseMap[visitInfo.tobaccoUse];
    const mappedalcoholConsumption = alcoholConsumptionMap[visitInfo.alcoholConsumption]


    if (!visitInfo.microscopicImagePath || !visitInfo.stainingImagePath) {
      alert("Please enter the images url");
    } else if(visitInfo.assignedDoctorId === 0){
      alert("Please assign a doctor to this patient.");
    } else {
      // New visit
      try {
        console.log("Access Token is: ", accessToken);



        // Determine age group based on selectedPatient[2]
        let ageGroup;
        const patientAge = selectedPatient[2];
        if (patientAge >= 0 && patientAge <= 40) {
          ageGroup = 0;
        } else if (patientAge >= 41 && patientAge <= 60) {
          ageGroup = 1;
        } else {
          ageGroup = 2;
        }


        let genderPUT;
        const patientGen = selectedPatient[1];
        if (patientGen === 'Female') {
          genderPUT = 0;
        } else if (patientGen === 'Male') {
          genderPUT = 1;
        } else {
          genderPUT = 2;
        }

        const response = await axios.post(
          "https://clinicmanagement20240427220332.azurewebsites.net/api/Visits/CreatePatientVisit",
          {
            date: new Date().toISOString(),
            patientId: selectedPatient[0],
            doctorId: visitInfo.assignedDoctorId,
            patientData: {
              gender: genderPUT,
              localization: visitInfo.localization,
              aiDiagnosis: visitInfo.diagnosis, 
              tobaccoUse: mappedTobaccoUse,
              alcoholConsumption: mappedalcoholConsumption,
              ageGroup:ageGroup,
              stainingImagePath: visitInfo.stainingImagePath,
              microscopicImagePath: visitInfo.microscopicImagePath,
              doctorComment: visitInfo.doctorComment,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("New Visit Added Successfully!", response.data);
        // Add the new visit to the selected patient
        // handleNewVisit(selectedPatientId, newVisit);
        handleClose();
        // Reload the page after successfully adding a visit
        window.location.reload();
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Visit Add Error:", error.response.data);
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


  
  

  const showHideClass = show
    ? "modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    : "modal hidden";

  return (
    <div className={showHideClass}>
      <div className="modal-overlay fixed inset-0 flex items-center justify-center">
        <div className="modal-content bg-white rounded-lg p-8 w-full max-w-2xl overflow-y-auto max-h-full">
          <form className="grid grid-cols-2 gap-8" onSubmit={handleSubmit}>
            <div className="col-span-1">
              <label htmlFor="diagnosis" className="block text-gray-700 font-bold mb-2">
                Diagnosis
              </label>
              <select
                id="diagnosis"
                name="diagnosis"
                value={visitInfo.diagnosis}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              >
                <option value='0'>Leukoplakia without dysplasia</option>
                <option value='1'>Leukoplakia with dysplasia</option>
                <option value='2'>OSCC</option>
                        
              </select>
            </div>
            <div className="col-span-1">
              <label htmlFor="localization" className="block text-gray-700 font-bold mb-2">
                Localization
              </label>
              <select
                id="localization"
                name="localization"
                value={visitInfo.localization}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              >
                <option value='0'>Gingiva</option>
                <option value='1'>Palate</option>
                <option value='2'>Buccal Mucosa</option>
                <option value='3'>Floor of Mouth</option>
                <option value='4'>Lip</option>
                <option value='5'>Tongue</option>
              </select>
            </div>
            <div className="col-span-1">
              <label htmlFor="tobaccoUse" className="block text-gray-700 font-bold mb-2">
                Tobacco Use
              </label>
              <select
                id="tobaccoUse"
                name="tobaccoUse"
                value={visitInfo.tobaccoUse}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              >
                <option value='0'>Not Informed</option>
                <option value='1'>Former</option>
                <option value='2'>No</option>
                <option value='3'>Yes</option>
              </select>
            </div>
            <div className="col-span-1">
              <label htmlFor="alcoholConsumption" className="block text-gray-700 font-bold mb-2">
                Alcohol Consumption
              </label>
              <select
                id="alcoholConsumption"
                name="alcoholConsumption"
                value={visitInfo.alcoholConsumption}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              >
                <option value='0'>Not Informed</option>
                <option value='1'>Former</option>
                <option value='2'>No</option>
                <option value='3'>Yes</option>
                
              </select>
            </div>
            <div className="col-span-1">
              <label htmlFor="stainingImagePath" className="block text-gray-700 font-bold mb-2">
                Staining Image URL
              </label>
              <input
                id="stainingImagePath"
                type="text"
                name="stainingImagePath"
                value={visitInfo.stainingImagePath}
                onChange={handleInputChange}
                placeholder="Enter image URL 1"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              />
              {visitInfo.stainingImagePath && (
                <img src={visitInfo.stainingImagePath} alt="Staining Image" className="mt-2 w-full" />
              )}
            </div>
            <div className="col-span-1">
              <label htmlFor="microscopicImagePath" className="block text-gray-700 font-bold mb-2">
                Microscopic Image URL
              </label>
              <input
                id="microscopicImagePath"
                type="text"
                name="microscopicImagePath"
                value={visitInfo.microscopicImagePath}
                onChange={handleInputChange}
                placeholder="Enter image URL 2"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              />
              {visitInfo.microscopicImagePath && (
                <img src={visitInfo.microscopicImagePath} alt="Microscopic Image" className="mt-2 w-full" />
              )}
            </div>
            <div className="mb-4 col-span-2 text-center">
            <label htmlFor="assignedDoctor" className="block text-gray-700 font-bold mb-2">
                Assign this patient to:
              </label>
              <select
                id="assignedDoctor"
                name="assignedDoctorId"
                value={visitInfo.assignedDoctorId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              >
                <option value = '0'>Select doctor</option>
                {/* Iterate over doctors and render an option for each */}
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end col-span-2">
              <button
                type="submit"
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 mr-4"
              >
                Add Visit
              </button>
              <button
                type="button"
                className="bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-500"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVisit;
