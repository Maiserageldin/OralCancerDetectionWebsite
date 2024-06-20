import React, { useState, useEffect, useContext} from "react";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AccessTokenContext } from "../AccessTokenContext.jsx";

const EditPatient = ({ handleClose, show, patient, savePatient }) => {
  const { accessToken } = useContext(AccessTokenContext);
  const [editedPatient, setEditedPatient] = useState(patient);

  useEffect(() => {
    setEditedPatient(patient);
  }, [patient]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedPatient({ ...editedPatient, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setEditedPatient({ ...editedPatient, showPassword: !editedPatient.showPassword });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    if (!editedPatient.name.match(/^[a-zA-Z\s]+$/)) {
      alert("Name field should contain only letters and spaces.");
      return;
  }

    if (!editedPatient.phone.match(/^\d{11}$/)) {
        alert("Phone number field should contain exactly 11 numbers.");
        return;
    }

    if (!editedPatient.email.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) {
        alert("Email field should contain a valid email address.");
        return;
    }

    if (
      editedPatient.name &&
      editedPatient.email &&
      editedPatient.phone &&
      editedPatient.username &&
      editedPatient.age &&
      editedPatient.gender
    ) {

      try {
        // console.log("Want to edit??????????????????? ", editedPatient.id);

        let genderPUT;
        const patientGen = editedPatient.gender;
        if (patientGen === 'Female') {
          genderPUT = 0;
        } else if (patientGen === 'Male') {
          genderPUT = 1;
        } else {
          genderPUT = 2;
        }

        


        // console.log("Want to edit??????????????????? ", editedPatient);
        // console.log("Gender? ", genderPUT);


        const response = await axios.put(
          `https://clinicmanagement20240427220332.azurewebsites.net/api/Patient/Edit/${editedPatient.id}`,
          {
            
            fullName: editedPatient.name,
            userName: editedPatient.username,
            age: editedPatient.age,
            email: editedPatient.email,
            phoneNumber: editedPatient.phone,
            gender: genderPUT,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        console.log("Patient Updated Successfully!", response.data);
        savePatient(editedPatient);
        handleClose();
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Patient Edit Error:", error.response.data);
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

    
    } else {
      alert("Please fill in all fields");
    }

  };

  const showHideClass = show
    ? "modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    : "modal hidden";

  return (
    <div className={showHideClass}>
      <div className="modal-overlay fixed inset-0 flex items-center justify-center">
        <div className="modal-content bg-white rounded-lg p-8 w-full max-w-2xl">
          <form className="grid grid-cols-2 gap-8" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4 col-span-2 text-center">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={editedPatient.name}
                onChange={handleInputChange}
                placeholder="Enter patient's full name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              />
            </div>
            
            <div className="col-span-1 grid grid-rows-3 gap-4">
              
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={editedPatient.email}
                  onChange={handleInputChange}
                  placeholder="Enter patient's email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  value={editedPatient.username}
                  onChange={handleInputChange}
                  placeholder="Enter patient's username"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>
              
            </div>
            <div className="col-span-1 grid grid-rows-3 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={editedPatient.phone}
                  onChange={handleInputChange}
                  placeholder="Enter patient's phone number"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  value={editedPatient.age}
                  onChange={handleInputChange}
                  placeholder="Enter patient's age"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={editedPatient.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                >
                  <option value='Female'>Female</option>
                  <option value='Male'>Male</option>
                  <option value='Other'>Other</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end col-span-2">
              <button
                type="submit"
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 mr-4"
              >
                Save Patient
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

export default EditPatient;
