import "./styles/PatientRecord.css";
import Header2 from "../Header2";
import Header from "../Header";

import Layout from "../Layout";
import Footer from "../Footer";
import React, { useState, useEffect } from "react";
import PatientRecordConatiner from "./PatientRecordConatiner";
import { useParams } from "react-router-dom";

function PatientRecord() {
  const { patientID } = useParams();
  console.log(patientID);
  return (
    <div className="Container">
      <Header />

      <PatientRecordConatiner patientID={patientID} />
      <Layout>
        <Footer />
      </Layout>
    </div>
  );
}

export default PatientRecord;
