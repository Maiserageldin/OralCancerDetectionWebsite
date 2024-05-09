import BlockContainer from "./components/Container";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import EmployeeDashboard from "./components/Employee/EmployeeDashboard";
import PatientDashboard from "./components/Patient/PatientDashboard";
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
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
        <Route path="/" element={<MainLayout />} />
        <Route path="/patient" element={<PatientDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
