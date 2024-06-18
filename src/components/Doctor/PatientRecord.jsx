import "./styles/PatientRecord.css";
import Header2 from "../Header2";
import Header from "../Header";

import Layout from "../Layout";
import Footer from "../Footer";
import React, { useState, useEffect } from "react";
import PatientRecordConatiner from "./PatientRecordConatiner";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function PatientRecord() {
  const { patientID } = useParams();
  console.log(patientID);
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

      <PatientRecordConatiner patientID={patientID} />
      <Layout>
        <Footer />
      </Layout>
    </div>
  );
}

export default PatientRecord;
