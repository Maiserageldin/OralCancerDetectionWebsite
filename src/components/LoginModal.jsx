import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct way to import jwtDecode

import { AccessTokenContext } from "./AccessTokenContext.jsx";

const LoginModal = ({ handleClose, show }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAccessToken } = useContext(AccessTokenContext);
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

      const { accessToken, id } = response.data;
      setAccessToken(accessToken);
      localStorage.setItem("userId", id); // Store the id in localStorage

      const decodedData = jwtDecode(accessToken);
      const roles =
        decodedData?.[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
        console.log("Login Successfull!", response.data);
        console.log("user id:",id);

      if (username.startsWith("p_")) {
        navigate("/patient");
      } else if (username.startsWith("d_")) {
        navigate("/doctor");
      } else {
        navigate("/employee");
      }
      console.log("roles", roles);
      handleClose();
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
