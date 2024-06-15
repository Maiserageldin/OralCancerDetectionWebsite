import "./styles/Patientrecord.css";
import Header from "../Header";
import Footer from "../Footer";
import React, { useState, useEffect } from "react";
import PatientRecordConatiner from "./Patientrecordcontainer";

function PatientRecord() {
  console.log("wslna patinet record");
  return (
    <div className="Container">
      <Header />
      <PatientRecordConatiner />
      <Footer />
    </div>
  );
}

export default PatientRecord;
