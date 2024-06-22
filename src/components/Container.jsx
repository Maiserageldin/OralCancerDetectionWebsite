import { useState } from "react";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";

export default function BlockContainer() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleNavigate = () => {
    navigate("/story");
  };

  return (
    <div className="relative">
      <img
        src="/bgContainer.png"
        alt="container"
        className="w-full h-auto md:h-auto rounded-lg"
        style={{ minHeight: "400px", maxWidth: "90vw" }} // Adjusted height for mobile and max-width
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center text-white">
        <div className="md:w-2/3 mx-auto">
          <div className="text-white md:text-4xl text-2xl font-semibold mb-4">
            Our mission is to
          </div>
          <div className="text-white md:text-4xl text-2xl font-semibold mb-4">
            make healthcare more accessible
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <button
              className="bg-purple-600 text-white rounded-full px-4 py-2 md:px-6 md:py-3 font-semibold text-sm md:text-base hover:bg-white hover:text-purple-500 transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              style={{ maxWidth: "200px" }} // Control button width on smaller screens
              onClick={handleNavigate}
            >
              Our Story
            </button>
            <button
              className="bg-[#270f3a] border-2 border-white text-white rounded-full px-4 py-2 md:px-6 md:py-3 font-semibold text-sm md:text-base hover:bg-white hover:text-black transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              style={{ maxWidth: "200px" }} // Control button width on smaller screens
              onClick={openModal}
            >
              Get Started!
            </button>
          </div>
        </div>
      </div>
      <LoginModal show={showModal} handleClose={closeModal} />
    </div>
  );
}
