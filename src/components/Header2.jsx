import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Header2({ username }) {
  return (
    <div className="flex justify-between items-center py-6 px-4 bg-white md:px-8 md:py-10">
      <Link to="/MainLayout">
        <img
          className="w-40 h-auto md:w-70 md:h-15"
          src="/logo.png"
          alt="Logo"
        />
      </Link>
      <div className="flex flex-col md:flex-row md:flex-1 justify-end items-center space-y-2 md:space-y-0 md:space-x-4 ml-4 md:ml-8">
        <Link to="/MainLayout">
          <button className="w-full md:w-auto flex items-center justify-center bg-purple-600 text-white rounded-lg px-4 py-2 shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Log out
          </button>
        </Link>
        <div className="text-black text-sm md:text-xl font-bold font-josefin-sans italic bg-gray-100 px-4 py-2 rounded-lg shadow-sm text-center md:text-left">
          Logged in as, <span className="text-purple-600">{username}</span>
        </div>
      </div>
    </div>
  );
}
