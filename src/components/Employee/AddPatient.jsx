import React, { useContext, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AccessTokenContext } from "../AccessTokenContext.jsx";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddPatient = ({ handleClose, show, addPatient }) => {
  const { accessToken } = useContext(AccessTokenContext);
  // console.log("Access Token from AddPatient is: ", accessToken);
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    age: '',
    gender: '0'
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = name === 'gender' || name === 'age' ? parseInt(value) : value;
    setPatientInfo({ ...patientInfo, [name]: parsedValue });
  };

  const togglePasswordVisibility = () => {
    setPatientInfo({ ...patientInfo, showPassword: !patientInfo.showPassword });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    // Validation checks
    if (!patientInfo.name.match(/^[a-zA-Z\s]+$/)) {
      alert("Name field should contain only letters and spaces.");
      return;
  }

  if (!patientInfo.phone.match(/^\d{11}$/)) {
      alert("Phone number field should contain exactly 11 numbers.");
      return;
  }

  if (!patientInfo.email.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) {
      alert("Email field should contain a valid email address.");
      return;
  }

  if (patientInfo.password.length < 6 || !patientInfo.password.match(/[a-z]/) || !patientInfo.password.match(/[A-Z]/) || !patientInfo.password.match(/\d/) || !patientInfo.password.match(/\W/)) {
      alert("Password should be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, a hyphen (-) and numbers.");
      return;
  }


  if (
    patientInfo.name &&
    patientInfo.email &&
    patientInfo.phone &&
    patientInfo.username &&
    patientInfo.password &&
    patientInfo.age &&
    patientInfo.gender
  ) {
    

      
      try {
        console.log("Access Token is: ", accessToken);

        // let ageGroup;
        // const patientAge = parseInt(patientInfo.age);
        // if (patientAge >= 0 && patientAge <= 40) {
        //   ageGroup = 0;
        // } else if (patientAge >= 41 && patientAge <= 60) {
        //   ageGroup = 1;
        // } else {
        //   ageGroup = 2;
        // }
        // alert(patientInfo.gender)

        const response = await axios.post(
          "https://clinicmanagement20240427220332.azurewebsites.net/api/Authentication/RegisterPatient",
          {
            fullName: patientInfo.name,
            userName: patientInfo.username,
            age: patientInfo.age,
            email: patientInfo.email,
            password: patientInfo.password,
            phoneNumber: patientInfo.phone,
            gender: parseInt(patientInfo.gender),
            doctorId: '',
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        console.log("Patient Added Successfully!", response.data);

        addPatient(patientInfo);
        setPatientInfo({
          name: "",
          email: "",
          phone: "",
          username: "",
          password: "",
          age: '',
          gender: '0'
        });

        // Reload the page
        window.location.reload();

      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Patient Add Error:", error.response.data);
          console.error("Status:", error.response.status);


          // Check if error message contains the substring "Username 'xxx' is already taken."
          const errorMessage = error.response.data.message;
          if (errorMessage.includes("Username")) {
            alert("Username already taken. Please choose a different username.");
          } else {
            // Handle other errors here if needed
            console.error("Validation Errors:", error.response.data.errors);
          }
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
                id="pname"
                type="text"
                name="name"
                value={patientInfo.name}
                onChange={handleInputChange}
                placeholder="Enter patient's full name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              />
            </div>
            {/* Left Side */}
            <div className="col-span-1 grid grid-rows-3 gap-4">
              {/* <div>
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
                  value={patientInfo.name}
                  onChange={handleInputChange}
                  placeholder="Enter patient's full name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div> */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  id="pemail"
                  type="email"
                  name="email"
                  value={patientInfo.email}
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
                  id="pusername"
                  type="text"
                  name="username"
                  value={patientInfo.username}
                  onChange={handleInputChange}
                  placeholder="Enter patient's username"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>
              {/* Password */}
            <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password
                </label>
                <input
                  id="ppassword"
                  type={patientInfo.showPassword ? "text" : "password"}
                  name="password"
                  value={patientInfo.password}
                  onChange={handleInputChange}
                  placeholder="Enter patient's password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                />


                  <span
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {patientInfo.showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                  </span>
              </div>
            </div>
            {/* Right Side */}
            <div className="col-span-1 grid grid-rows-3 gap-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Phone
                </label>
                <input
                  id="pphone"
                  type="tel"
                  name="phone"
                  value={patientInfo.phone}
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
                  id="page"
                  type="number"
                  name="age"
                  value={patientInfo.age}
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
                  id="pgender"
                  name="gender"
                  value={patientInfo.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                >
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                  <option value="2">Other</option>
                </select>
              </div>
            </div>
            {/* Submit button */}
            <div className="flex justify-end col-span-2">
              <button
                type="submit"
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 mr-4"
              >
                Add Patient
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

export default AddPatient;
