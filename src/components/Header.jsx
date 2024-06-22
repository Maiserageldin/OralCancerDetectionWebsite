import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faSignInAlt,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex justify-between items-center py-10 px-6">
      <Link to="/MainLayout">
        <img className="w-40 h-15" src="/logo.png" alt="Logo" />
      </Link>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <FontAwesomeIcon
            icon={menuOpen ? faTimes : faBars}
            className="text-2xl"
          />
        </button>
      </div>

      <ul
        className={`fixed top-20 left-0 w-full bg-white z-50 md:relative md:top-0 md:left-auto md:w-auto md:bg-transparent flex flex-col md:flex-row md:space-x-8 md:items-center transition-transform transform ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        } md:translate-y-0 md:flex md:ml-auto ${
          menuOpen ? "block" : "hidden"
        } md:block border md:border-0`}
      >
        <li className="text-black hover:text-purple-400 text-xl font-bold font-josefin-sans flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 md:py-0 border-b md:border-0">
          <FontAwesomeIcon icon={faHome} />
          <Link to="/">Home</Link>
        </li>
        <li className="text-black hover:text-purple-400 text-xl font-bold font-josefin-sans flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 py-2 px-4 md:py-0 border-b md:border-0">
          <FontAwesomeIcon icon={faInfoCircle} />
          <Link to="/about">About</Link>
        </li>
        <li className="px-4 py-2 md:px-0 md:py-3 border-b md:border-0">
          <div
            className="bg-purple-600 text-white rounded-full px-6 py-3 font-semibold hover:bg-purple-700 transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center space-x-5 md:w-auto md:mx-4 cursor-pointer"
            onClick={openModal}
            role="button"
          >
            <FontAwesomeIcon icon={faSignInAlt} />
            <span>Login</span>
          </div>
        </li>
      </ul>
      <LoginModal show={showModal} handleClose={closeModal} />
    </div>
  );
}
