import React, { useState, useEffect, useContext } from "react";
import "./styles/PatientRecordContainer.css";
import stainedimg from "../Doctor/imgs/stainedimg.jpeg";
import microscopicimg from "../Doctor/imgs/microscpicimg.jpeg";
import axios from "axios";

import { AccessTokenContext } from "../AccessTokenContext.jsx";

function PatientRecordContainer({ patientID }) {
  //const [isPopupOpen, setPopupOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [latestComment, setLatestComment] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentImageId, setCurrentImageId] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [visitId, setVisitId] = useState(null);
  const { accessToken } = useContext(AccessTokenContext);
  const [newCommentText, setNewCommentText] = useState("");

  useEffect(() => {
    const storedVisitId = localStorage.getItem("visitId");
    if (storedVisitId) {
      setVisitId(storedVisitId);
      console.log("visit id:", storedVisitId);
    }
  }, []);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        console.log("Fetching patient data...");
        const response = await axios.get(
          `https://clinicmanagement20240427220332.azurewebsites.net/api/Visits/GetPatientVisits/${patientID}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Patient data fetched:", response.data);
        const data = response.data.data;
        // if (data.length > 0) {
        //   console.log("Visits Data:");
        //   data.forEach((visit) => {
        //     console.log("Visit Number:", visit.visitNumber);
        //     // You can perform further operations with each visit object here
        //   });
        // } else {
        //   console.log("No visit data found.");
        // }
        const patientRecordArray = data.map((visitsDB) => {
          let specialityName;
          let ageGroup;
          let gender;
          let diagnosis;
          let localization;
          let tobaccoUse;
          let alcoholConsumption;

          switch (visitsDB.speciality) {
            case 0:
              specialityName = "Oral and Maxillofacial Surgeon";
              break;
            case 1:
              specialityName = "Prosthodontist";
              break;
            case 2:
              specialityName = "Oral Pathologist";
              break;
            default:
              specialityName = "Oral Medcine Specialist";
              break;
          }

          switch (visitsDB.patientData.ageGroup) {
            case 0:
              ageGroup = "From 0 to 40";
              break;
            case 1:
              ageGroup = "From 41 to 60";
              break;
            default:
              ageGroup = "Above 61";
              break;
          }

          switch (visitsDB.patientData.gender) {
            case 0:
              gender = "Female";
              break;
            case 1:
              gender = "Male";
              break;
            default:
              gender = "Other";
              break;
          }

          switch (visitsDB.patientData.aiDiagnosis) {
            case 0:
              diagnosis = "Leukoplakia without dysplasia";
              break;
            case 1:
              diagnosis = "Leukoplakia with dysplasia";
              break;
            default:
              diagnosis = "OSCC";
              break;
          }

          switch (visitsDB.patientData.localization) {
            case 0:
              localization = "Gingiva";
              break;
            case 1:
              localization = "Palate";
              break;
            case 2:
              localization = "Buccal Mucosa";
              break;
            case 3:
              localization = "Floor of Mouth";
              break;
            case 4:
              localization = "Lip";
              break;
            default:
              localization = "Tongue";
              break;
          }

          switch (visitsDB.patientData.tobaccoUse) {
            case 0:
              tobaccoUse = "Not Informed";
              break;
            case 1:
              tobaccoUse = "Former";
              break;
            case 2:
              tobaccoUse = "No";
              break;
            default:
              tobaccoUse = "Yes";
              break;
          }

          switch (visitsDB.patientData.alcoholConsumption) {
            case 0:
              alcoholConsumption = "Not Informed";
              break;
            case 1:
              alcoholConsumption = "Former";
              break;
            case 2:
              alcoholConsumption = "No";
              break;
            default:
              alcoholConsumption = "Yes";
              break;
          }

          return {
            id: visitsDB.id.toString(), // Ensure id is a string
            visitNumber: visitsDB.visitNumber,
            name: visitsDB.patientName,
            date: new Date(visitsDB.date).toISOString().split("T")[0],
            ageGroup: ageGroup,
            gender: gender,
            diagnosis: diagnosis,
            localization: localization,
            tobaccoUse: tobaccoUse,
            alcoholConsumption: alcoholConsumption,
            stainingImagePath: visitsDB.patientData.stainingImagePath,
            microscopicImagePath: visitsDB.patientData.microscopicImagePath,
            doctorName: visitsDB.doctorName,
            speciality: specialityName,
            doctorComment: visitsDB.doctorComment || "",
          };
        });

        console.log("patientRecordArray:", patientRecordArray);
        console.log("visitId type and value:", typeof visitId, visitId);

        // Find the visit that matches the stored visit ID
        const visitData = patientRecordArray.find(
          (record) => record.id === visitId?.toString()
        );

        // Set the state variable with the fetched data
        setPatientData(visitData);
        console.log("Patient Record:", visitData);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    if (visitId && patientID) {
      fetchPatientData();
    }

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, [visitId, patientID, accessToken]);

  const handleFullScreenChange = () => {
    console.log("Full screen change detected");
    setIsFullScreen(!!document.fullscreenElement);
  };

  const toggleFullScreen = (imageId) => {
    if (!isFullScreen) {
      const img = document.querySelector(`#${imageId}`);
      if (img) {
        console.log(`Entering full-screen mode for image: ${imageId}`);
        img.requestFullscreen();
        setCurrentImageId(imageId);
      }
    } else {
      console.log("Exiting full-screen mode");
      document.exitFullscreen();
      setCurrentImageId(null);
    }
  };

  const handleSaveComment = async () => {
    try {
      console.log("Saving new comment:", newCommentText); // Log new comment text

      // Retrieve visitId from localStorage
      const storedVisitId = localStorage.getItem("visitId");

      // Make PUT request to update doctor comment
      const response = await axios.put(
        `https://clinicmanagement20240427220332.azurewebsites.net/api/visits/DoctorComment/VisitID/${storedVisitId}`,
        {
          doctorComment: newCommentText,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("PUT request response:", response.data);

      // Update latest comment in state upon successful request
      setLatestComment(newCommentText);

      // setPopupOpen(false); // Close comment popup if needed
    } catch (error) {
      console.error("Error saving comment:", error);
      // Handle error state or display error message to user
    }
  };

  if (!patientData) {
    console.log("Empty array");
    return (
      <div className="empty-div">
        <h1>My Record</h1>
        <div className="Middle-Page">
          <div>Loading patient data...</div>
          <div>Please wait while we retrieve your information.</div>
        </div>
      </div>
    );
  }

  console.log("Rendering patient data:", patientData);

  return (
    <div className="Middle-Page">
      <div className="Middle-page-container">
        <div className="header-in-middle-container">
          <h1>My Record</h1>
          <h1>Date: {patientData.date}</h1>
        </div>
        <div>
          <ul>
            <li>Name: {patientData.name}</li>
            <li>Age: {patientData.ageGroup}</li>
            <li>Gender: {patientData.gender}</li>
            <li>Tobacco: {patientData.tobaccoUse}</li>
            <li>Alcohol Consumption: {patientData.alcoholConsumption}</li>
            <li>Diagnosis: {patientData.diagnosis}</li>

            <li>Lesion Localization: {patientData.localization}</li>
            <li>Doctor : {patientData.doctorName}</li>
            <li>Speciality: {patientData.speciality}</li>
          </ul>
        </div>
        <div>
          <h1>Images</h1>
          <h2>Stained Images</h2>
          <img
            id="stainedImage"
            src={patientData.stainingImagePath || stainedimg}
            alt="Stained Image"
            onClick={() => toggleFullScreen("stainedImage")}
          />
          <h2>Microscopic Images</h2>
          <img
            id="microscopicImage"
            src={patientData.microscopicImagePath || microscopicimg}
            alt="Microscopic Image"
            onClick={() => toggleFullScreen("microscopicImage")}
          />
        </div>
        <div>
          <h1>AI Detector Result</h1>
          <p>{patientData.diagnosis}</p>
          <br />
        </div>
        <div>
          <h1>Doctor Comment</h1>
          <input
            type="text"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Enter your comment"
          />
          <button onClick={handleSaveComment}>Save Comment</button>
          {/* <p>{patientData.doctorComment || "No comment available"}</p> */}
        </div>
      </div>
    </div>
  );
}

export default PatientRecordContainer;
