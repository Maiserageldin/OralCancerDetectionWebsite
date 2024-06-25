import axios from "axios";
import { AccessTokenContext } from "../AccessTokenContext.jsx";
import React, { useState, useEffect, useContext } from 'react';

const DetailedVisitModal = ({ handleClose, show, visit }) => {
  const { accessToken } = useContext(AccessTokenContext);
  const [doctors, setDoctors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [assignedD, setAssignedD] = useState(`${visit.doctorName} - ${visit.speciality}`);

  

  const [visitInfo, setVisitInfo] = useState({
    localization: visit.localization,
    diagnosis: visit.diagnosis,
    tobaccoUse: visit.tobaccoUse,
    alcoholConsumption: visit.alcoholConsumption,
    stainingImagePath: visit.stainingImagePath,
    microscopicImagePath: visit.microscopicImagePath,
    doctorComment: visit.doctorComment,
    doctorName: visit.doctorName,
    speciality: visit.speciality,
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
        const doctorsArray = data.map((doctorDB) => ({
          id: doctorDB.id,
          name: doctorDB.fullName_Speciality,
        }));


        // Set the state variable with the fetched data
        setDoctors(doctorsArray);


        // Use a for loop to find the doctor whose name matches the normalized assignedD
        const normalizedAssignedD = assignedD.replace(/_/g, ' ');
        let getAssignedDoctorId = 0; // Default to 0 if no match is found
        for (let i = 0; i < doctorsArray.length; i++) {
          // Normalize the doctor's name by replacing underscores with spaces and removing "and"
          const normalizedDoctorName = doctorsArray[i].name.replace(/_/g, ' ');

          // Remove "and" from both normalized strings
          const normalizedAssignedDWithoutAnd = normalizedAssignedD.replace(/\band\b/gi, '').replace(/\s+/g, ' ').trim();
          const normalizedDoctorNameWithoutAnd = normalizedDoctorName.replace(/\band\b/gi, '').replace(/\s+/g, ' ').trim();

          if (normalizedDoctorNameWithoutAnd === normalizedAssignedDWithoutAnd) {
            getAssignedDoctorId = doctorsArray[i].id;
            visitInfo.assignedDoctorId = getAssignedDoctorId;
            break; // Exit the loop once a match is found
          }
        }



        console.log("Doctor's dropdown: ", doctorsArray);
        
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDoctors();
  }, [accessToken, assignedD]);

  const handleInputChange = (event) => {

    if (!isEditing) return; // Only update inputs when editing

    const { name, value } = event.target;

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

    setVisitInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!visitInfo.microscopicImagePath || !visitInfo.stainingImagePath) {
      alert("Please enter the images url");
    } else if (visitInfo.assignedDoctorId === 0) {
      alert("Please assign a doctor to this patient.");
    } else {
      try {
        // console.log("Access Token is: ", accessToken);

        let genderPUT;
        const patientGen = visitInfo.gender;
        if (patientGen === 'Female') {
          genderPUT = 0;
        } else if (patientGen === 'Male') {
          genderPUT = 1;
        } else {
          genderPUT = 2;
        }

        let localiz;
        const patientLoc = visitInfo.localization;
        if (patientLoc === 'Gingiva') {
            localiz = 0;
        } else if (patientLoc === 'Palate') {
            localiz = 1;
        } else if (patientLoc === 'Buccal Mucosa'){
            localiz = 2;
        } else if (patientLoc === 'Floor of Mouth') {
            localiz = 3;
        } else if (patientLoc === 'Lip') {
            localiz = 4;
        } else {
            localiz = 5;
        }
        let diagPUT;
        const diagGen = visitInfo.diagnosis;
        if (diagGen === 'Leukoplakia without dysplasia') {
            diagPUT = 0;
        } else if (diagGen === 'Leukoplakia with dysplasia') {
            diagPUT = 1;
        } else {
            diagPUT = 2;
        }
        let tobPUT;
        const tobUse = visitInfo.tobaccoUse;
        if (tobUse === 'Not Informed') {
            tobPUT = 0;
        } else if (tobUse === 'Former') {
            tobPUT = 1;
        } else if (tobUse === 'No') {
            tobPUT = 2;
        } else {
            tobPUT = 3;
        }
        let alcoPUT;
        const alcoCons = visitInfo.alcoholConsumption;
        if (alcoCons === 'Not Informed') {
            alcoPUT = 0;
        } else if (alcoCons === 'Former') {
            alcoPUT = 1;
        } else if (alcoCons === 'No') {
            alcoPUT = 2;
        } else {
            alcoPUT = 3;
        }
        
        let ageGp;
        const age = visitInfo.ageGroup;
        if (age === 'From 0 to 40') {
        ageGp = 0;
        } else if (age === 'From 41 to 60') {
        ageGp = 1;
        } else if (age === 'Above 61') {
        ageGp = 2;
        } 

        
        const response = await axios.put(
          `https://clinicmanagement20240427220332.azurewebsites.net/api/Visits/EditVisit/${visit.id}`,
          {
            date: new Date().toISOString(),
            // patientId: visit.patientId,
            doctorId: visitInfo.assignedDoctorId,
            patientData: {
              gender: genderPUT,
              localization: localiz,
              tobaccoUse: tobPUT,
              alcoholConsumption: alcoPUT,
              ageGroup: ageGp,
              aiDiagnosis: diagPUT,
              stainingImagePath: visitInfo.stainingImagePath,
              microscopicImagePath: visitInfo.microscopicImagePath,
              doctorComment: visitInfo.doctorComment,
              visitId: visit.id,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Visit Updated Successfully!", response.data);

        // Reload the page
        window.location.reload();

        handleClose();
      } catch (error) {
        if (error.response) {
          console.error("Visit Update Error:", error.response.data);
          console.error("Status:", error.response.status);
          console.error("Validation Errors:", error.response.data.errors);
        } else if (error.request) {
          console.error("Network Error:", error.request);
        } else {
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
                disabled={!isEditing}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              >
                <option value='Leukoplakia without dysplasia'>Leukoplakia without dysplasia</option>
                <option value='Leukoplakia with dysplasia'>Leukoplakia with dysplasia</option>
                <option value='OSCC'>OSCC</option>
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
                disabled={!isEditing}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              >
                <option value='Gingiva'>Gingiva</option>
                <option value='Palate'>Palate</option>
                <option value='Buccal Mucosa'>Buccal Mucosa</option>
                <option value='Floor of Mouth'>Floor of Mouth</option>
                <option value='Lip'>Lip</option>
                <option value='Tongue'>Tongue</option>
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
                disabled={!isEditing}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              >
                <option value='Not Informed'>Not Informed</option>
                <option value='Former'>Former</option>
                <option value='No'>No</option>
                <option value='Yes'>Yes</option>
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
                disabled={!isEditing}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              >
                <option value='Not Informed'>Not Informed</option>
                <option value='Former'>Former</option>
                <option value='No'>No</option>
                <option value='Yes'>Yes</option>
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
                disabled={!isEditing}
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
                disabled={!isEditing}
                placeholder="Enter image URL 2"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              />
              {visitInfo.microscopicImagePath && (
                <img src={visitInfo.microscopicImagePath} alt="Microscopic Image" className="mt-2 w-full" />
              )}
            </div>
            <div className="mb-4 col-span-2 text-center">
            {isEditing ? (
                <>
              <label htmlFor="assignedDoctor" className="block text-gray-700 font-bold mb-2">
                Assign this patient to:
              </label>
              <select
              id="assignedDoctor"
              name="assignedDoctorId"
              value={visitInfo.assignedDoctorId}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
            >
              <option value='0'>Select doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
            </>
               ): (
                <>
                <label htmlFor="assignedDoctor" className="block text-gray-700 font-bold mb-2">
                This patient is assigned to: 
              </label>
              <p>{visitInfo.doctorName} - {visitInfo.speciality}</p>
              </>
              )}
              
            </div>
            <div className="flex justify-end col-span-2">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 mr-4"
                    onClick={handleSubmit}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-500"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                <button
                  type="button"
                  className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 mr-4"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button
                className="bg-gray-200 text-black px-6 py-3 rounded-lg hover:bg-gray-500"
                onClick={handleClose}
              >
                Close
              </button>
              </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DetailedVisitModal;
