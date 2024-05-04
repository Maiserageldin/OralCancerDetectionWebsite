import React, { useState } from 'react';
import Footer from '../Footer';
import Header from '../Header';
import './styles/PatientVisit.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faAngleDown, faAngleUp, faPlus } from '@fortawesome/free-solid-svg-icons';


function PatientVisits({ patient }) {
  const [visits, setVisits] = useState([
    // Example visits data
    { id: 1, date: '2022-04-01', details: 'Visit details 1' },
    { id: 2, date: '2022-04-15', details: 'Visit details 2' },
    { id: 3, date: '2022-05-03', details: 'Visit details 3' },
  ]);

  const toggleDetails = (visitId) => {
     setVisits(visits.map((visit) =>
      visit.id === visitId ? { ...visit, showDetails: !visit.showDetails } : visit
    ));
  };
  
  
  return (
    <div>
        <Header/>
        <div className="content">
            <div className="column">
                <div className="section">
                    <div className="title-container">
                        <h2>Visits Of Patient 1</h2>
                    </div>

                   <ul className="patient-list">
                   {visits.map(visit => (
                    <li key={visit.id}>
                     <div className="item">
                     
                    <FontAwesomeIcon icon={visit.showDetails ? faAngleUp : faAngleDown} className="toggle-icon" onClick={() => toggleDetails(visit.id)} />
                    <div className="row"> 
                    <span>{visit.id}</span>
                    <span>{visit.date}</span>
                  
                </div>
               { visit.showDetails && (
                    <div className="details">
                        <p>details: {visit.details}</p>
                        </div>
                )}
                     </div>
                     
                   </li>
           ))}
                  </ul>
                </div>
            </div>
       
        </div>
     <Footer/></div>
)
 /* return (
    <div className='page-container'> 
      <Header />
      <div className="Container">
        <h2>{`Visits for Patient 1`}</h2>
        <ul className="VisitList">
          {visits.map((visit) => (
            <li key={visit.id}>
              <div className="VisitItem">
              <div className="Visitid">{visit.id}</div>
                <div className="VisitDate">{visit.date}</div>
                <button
                  className="ViewButton"
                  onClick={() => toggleDetails(visit.id)}
                >
                  {visit.showDetails ? 'Hide ' : 'View '}
                </button>
              </div>
              {visit.showDetails && (
                <div className="VisitDetails">
                  <p>{visit.details}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );*/
}

export default PatientVisits;
