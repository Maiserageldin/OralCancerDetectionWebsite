import "./styles/Patientrecord.css";
import Header from "../Header";
import Footer from "../Footer";
import React, { useState, useEffect } from "react";
import PatientRecordConatiner from "./Patientrecordcontainer";
import Header2 from "../Header2";
import Layout from "../Layout";
import { useLocation } from "react-router-dom";

function PatientRecord() {
  console.log("wslna patinet record");
  const loc = useLocation();
  console.log("Location state:", loc.state);
  const { usernameResponse } = loc.state || {};
  console.log("Username Response:", usernameResponse);
  return (
    <div className="Container">
      <Layout>
        <Header2 username={usernameResponse} />
      </Layout>
      <PatientRecordConatiner />
      <Footer />
    </div>
  );
}

export default PatientRecord;
