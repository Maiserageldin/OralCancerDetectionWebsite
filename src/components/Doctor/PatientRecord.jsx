import "./styles/PatientRecord.css"
import Header from '../Header';
import Footer from '../Footer';
import React, { useState, useEffect } from 'react';
import PatientRecordConatiner from "./PatientRecordConatiner";


function PatientRecord(){
   return (
    <div className="Container">   
      <Header />
      <PatientRecordConatiner/>
      <Footer/>
    </div> 
  );
}

export default PatientRecord;
