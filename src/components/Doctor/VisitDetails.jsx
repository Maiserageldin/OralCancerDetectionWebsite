import { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import'./styles/VisitDetails.css';
function VisitDetails() {
    // State variables to hold visit details, images, ML results, and doctor comments
    const [visitNumber, setVisitNumber] = useState('');
    const [newImages, setNewImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [mlResults, setMlResults] = useState('');
    const [doctorComment, setDoctorComment] = useState('');
    
    // Fetch visit details, images, ML results, and doctor comments from backend
    useEffect(() => {
        // Fetch visit details, images, ML results, and doctor comments here
        // Example:
        // fetchVisitDetails()
        // fetchNewImages()
        // fetchOldImages()
        // fetchMlResults()
        // fetchDoctorComment()
    }, []); // Empty dependency array to fetch data only once when component mounts

    return (
        <>
            <Header />
            <div className="Middle-page-container">
                {/* Visit Number */}
                <div>
                    <h2>Visit Number: {visitNumber}</h2>
                </div>

                {/* New Images */}
                <div>
                    <h2>New Images:</h2>
                    {newImages.map((image, index) => (
                        <div key={index}>
                            <img src={image.url} alt={`New Image ${index}`} />
                            <p>Date: {image.date}</p>
                        </div>
                    ))}
                </div>

                {/* Old Images */}
                <div>
                    <h2>Old Images:</h2>
                    {oldImages.map((image, index) => (
                        <div key={index}>
                            <img src={image.url} alt={`Old Image ${index}`} />
                            <p>Date: {image.date}</p>
                        </div>
                    ))}
                </div>

                {/* ML Results */}
                <div>
                    <h2>Machine Learning Results:</h2>
                    <p>{mlResults}</p>
                </div>

                {/* Doctor Comment */}
                <div>
                    <h2>Doctor's Comment:</h2>
                    <textarea
                        value={doctorComment}
                        onChange={(e) => setDoctorComment(e.target.value)}
                    />
                    <button>Save Comment</button>
                </div>
            </div>
            < Footer />
        </>
    );
}

export default VisitDetails;
