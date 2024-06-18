import MainLayout from "./components/MainLayout";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import PatientDashboard from "./components/Patient/PatientDashboard";
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
import Patientrecord from "./components/Patient/Patientrecord";
import PatientRecord from "./components/Doctor/PatientRecord";
import PatientVisit from "./components/Doctor/PatientVisit";
import About from "./components/About";
import Story from "./components/Story";
import "./fontAwesome";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useHistory,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/mainLayout" element={<MainLayout />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/story" element={<Story />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/patientRecord1" element={<Patientrecord />} />
        <Route path="/patientRecord/:patientID" element={<PatientRecord />} />
        <Route path="/patientVisits/:patientID" element={<PatientVisit />} />
      </Routes>
    </Router>
  );
}

export default App;
