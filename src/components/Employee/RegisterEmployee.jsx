import React, { useContext, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AccessTokenContext } from "../AccessTokenContext.jsx";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const RegisterEmployee = ({ handleClose, show, addEmployee }) => {
  const { accessToken } = useContext(AccessTokenContext);
  // console.log("Access Token from AddEmployee is: ", accessToken);
  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    age: '',
    gender: '0',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = name === 'gender' || name === 'age' ? parseInt(value) : value;
    setEmployeeInfo({ ...employeeInfo, [name]: parsedValue });
  };

  const togglePasswordVisibility = () => {
    setEmployeeInfo({ ...employeeInfo, showPassword: !employeeInfo.showPassword });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation checks
    if (!employeeInfo.name.match(/^[a-zA-Z\s]+$/)) {
      alert("Name field should contain only letters and spaces.");
      return;
  }

  if (!employeeInfo.phone.match(/^\d{11}$/)) {
      alert("Phone number field should contain exactly 11 numbers.");
      return;
  }

  if (!employeeInfo.email.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/)) {
      alert("Email field should contain a valid email address.");
      return;
  }

  if (employeeInfo.password.length < 6 || !employeeInfo.password.match(/[a-z]/) || !employeeInfo.password.match(/[A-Z]/) || !employeeInfo.password.match(/\d/) || !employeeInfo.password.match(/\W/)) {
      alert("Password should be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, a hyphen (-) and numbers.");
      return;
  }

    if (
      employeeInfo.name &&
      employeeInfo.email &&
      employeeInfo.phone &&
      employeeInfo.username &&
      employeeInfo.password &&
      employeeInfo.age &&
      employeeInfo.gender
    ) {
      
    addEmployee(employeeInfo);
    setEmployeeInfo({
      name: "",
      email: "",
      phone: "",
      username: "",
      password: "",
      age: '',
      gender: '0'
    });

    try {
      console.log("Access Token is: ", accessToken);

      

      const response = await axios.post(
        "https://clinicmanagement20240427220332.azurewebsites.net/api/Authentication/RegisterEmployee",
        {
          fullName: employeeInfo.name,
          userName: employeeInfo.username,
          age: employeeInfo.age,
          email: employeeInfo.email,
          password: employeeInfo.password,
          phoneNumber: employeeInfo.phone,
          gender: parseInt(employeeInfo.gender),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Employee Added Successfully!", response.data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Employee Add Error:", error.response.data);
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
      {/* Modal content */}
      <div className="modal-overlay fixed inset-0 flex items-center justify-center">
        <div className="modal-content bg-white rounded-lg p-5 w-full max-w-xl">
          {/* Form */}
          <form
            className="grid grid-cols-2 gap-8"
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
                id="empname"
                type="text"
                name="name"
                value={employeeInfo.name}
                onChange={handleInputChange}
                placeholder="Enter employee's full name"
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
                id="empphone"
                type="tel"
                name="phone"
                value={employeeInfo.phone}
                onChange={handleInputChange}
                placeholder="Enter employee's phone number"
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
                id="empemail"
                type="email"
                name="email"
                value={employeeInfo.email}
                onChange={handleInputChange}
                placeholder="Enter employee's email"
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
                id="empage"
                type="number"
                name="age"
                value={employeeInfo.age}
                onChange={handleInputChange}
                placeholder="Enter employee's age"
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
                id="empusername"
                type="text"
                name="username"
                value={employeeInfo.username}
                onChange={handleInputChange}
                placeholder="Enter employee's username"
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
                id="empgender"
                name="gender"
                value={employeeInfo.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              >
                <option value='0'>Female</option>
                <option value='1'>Male</option>
                <option value='2'>Other</option>
              </select>
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
                  id="emppassword"
                  type={employeeInfo.showPassword ? "text" : "password"}
                  name="password"
                  value={employeeInfo.password}
                  onChange={handleInputChange}
                  placeholder="Enter employee's password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
                />


                  <span
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {employeeInfo.showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                  </span>
              </div>
            
            {/* Submit button */}
            <div className="flex justify-end col-span-2">
              <button
                type="submit"
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 mr-4"
              >
                Add Employee
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

export default RegisterEmployee;
