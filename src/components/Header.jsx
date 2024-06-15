import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex justify-between items-center py-10 px-6">
      <Link to="/MainLayout">
        <img className="w-40 h-15" src="/logo.png" alt="Logo" />
      </Link>

      <ul className="flex space-x-8 list-none items-center">
        <li className="text-black hover:text-purple-400 text-xl font-bold font-josefin-sans flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105">
          <FontAwesomeIcon icon={faHome} />
          <a href="#">Home</a>
        </li>
        <li className="text-black hover:text-purple-400 text-xl font-bold font-josefin-sans flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105">
          <FontAwesomeIcon icon={faInfoCircle} />
          <Link to="/about">About</Link>
        </li>
        <li className="bg-purple-600 text-white rounded-full px-6 py-3 font-semibold hover:bg-purple-700 transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center space-x-2">
          <FontAwesomeIcon icon={faSignInAlt} />
          <a onClick={openModal}>Login</a>
        </li>
      </ul>
      <LoginModal show={showModal} handleClose={closeModal} />
    </div>
  );
}
