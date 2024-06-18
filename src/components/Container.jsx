import MainLayout from "./MainLayout";
import { useState } from "react";
import LoginModal from "./LoginModal";
import { useNavigate } from 'react-router-dom';

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
    navigate('/story');
  };

  return (
    <div className=" text-white rounded-lg shadow-md relative">
      <img
        src="/bgContainer.png"
        alt="container"
        className="w-full h-auto rounded-lg"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-white font-serif-4xl mb-7 md:text-4xl text-center">
          <h1 className="font-semibold">Our mission is to</h1>
          <h1 className="font-semibold">make healthcare more accessible</h1>
        </div>
        <div className="flex justify-center">
          <button className="bg-purple-600 text-white rounded-full px-6 py-3 font-semibold hover:bg-white hover:text-purple-500 transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mr-6" 
          onClick={handleNavigate}>
            Our Story
          </button>
          <button
            className="bg-[#270f3a] border-4 border-white  text-white rounded-full px-6 py-3 font-semibold hover:bg-white hover:text-black transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 "
            onClick={openModal}
          >
            Get Started!
          </button>
        </div>
      </div>
      <LoginModal show={showModal} handleClose={closeModal} />
    </div>
  );
}
