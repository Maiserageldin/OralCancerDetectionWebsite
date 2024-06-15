import BlockContainer from "./components/Container";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import PatientDashboard from "./components/Patient/PatientDashboard";
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
import Patientrecord from "./components/Patient/Patientrecord";
import PatientRecord from "./components/Doctor/PatientRecord";
import PatientVisit from "./components/Doctor/PatientVisit";
import "./fontAwesome";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useHistory,
} from "react-router-dom";

function MainLayout() {
  return (
    <Layout>
      <Header />
      <BlockContainer />
      <Reviews />
      <Footer />
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        ``
        <Route path="/" element={<MainLayout />} />
        <Route path="/patient" element={<PatientDashboard />} />
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
