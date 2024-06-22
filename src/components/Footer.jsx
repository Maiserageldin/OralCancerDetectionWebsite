import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div className="p-6 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left side */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <Link to="/MainLayout">
            <img className="w-40 h-auto mb-4" src="/logo.png" alt="Logo" />
          </Link>
          <p className="text-gray-600 mb-4">
            Subscribe to our newsletter and get the latest news and updates.
          </p>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-100 rounded-xl px-4 py-3 mb-4 sm:mb-0 sm:mr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-1/2"
            />
            <button className="bg-purple-500 text-white rounded-xl font-bold py-3 px-6 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white w-full sm:w-auto">
              Subscribe
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="text-lg font-bold font-josefin-sans text-gray-800 mb-4 mt-5 lg:mt-0">
            Contact Us
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            <ContactInfo
              icon={faMapMarkerAlt}
              label="Location"
              text="Ainshams University, Cairo, Egypt."
            />
            <ContactInfo
              icon={faPhoneAlt}
              label="Telephone"
              text="(253) 456-1189"
            />
            <ContactInfo
              icon={faEnvelope}
              label="Email Address"
              text="contact@asu.edu.eg"
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-300 my-8" />
    </div>
  );
}

function ContactInfo({ icon, label, text }) {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <div className="flex mb-2 items-center">
        <FontAwesomeIcon icon={icon} className="text-purple-500 text-xl mr-3" />
        <p className="text-gray-800 font-semibold">{label}</p>
      </div>
      <p className="text-gray-600 text-center lg:text-left">{text}</p>
    </div>
  );
}
