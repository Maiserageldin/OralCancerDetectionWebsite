import { useState } from "react";
import LoginModal from "./LoginModal";

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-between items-center py-10">
      <img className="w-40 h-15" src="/logo.png" alt="Logo" />
      <ul className="flex space-x-4 list-none items-center">
        <li className="text-black hover:text-purple-400 text-xl font-bold font-josefin-sans ">
          <a href="#">Home</a>
        </li>
        <li className="text-black hover:text-purple-400 text-xl font-bold font-josefin-sans">
          <a href="#">About</a>
        </li>
        <li className="text-black hover:text-purple-400 text-xl font-bold font-josefin-sans">
          <a href="#" onClick={openModal}>
            Login
          </a>
        </li>
        <li>
          <button className="bg-purple-600 text-white rounded-full px-6 py-3 font-semibold hover:bg-purple-700 transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            <a href="#">Get Started</a>
          </button>
        </li>
      </ul>
      <LoginModal show={showModal} handleClose={closeModal} />
    </div>
  );
}
