import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div>
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left side */}
        <div className="flex flex-col">
          <img src="/logo.png" alt="Logo" className="w-40 h-20 mb-4" />
          <p className="text-gray-600 mb-4">
            Subscribe to our newsletter and get the latest news and updates.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-1/2 bg-gray-100 rounded-xl px-4 py-3 mr-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-500 text-white rounded-xl font-bold py-3 px-6 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
              Subscribe
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col">
          <p className="text-lg font-bold font-josefin-sans text-gray-800 mb-4 mt-5">
            Contact Us
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
    <div className="flex flex-col">
      <div className="flex mb-2">
        <FontAwesomeIcon icon={icon} className="text-purple-500 text-xl mr-3" />
        <p className="text-gray-800 font-semibold">{label}</p>
      </div>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}