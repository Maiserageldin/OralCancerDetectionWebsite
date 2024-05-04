import React, { useState, useEffect } from 'react';
import "./styles/PatientRecordContainer.css";
import stainedimg from "./imgs/stainedimg.jpeg";
import microscopicimg from "./imgs/microscpicimg.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faAngleDown, faAngleUp, faPlus } from '@fortawesome/free-solid-svg-icons';

function PatientRecordContainer() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [latestComment, setLatestComment] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentImageId, setCurrentImageId] = useState(null);

  const handleSaveComment = (newComment) => {
    setComment(newComment);
    setLatestComment(newComment);
    setPopupOpen(false);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
       document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const handleFullScreenChange = () => {
    setIsFullScreen(!!document.fullscreenElement);
  };

  const toggleFullScreen = (imageId) => {
    if (!isFullScreen) {
      // Enter full-screen mode
      const img = document.querySelector(`#${imageId}`);
      if (img) {
        img.requestFullscreen();
        setCurrentImageId(imageId);
      }
    } else {
      // Exit full-screen mode
      document.exitFullscreen();
      setCurrentImageId(null);
    }
  };

  return (
    <div className="Middle-Page">
      <div className="Middle-page-container">
        <div className="header-in-middle-container">
          <h1>Patient Record</h1>
          <h1>Date:01/01/2024</h1>
        </div>
        <div>
          <ul>
            <li>Name:</li>
            <li>Age:</li>
            <li>Gender:</li>
            <li>Tobacco:</li>
            <li>Alcohol Consumption:</li>
            <li>Diagnosis:</li>
            <li>Skin Color:</li>
            <li>Lesion Localization:</li>
            <li>Sun Exposure:</li>
          </ul>
        </div>
        <div>
          <h1>Images</h1>
          <h2>Stained Images</h2>
          <img id="stainedImage" src={stainedimg} alt="Stained Image" onClick={() => toggleFullScreen('stainedImage')} />
          <h2>Microscopic Images</h2>
          <img id="microscopicImage" src={microscopicimg} alt="Microscopic Image" onClick={() => toggleFullScreen('microscopicImage')} />
        </div>
        <div>
          <h1>AI Detector Result</h1>
          <p>This is the model result</p><br></br>
        </div>
        {/* Display the latest comment or a button to write/edit a comment */}
        <h1>Doctor Comment</h1>
        {latestComment ? (
          <div className='comment-div'>
            <div>Latest Comment: {latestComment}</div>
            <FontAwesomeIcon style={{ marginLeft:'15px' }} icon={faEdit} className="edit-icon" onClick={() => setPopupOpen(true)} />
          </div>
        ) : (
          <button onClick={() => setPopupOpen(true)}>Write Comment</button>
        )}

        {/* Render the popup/modal if isPopupOpen is true */}
        {isPopupOpen && <CommentPopup onSaveComment={handleSaveComment} />}
      </div>
    </div>
  );
}

function CommentPopup({ onSaveComment }) {
  const [comment, setComment] = useState('');

  const handleSaveComment = () => {
    onSaveComment(comment);
    setComment(''); // Clear the input field after saving
  };

  return (
    <div className="popup">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment here"
      />
      <button onClick={handleSaveComment}>Save</button>
    </div>
  );
}

export default PatientRecordContainer;
