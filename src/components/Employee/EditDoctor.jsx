import React, { useState, useEffect, useContext} from "react";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AccessTokenContext } from "../AccessTokenContext.jsx";


const EditDoctor = ({ handleClose, show, doctor, saveDoctor }) => {
  const { accessToken } = useContext(AccessTokenContext);
  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    age: "",
    gender: '',
    specialty: ''
  });

  useEffect(() => {
    if (doctor) {
      setDoctorInfo(doctor);
    }
  }, [doctor]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // const parsedValue = name === 'gender' || name === 'specialty' || name === 'age' ? parseInt(value) : value;
    setDoctorInfo({ ...doctorInfo, [name]: value });
  };

  // const togglePasswordVisibility = () => {
  //   setDoctorInfo({ ...doctorInfo, showPassword: !doctorInfo.showPassword });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    if (!doctorInfo.name.match(/^[a-zA-Z\s]+$/)) {
      alert("Name field should contain only letters and spaces.");
      return;
  }

    if (!doctorInfo.phone.match(/^\d{11}$/)) {
        alert("Phone number field should contain exactly 11 numbers.");
        return;
    }

    if (!doctorInfo.email.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) {
        alert("Email field should contain a valid email address.");
        return;
    }


    if (
      doctorInfo.name &&
      doctorInfo.email &&
      doctorInfo.phone &&
      doctorInfo.username &&
      doctorInfo.age &&
      doctorInfo.gender &&
      doctorInfo.specialty
    ) {

      try {
        console.log("Want to edit??????????????????? ", doctorInfo.id);

        let genderPUT;
        let specialtyPUT;
        const doctorGen = doctorInfo.gender;
        if (doctorGen === 'Female') {
          genderPUT = 0;
        } else if (doctorGen === 'Male') {
          genderPUT = 1;
        } else {
          genderPUT = 2;
        }

        const doctorSpec = doctorInfo.specialty;
        if (doctorSpec === "Oral_Maxillofacial_Surgeon") {
          specialtyPUT = 0;
        } else if (doctorSpec === "Prosthodontist") {
          specialtyPUT = 1;
        }else if (doctorSpec === "Oral_Pathologist") {
          specialtyPUT = 2;
        } else {
          specialtyPUT = 3;
        }


        console.log("Want to edit??????????????????? ", doctorInfo);
        console.log("Gender? ", genderPUT);
        console.log("Speciality? ", specialtyPUT);


        const response = await axios.put(
          `https://clinicmanagement20240427220332.azurewebsites.net/api/Doctor/Edit/${doctorInfo.id}`,
          {
            // speciality: 0,
            fullName: doctorInfo.name,
            userName: doctorInfo.username,
            age: doctorInfo.age,
            email: doctorInfo.email,
            phoneNumber: doctorInfo.phone,
            gender: genderPUT,
            speciality: specialtyPUT,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        console.log("Doctor Updated Successfully!", response.data);
        saveDoctor(doctorInfo);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Doctor Edit Error:", error.response.data);
          console.error("Status:", error.response.status);

          // Check if error message indicates username already taken
          if (error.response.data.message === 'Failed To Edit User') {
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
      {/* Modal content */}
      <div className="modal-overlay fixed inset-0 flex items-center justify-center">
        <div className="modal-content bg-white rounded-lg p-5 w-full max-w-xl">
          {/* Form */}
          <form
            className="grid grid-cols-2 gap-8"
            onSubmit={handleSubmit}
          >
            {/* Full Name */}
            <div className="mb-4">
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
                <option value='Female'>Female</option>
                <option value='Male'>Male</option>
                <option value='Other'>Other</option>
              </select>
            </div>

            {/* Password
            <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type={doctorInfo.showPassword ? "text" : "password"}
                  name="password"
                  value={doctorInfo.password}
                  onChange={handleInputChange}
                  placeholder="Enter doctor's password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                />


                  <span
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {doctorInfo.showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                  </span>
              </div> */}

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
                <option value="Oral_Maxillofacial_Surgeon">Oral and Maxillofacial Surgeon</option>
                <option value="Prosthodontist">Prosthodontist</option>
                <option value="Oral_Pathologist">Oral Pathologist</option>
                <option value="Oral_Medicine_Specialist">Oral Medicine Specialist</option>
              </select>
            </div>
            {/* Submit button */}
            <div className="flex justify-end col-span-2">
              <button
                type="submit"
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 mr-4"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDoctor;
