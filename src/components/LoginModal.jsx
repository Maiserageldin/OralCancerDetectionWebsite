import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct way to import jwtDecode

import { AccessTokenContext } from "./AccessTokenContext.jsx";

const LoginModal = ({ handleClose, show }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAccessToken } = useContext(AccessTokenContext);
  const { setDoctorId } = useContext(AccessTokenContext);
  // const [accessToken, setAccessToken] = useState(null);

  const [error, setError] = useState(null);
  const showHideClass = show
    ? "modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    : "modal hidden";
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("username: ", username);
    console.log("password: ", password);
    try {
      const response = await axios.post(
        "https://clinicmanagement20240427220332.azurewebsites.net/api/Authentication/Login",
        {
          userName: username,
          password: password,
        }
      );
      console.log("Login Successfull!", response.data);

      //const { accessToken } = response.data;
      const { accessToken, id } = response.data;
      setAccessToken(accessToken);
      setDoctorId(id);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", id); // Store the id in localStorage

      //console.log("id", id);
      console.log("Access Token", accessToken);

      handleClose();

      const decodedData = jwtDecode(accessToken);
      console.log("decodedData", decodedData);

      let roles =
        decodedData?.[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      const usernameResponse =
        decodedData?.[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ];

      //console.log("accessToken", response.data?.accessToken);
      console.log("roles", roles);
      console.log("username retrieved", usernameResponse);

      // if (username.startsWith("p_")) {
      //   navigate("/patient", { state: { usernameResponse } });
      // } else if (username.startsWith("d_")) {
      //   navigate("/doctor", { state: { usernameResponse } });
      // } else {
      //   navigate("/employee", { state: { usernameResponse } });
      // }

      // Ensure roles is an array
      // Convert roles to an array if it's not already
      if (!Array.isArray(roles)) {
        roles = [roles];
      }

      // Add detailed debug logging
      console.log("Roles array length:", roles.length);
      roles.forEach((role, index) => console.log(`Role ${index}: ${role}`));

      if (roles.length === 1 && roles.includes("View_Patient_Visits")) {
        navigate("/patient", { state: { usernameResponse } });
      } else if (roles.includes("Register_Employee")) {
        navigate("/employee", { state: { usernameResponse } });
      } else if (
        roles.includes("View_Assigned_Patients") ||
        roles.includes("Edit_Patient_Visits")
      ) {
        navigate("/doctor", { state: { usernameResponse } });
      } else {
        // Default case or error handling
        console.error("Unknown role");
        navigate("/error");
        // Default case or error handling
        console.error("Unknown role");
        navigate("/error");
      }

      // Navigate to patient dashboard
      // if (roles?.includes("Patient")) {
      //   // history.push("/patient");
      //   navigate("/patient");
      // }
      // // Navigate to doctor dashboard
      // else if (roles?.includes("Doctor")) {
      //   // history.push("/doctor");
      //   navigate("/doctor");
      // }
      // //  Navigate to employee dashboard
      // else if (roles?.includes("Employee")) {
      //   // history.push("/employee");
      //   navigate("/employee");
      // }
      // // Handle unexpected role scenario
      // else {
      //   console.log("Unexpected role");
      // }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setError(error.response?.data || error.message);
    }
  };

  return (
    <div className={showHideClass}>
      <div className="modal-overlay fixed inset-0 flex items-center justify-center">
        <div className="modal-content bg-white rounded-lg p-8 w-full max-w-xl">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={handleClose}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-bold mb-2"
              >
                Username
              </label>
              <input
                name="username"
                id="username"
                type="text"
                placeholder="Enter your username"
                onChange={handleUsernameChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-purple-400"
              />
            </div>
            <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600">
              Login
            </button>
          </form>
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
