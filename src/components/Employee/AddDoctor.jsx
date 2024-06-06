import React, { useContext, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AccessTokenContext } from "../AccessTokenContext.jsx";

const AddDoctor = ({ handleClose, show, addDoctor }) => {
  const { accessToken } = useContext(AccessTokenContext);

  console.log("Access Token1 is: ", accessToken);
  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    age: "",
    gender: "male",
    specialty: "prosthodontist",
  });

  //console.log("accessToken 1", accessToken);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDoctorInfo({ ...doctorInfo, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    addDoctor(doctorInfo);
    setDoctorInfo({
      name: "",
      email: "",
      phone: "",
      username: "",
      age: "",
      gender: "male",
      specialty: "prosthodontist",
    });

    try {
      console.log("Access Token is: ", accessToken);
      const response = await axios.post(
        "https://clinicmanagement20240427220332.azurewebsites.net/api/Authentication/RegisterDoctor",
        {
          fullName: doctorInfo.name,
          userName: doctorInfo.username,
          age: parseInt(doctorInfo.age),
          email: doctorInfo.email,
          password: "4111999ASU_h",
          phoneNumber: doctorInfo.phone,
          gender: 0,
          speciality: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Doctor Added Successfull!", response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Doctor Add Error:", error.response.data);
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
  };

  const showHideClass = show
    ? "modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    : "modal hidden";

  return (
    <div className={showHideClass}>
      {/* Modal content */}
      <div className="modal-overlay fixed inset-0 flex items-center justify-center">
        <div className="modal-content bg-white rounded-lg p-5 w-full max-w-xl">
          {/* Form */}
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            onSubmit={handleSubmit}
          >
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
                value={doctorInfo.name}
                onChange={handleInputChange}
                placeholder="Enter doctor's full name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              />
            </div>
            {/* Email */}
            <div className="mb-4">
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
                value={doctorInfo.email}
                onChange={handleInputChange}
                placeholder="Enter doctor's email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              />
            </div>
            {/* Phone */}
            <div className="mb-4">
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
                value={doctorInfo.phone}
                onChange={handleInputChange}
                placeholder="Enter doctor's phone number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              />
            </div>
            {/* Username */}
            <div className="mb-4">
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
                value={doctorInfo.username}
                onChange={handleInputChange}
                placeholder="Enter doctor's username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              />
            </div>
            {/* Age */}
            <div className="mb-4">
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
                value={doctorInfo.age}
                onChange={handleInputChange}
                placeholder="Enter doctor's age"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              />
            </div>
            {/* Gender */}
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-gray-700 font-bold mb-2"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={doctorInfo.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Specialty */}
            <div className="mb-4">
              <label
                htmlFor="specialty"
                className="block text-gray-700 font-bold mb-2"
              >
                Specialty
              </label>
              <select
                id="specialty"
                name="specialty"
                value={doctorInfo.specialty}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              >
                <option value="prosthodontist">Prosthodontist</option>
                <option value="oral_pathologist">Oral Pathologist</option>
                <option value="oncologic_dentist">Oncologic Dentist</option>
                <option value="oral_medicine_specialist">
                  Oral Medicine Specialist
                </option>
                <option value="oms">Oral and Maxillofacial Surgeon</option>
              </select>
            </div>
            {/* Submit button */}
            <div className="flex justify-end col-span-2">
              <button
                type="submit"
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 mr-4"
              >
                Add Doctor
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

export default AddDoctor;
