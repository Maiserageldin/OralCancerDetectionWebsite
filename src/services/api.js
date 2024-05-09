import axios from "axios";

const BASE_URL = "https://clinicmanagement20240427220332.azurewebsites.net"; // Replace 'http://your-api-url.com/api' with your actual API URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerEmployee = (employeeData) => {
  return api.post("/Authentication/RegisterEmployee", employeeData);
};

export const registerPatient = (patientData) => {
  return api.post("/Authentication/RegisterPatient", patientData);
};

export const registerDoctor = (doctorData) => {
  return api.post("/Authentication/RegisterDoctor", doctorData);
};

export const login = (userData) => {
  return api.post("/Authentication/Login", userData);
};

export default api;
